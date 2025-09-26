# Standard library imports
from typing import Union, List, Dict
from datetime import datetime, timedelta, timezone
from contextlib import asynccontextmanager
from io import BytesIO



# Third-party imports
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


from src.utils.config import get_settings, send_otp_email, generate_otp

from src.router.auth.router import router as src_auth_router
from src.router.education.router import router as education_router
from src.router.experience.router import router as experience_router
from src.router.jobs.router import router as jobs_router
from src.router.personal.router import router as personal_router
from src.router.preferences.router import router as preferences_router
from src.router.project.router import router as project_router
from src.router.resume.router import router as resume_router
from src.router.skills.router import router as skills_router
from src.router.socialmedia.router import router as socialmedia_router

settings = get_settings()



app = FastAPI(
    title=settings.PROJECT_NAME,
    docs_url=f"{settings.API_BASE_PATH}/docs",
    openapi_url="/job_api/v1/openapi.json",
)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events"""
    # Startup
    print("🚀 Starting Agra Heritage Tourism API...")
   
    print("✅ Database initialized")
    yield
    # Shutdown
    print("🛑 Shutting down Agra Heritage Tourism API...")

# Include all routers
# app.include_router(auth_router, prefix="/job_api/v1/auth", tags=["auth"])
app.include_router(src_auth_router, prefix="/job_api/v1/auth", tags=["src_auth"])
app.include_router(education_router, prefix="/job_api/v1", tags=["education"])
app.include_router(experience_router, prefix="/job_api/v1", tags=["experience"])
app.include_router(jobs_router, prefix="/job_api/v1", tags=["jobs"])
app.include_router(personal_router, prefix="/job_api/v1", tags=["personal"])
app.include_router(preferences_router, prefix="/job_api/v1", tags=["preferences"])
app.include_router(project_router, prefix="/job_api/v1", tags=["project"])
app.include_router(resume_router, prefix="/job_api/v1", tags=["resume"])
app.include_router(skills_router, prefix="/job_api/v1", tags=["skills"])
app.include_router(socialmedia_router, prefix="/job_api/v1", tags=["socialmedia"])

otp_store = {}  





origins = [
    "https://main.d10g96a0f07hz5.amplifyapp.com",
    "http://localhost:5173",
    "https://client-job1.netlify.app",  
    "https://workzo.io",
    "https://www.workzo.io"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)


@app.get("/job_api")
def read_root():
    return {"Backend healthy"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=settings.FASTAPI_PORT,
        reload=settings.debug
    )






