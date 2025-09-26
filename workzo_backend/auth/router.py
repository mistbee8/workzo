import os
from datetime import datetime, timedelta, timezone
from fastapi import FastAPI, Depends, HTTPException, Request, APIRouter, status, Response
from fastapi.responses import RedirectResponse,JSONResponse
import httpx  # Make sure to import httpx for making HTTP requests
from fastapi.security import OAuth2PasswordRequestForm
from src.utils.config import get_settings
from typing import Annotated
from datetime import datetime, timedelta, timezone
from auth.models import User,  users_collection,create_access_token2,hash_password,create_access_token1
from fastapi import Depends, FastAPI, status, HTTPException,Response
from fastapi_sso.sso.base import OpenID
from fastapi_sso.sso.google import GoogleSSO



settings = get_settings()
router = APIRouter(
    responses={418: {"description": "Authentication endpoints"}}
)

ACCESS_TOKEN_EXPIRE_MINUTES = 1200

# Dependency to get the current user from the token
# logger.info("redirect uri: {0}{1}{2}".format(settings.BASE_URL, settings.API_BASE_PATH, settings.GOOGLE_CALLBACK_PATH))
# google_sso = GoogleSSO(
#     client_id=settings.GOOGLE_CLIENT_ID, 
#     client_secret=settings.GOOGLE_CLIENT_SECRET, 
#     redirect_uri="{0}{1}{2}".format(settings.BASE_URL, settings.API_BASE_PATH, settings.GOOGLE_CALLBACK_PATH),
#     scope=settings.GOOGLE_AUTH_SCOPE_LIST,
#     allow_insecure_http=settings.OAUTHLIB_INSECURE_TRANSPORT
# )
# @router.post("/register/")
# async def register_user(user: User, response: Response):

#     existing_user = await users_collection.find_one({"username": user.username})
#     if existing_user:
#         raise HTTPException(status_code=400, detail="Username already registered")


#     existing_email = await users_collection.find_one({"email": user.email})
#     if existing_email:
#         raise HTTPException(status_code=400, detail="Email already registered")


#     hashed_password = hash_password(user.password)
#     user_dict = user.dict()
#     user_dict["password"] = hashed_password

#     result = await users_collection.insert_one(user_dict)
#     user_dict["_id"] = str(result.inserted_id)


#     access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
#     access_token = create_access_token2(
#         data={"sub": user_dict["username"], "user_id": str(user_dict["_id"])}, 
#         expires_delta=access_token_expires
#     )

#     print("The token is", access_token)

  
#     response = RedirectResponse(url="/protected", status_code=status.HTTP_201_CREATED)
#     response.set_cookie(
#         key="access_token",
#         value=access_token,
#         httponly=True, 
#         secure=True, 
#         samesite="Strict" 
#     )

#     return response

# @router.get("/google/login", tags=["auth-google"])
# async def google_login(request: Request, return_url=None):
#     """Redirect the user to the Google login page."""
#     with google_sso:
#         logger.info("callback url: {0}".format(str(request.url_for("google_callback"))))
#         return await google_sso.get_login_redirect(
#             redirect_uri=request.url_for("google_callback"),
#             state=return_url
#         )

# @router.get("/google/", tags=["auth-google"])
# async def google_callback(request: Request):
#     """Process login and redirect the user to the protected endpoint."""
#     with google_sso:
#         openid = await google_sso.verify_and_process(request)
        
#         if not openid:
#             raise HTTPException(status_code=401, detail="Authentication failed")
        
#         email = openid.email  
#         user_id = openid.id  # Google ID (sub)

#         # Check if the user already exists
#         existing_user = await users_collection.find_one({"email": email})
        
#         if not existing_user:
#             user_dict = {
#                 "username": email,
#                 "email": email,
#                 "google_id": user_id,  # Store Google ID here
#                 "password": "",  # No password for Google login
#                 "is_verified": True  # Set is_verified to True or False based on your app logic
#             }
#             await users_collection.insert_one(user_dict)
        
#         # Generate token
#         user_data = {
#             "sub": email,  
#             "user_id": user_id  # Store Google ID in the token
#         }

#         expiration = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)

#         access_token = create_access_token1(
#             data=user_data,  
#             expiration=expiration
#         )

#         if google_sso.state is not None:
#             response = RedirectResponse(url=google_sso.state)
#         else:
#             response = RedirectResponse(
#                 url=f"{settings.FRONTEND_URL}/login", 
#                 status_code=status.HTTP_303_SEE_OTHER
#             )

#         response.set_cookie(
#             key="token", value=access_token, expires=expiration
#         )

#         return response
