import os
from pathlib import Path
from functools import lru_cache
from typing import Annotated, Any
from pydantic_settings import BaseSettings, SettingsConfigDict
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import random
import string
from dotenv import load_dotenv
from pydantic import (
    AnyUrl, 
    BeforeValidator,
    computed_field
)

load_dotenv()


def parse_comma_separated_list(v: Any) -> list[str] | str:
    """Parse comma-separated string or list of strings into a list of strings."""
    if isinstance(v, str) and not v.startswith("["):
        return [i.strip() for i in v.split(",")]
    elif isinstance(v, list | str):
        return v
    raise ValueError(v)


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    PROJECT_NAME: str
    API_STR: str = "job_api"
    API_VERSION: str

    service_port: int = 8000
    typesense_host: str = "localhost"
    typesense_port: str = "8108" 
    typesense_api_key: str = "xyz"
    typesense_timeout: int = 2
    FASTAPI_PORT: int
    ENCRYPTION_ALGORITHM: str
    debug: bool = True  # Development mode flag
    MONGO_INITDB_DATABASE: str
    MONGO_INITDB_ROOT_USERNAME: str
    MONGO_INITDB_ROOT_PASSWORD: str
    MONGODB_URI: str
    BASE_URL: str
    OAUTHLIB_INSECURE_TRANSPORT: bool = False
    ACCESS_TOKEN_EXPIRE_MINUTES: int
    SECRET_KEY: str
    FRONTEND_URL: str
    GOOGLE_CLIENT_ID: str = ""
    GOOGLE_CLIENT_SECRET: str = ""
    GOOGLE_CALLBACK_PATH: str = "/auth/google/callback"
    SENDER_EMAIL: str
    SENDER_PASSWORD: str
    API_KEY: str = ""
    API_URL: str = ""
    TYPESENSE_COLLECTION_NAME: str = ""
    TYPESENSE_URL: str = ""
    TYPESENSE_SEARCH_HOST: str = ""
    hf_token: str = ""
    model_endpoint: str = ""
    GOOGLE_AUTH_SCOPE: Annotated[
        list[str] | str, BeforeValidator(parse_comma_separated_list)
    ] = []

    @computed_field  # type: ignore[prop-decorator]
    @property
    def API_BASE_PATH(self) -> str:
        return f"/{self.API_STR}/{self.API_VERSION}"

    @computed_field  # type: ignore[prop-decorator]
    @property
    def GOOGLE_AUTH_SCOPE_LIST(self) -> list[str]:
        return [str(scope).rstrip("/") for scope in self.GOOGLE_AUTH_SCOPE] 

    class Config:
        env_file = ".env"
        extra = "ignore"  # Ignore extra fields instead of forbidding them


SENDER_EMAIL = os.getenv("SENDER_EMAIL")
SENDER_PASSWORD = os.getenv("SENDER_PASSWORD")

def generate_otp(length=6):
    return ''.join(random.choices(string.digits, k=length))

# Function to send OTP email via Gmail
def send_otp_email(to_email: str, otp: str):
    try:
        # Create the email message
        message = MIMEMultipart()
        message["From"] = SENDER_EMAIL
        message["To"] = to_email
        message["Subject"] = "Email Verification OTP"
        body = f"Your OTP for email verification is: {otp}"
        message.attach(MIMEText(body, "plain"))
        
        # Set up the SMTP server and send email
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(SENDER_EMAIL, SENDER_PASSWORD)
            server.sendmail(SENDER_EMAIL, to_email, message.as_string())
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False


@lru_cache()
def get_settings():
    return Settings()


