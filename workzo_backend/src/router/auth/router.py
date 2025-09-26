from fastapi import APIRouter, Depends,HTTPException, status, Response  
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from src.router.auth.models import verify_password, create_access_token2, ACCESS_TOKEN_EXPIRE_MINUTES, hash_password,VerifyEmailRequest,UserOut,users_collection,User,ResetPasswordRequest,ForgotPasswordRequest,personal_information,Personal,db,get_current_user,create_access_token
from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt
from passlib.context import CryptContext
from typing import List
from src.utils.config import get_settings, send_otp_email, generate_otp
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from bson import ObjectId
settings = get_settings()
router = APIRouter()


otp_store = {}  

@router.post("/verify_email/")
async def verify_email(request: VerifyEmailRequest):

    user_email = request.user_email
    otp = request.otp

  
    if user_email not in otp_store:
        raise HTTPException(status_code=400, detail="No OTP request found for this email.")

    stored_otp = otp_store[user_email]
    
    if stored_otp != otp:
        raise HTTPException(status_code=400, detail="Invalid OTP. Please try again.")

 
    del otp_store[user_email]


    await users_collection.update_one(
        {"email": user_email},
        {"$set": {"is_verified": True}}  
    )

    return {"message": "Email verified successfully!"}

@router.post("/social-auth/")
async def social_auth(user: User, response: Response):
    # Check if the user already exists based on their email (from Google OAuth)
    existing_user = await users_collection.find_one({"email": user.email})
    
    if existing_user:
        # If the user already exists, no need to create a new one, just log them in
        # Generate JWT token for the existing user
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token2(
            data={"sub": existing_user["username"], "user_id": str(existing_user["_id"])},
            expires_delta=access_token_expires
        )
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={
                "message": "User logged in successfully.",
                "access_token": access_token,
            }
        )
    else:

        user_dict = user.dict()
        user_dict["password"] = ""  # Set empty password for social logins

        # Insert the new user into the database
        result = await users_collection.insert_one(user_dict)
        user_dict["_id"] = str(result.inserted_id)

        # Generate JWT token for the newly registered user
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token2(
            data={"sub": user_dict["username"], "user_id": str(user_dict["_id"])},
            expires_delta=access_token_expires
        )

        # Return success response
        return JSONResponse(
            status_code=status.HTTP_201_CREATED,
            content={
                "message": "User registered successfully.",
                "access_token": access_token,
            }
        )

@router.post("/forgot-password/")
async def forgot_password(request: ForgotPasswordRequest):
    user = await users_collection.find_one({"email": request.email})
    if not user:
        raise HTTPException(status_code=404, detail="Email not found")

    otp = generate_otp()
    otp_store[request.email] = otp

    email_sent = send_otp_email(request.email, otp)
    if not email_sent:
        raise HTTPException(status_code=500, detail="Failed to send OTP. Please try again.")

    return {"message": "OTP sent to your email. Please check your inbox."}

@router.post("/reset-password/")
async def reset_password(request: ResetPasswordRequest):
    stored_otp = otp_store.get(request.email)
    if not stored_otp or stored_otp != request.otp:
        raise HTTPException(status_code=400, detail="Invalid or expired OTP")

    hashed_password = hash_password(request.new_password)
    result = await users_collection.update_one(
        {"email": request.email},
        {"$set": {"password": hashed_password}}
    )

    if result.modified_count == 0:
        raise HTTPException(status_code=500, detail="Password reset failed")

    # Optionally, remove OTP from store after successful use
    otp_store.pop(request.email, None)

    return {"message": "Password has been reset successfully."}
        
@router.get("/users/", response_model=List[UserOut])
async def get_users():
    users = await users_collection.find().to_list(100)  
    if not users:
        raise HTTPException(status_code=404, detail="No users found")
    

    return [UserOut(username=user["username"], email=user["email"]) for user in users]





@router.get("/users/me", response_model=UserOut)
async def read_current_user(current_user: dict = Depends(get_current_user)):
    """Read the current user based on either MongoDB _id or Google ID."""
    
    user_id = current_user.get("user_id")  # This is Google ID or MongoDB ID
    
    # If it's a valid ObjectId (24 characters), search by MongoDB _id
    if len(user_id) == 24:  # MongoDB ObjectId is 24 characters long
        try:
            user = await users_collection.find_one({"_id": ObjectId(user_id)})
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Invalid ObjectId: {str(e)}")
    else:
        # Otherwise, treat the user_id as a Google ID and query by google_id
        user = await users_collection.find_one({"google_id": user_id})
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if not user.get("is_verified", False): 
        raise HTTPException(status_code=403, detail="User is not verified")

    return UserOut(
        username=user["username"],
        email=user["email"],
        is_verified=user["is_verified"]
    )

@router.post("/personal/")
async def save_personal_info(
    personal: Personal, current_user: dict = Depends(get_current_user)
):
    """Save personal information of the user."""
    # Fetch the user from the database using user_id
    user = await db.users.find_one({"_id": ObjectId(current_user["user_id"])})

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Check if the user is verified
    if not user.get("is_verified", False):
        raise HTTPException(status_code=403, detail="User is not verified")

    # Insert personal information into MongoDB
    data = personal.dict()
    data["user_id"] = current_user["user_id"]  # Associate personal info with the user
    result = await personal_information.insert_one(data)

    return {"message": "Personal information saved successfully", "id": str(result.inserted_id)}


@router.post("/login/")
async def login_user(form_data: OAuth2PasswordRequestForm = Depends()):
    identifier = form_data.username.lower()  # Could be email or username
    password = form_data.password

    # Try finding by username first
    user = await users_collection.find_one({"username": identifier})

    # If not found, try email
    if not user:
        user = await users_collection.find_one({"email": identifier})

    if not user or not verify_password(user["password"], password):
        raise HTTPException(status_code=401, detail="Invalid username/email or password")

    if not user.get("is_verified", False):
        raise HTTPException(status_code=403, detail="User is not verified. Please verify your email.")

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["username"], "user_id": str(user["_id"])},
        expires_delta=access_token_expires
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }



@router.post("/register/")
async def register_user(user: User, response: Response):

    existing_user = await users_collection.find_one({"username": user.username})
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")

    existing_email = await users_collection.find_one({"email": user.email})
    if existing_email:
        raise HTTPException(status_code=400, detail="Email already registered")

 
    hashed_password = hash_password(user.password)
    user_dict = user.dict()
    user_dict["password"] = hashed_password

 
    result = await users_collection.insert_one(user_dict)
    user_dict["_id"] = str(result.inserted_id)

   
    otp = generate_otp()  
    otp_store[user_dict["email"]] = otp  


    email_sent = send_otp_email(user_dict["email"], otp)
    if not email_sent:
        raise HTTPException(status_code=500, detail="Failed to send OTP. Please try again.")


    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token2(
        data={"sub": user_dict["username"], "user_id": str(user_dict["_id"])},
        expires_delta=access_token_expires
    )

    return JSONResponse(
        status_code=status.HTTP_201_CREATED,
        content={
            "message": "User registered successfully. Please verify your email.",
            "access_token": access_token,

           
        }
    )
