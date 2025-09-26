
from pydantic import BaseModel,EmailStr, Field
from motor.motor_asyncio import AsyncIOMotorClient
from typing import Dict,List,Optional,Union
from fastapi import HTTPException,Depends
from bson import ObjectId
from typing_extensions import Literal
from jose import JWTError, jwt
from datetime import datetime, timedelta, timezone
from passlib.context import CryptContext
from src.utils.config import get_settings
import os
from gridfs import GridFS
from motor.motor_asyncio import AsyncIOMotorGridFSBucket
import io
from bson.objectid import ObjectId
from datetime import date
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

settings=get_settings()


client = AsyncIOMotorClient(settings.MONGODB_URI)
db = client.mydatabase1

# Collections
users_collection = db.users
resume_collection = db.resumes
job_collection = db.jobs
personal_information = db.personal
education_information = db.education
experience_information = db.experience
project_information = db.project
skill_information = db.skill
social_information = db.socialmedia
name_information = db.namemedia
wishlist_information = db.wishlist
personal_preference = db.preference
resume_information = db.allresumes


# client = AsyncIOMotorClient(settings.MONGODB_URI)
# db = client["mydatabase1"]  # Replace with your database name
# fs = AsyncIOMotorGridFSBucket(db)


class User(BaseModel):
    username: str
    email: EmailStr
    password: str
    is_verified: bool = False 

    class Config:
        orm_mode = True



class Personal(BaseModel):
    # first_name: Optional[str] = None
    # last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    mobile: Optional[str] = None
    location: Optional[str] = None
    birthdate: Optional[str] = None 
    

class NameMedia(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None



class Token(BaseModel):
    access_token: str
    token_type: str

class Experience(BaseModel):
    job_title: str
    company_name: str
    start_date: str  # Can use date type if you prefer to validate date format
    end_date: Optional[str] = None  # If end_date is not available
    description: Optional[str] = None  
    location: Optional[str] = None
    
    class Config:
        json_encoders = {
            ObjectId: str
        }

class Project(BaseModel):
    project_title: Optional[str] = None  
    project_name: Optional[str] = None
    start_month: Optional[str] = None   
    end_month: Optional[str] = None  
    start_year: Optional[str] = None   
    end_year: Optional[str] = None  
    description: Optional[str] = None  
    location: Optional[str] = None
    link: Optional[str] = None
    

class Education(BaseModel):
    _id: Optional[str] = None
    degree: Optional[str] = None
    institution: Optional[str] = None
    start_year: Optional[int] = None
    end_year: Optional[int] = None
    gpa: Optional[float] = None
    user_id: Optional[str] = None

    # class Config:
    #     json_encoders = {
    #         ObjectId: str
    #     }

class Skill(BaseModel):
    name: str
    proficiency: Optional[str] = None  

class SkillList(BaseModel):
    skills: List[Skill] 

class SocialMedia(BaseModel):
    platform: str  # Name of the social media platform (e.g., "LinkedIn", "GitHub")
    url: str  

class Resume(BaseModel):
    full_name: str
    phone: str
    email: str
    address: str
    summary: Optional[str] = None  # Short summary or objective
    work_experience: List[Experience] = []
    education: List[Education] = []
    skills: List[Skill] = []
    certifications: Optional[List[str]] = []  # List of certifications
    languages: Optional[List[str]] = []  # List of languages
    social_media: Optional[List[SocialMedia]] = [] 

class ResumeOut(BaseModel):
    id: str  # ObjectId will be returned as a string
    full_name: str
    phone: str
    email: str
    address: str
    summary: Optional[str] = None
    work_experience: List[Experience] = []
    education: List[Education] = []
    skills: List[Skill] = []
    certifications: Optional[List[str]] = []
    languages: Optional[List[str]] = []
    social_media: Optional[List[SocialMedia]] = [] 

class PromptRequest(BaseModel):
    prompt: str

class JobSchema(BaseModel):
    job_position: str
    job_link: str  # Change HttpUrl to str
    job_id: str
    company_name: str
    company_profile: str  # Change HttpUrl to str
    job_location: str
    job_posting_date: str
    company_logo_url: str  

class Wishlist(BaseModel):
    user_id: Optional[str]
    jobs: Optional[List[str]]= None

    


class UserOut(BaseModel):
    username: str
    email: str
    is_verified: bool 

class VerifyEmailRequest(BaseModel):
    user_email: str
    otp: str

class Preferences(BaseModel):
    jobType: str
    locations: List[str]
    # salaryRange: List[int]
    industry: str
    workingHours: str

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class ResetPasswordRequest(BaseModel):
    email: EmailStr
    otp: str
    new_password: str

SECRET_KEY="dggdhfgsgfufnbsfgf"
ALGORITHM="HS256"
def create_access_token2(data: dict, expires_delta: timedelta = None):
    expiration = datetime.utcnow() + expires_delta if expires_delta else datetime.utcnow() + timedelta(minutes=15)
    data.update({"exp": expiration})
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

ACCESS_TOKEN_EXPIRE_MINUTES=1200



def create_access_token(data: dict, expires_delta: timedelta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_password(stored_hash: str, password: str) -> bool:
    return pwd_context.verify(password, stored_hash)

def create_access_token1(data: dict, expiration: timedelta) -> str:
    to_encode = data.copy()
    
    # Get the user ID or unique identifier (assuming it's in the data dictionary)
    subject = str(data.get('sub'))  # 'sub' will be the username (or email) for the user
    user_id = str(data.get('user_id'))  # Unique user ID
    
    if not subject or not user_id:
        raise HTTPException(status_code=400, detail="User ID or Username is missing")

    # Set the expiration as a Unix timestamp
    expiration_time = datetime.utcnow() + expiration
    exp_timestamp = int(expiration_time.timestamp())  # Convert to Unix timestamp
    
    # Prepare the JWT payload
    to_encode.update({
        "sub": subject,  # 'sub' is the username or email
        "user_id": user_id,  # Unique user ID
        "exp": exp_timestamp  # Expiration time in Unix timestamp
    })
    
    # Encode the JWT token with the specified secret key and algorithm
    encoded_jwt = jwt.encode(
        to_encode,
        key=settings.SECRET_KEY,
        algorithm=settings.ENCRYPTION_ALGORITHM
    )
    
    return encoded_jwt


ACCESS_TOKEN_EXPIRE_MINUTES=1200

bearer_scheme = HTTPBearer()

def get_current_user(token: HTTPAuthorizationCredentials = Depends(bearer_scheme)):
    try:
        # Extract the actual token string from HTTPAuthorizationCredentials
        actual_token = token.credentials
        
        payload = jwt.decode(actual_token, settings.SECRET_KEY, algorithms=[settings.ENCRYPTION_ALGORITHM])
        username: str = payload.get("sub")
        user_id: str = payload.get("user_id")

      
        if username is None or user_id is None:
            raise HTTPException(
                status_code=401,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )

        # print(f"Decoded token payload: {payload}")  
        return {"username": username, "user_id": user_id}
    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

