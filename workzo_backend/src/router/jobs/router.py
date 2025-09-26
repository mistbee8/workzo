
from fastapi import APIRouter, HTTPException, Depends, Query, File, UploadFile
from typing import List, Optional, Dict
from bson import ObjectId
from ...router.auth.models import JobSchema, PromptRequest, job_collection, resume_information, get_current_user
import httpx
import requests
import os
import json
import io
import re
import spacy
import fitz
from io import BytesIO
from datetime import datetime
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorGridFSBucket
from fastapi.responses import StreamingResponse
from src.utils.config import get_settings
settings = get_settings()
router = APIRouter()

@router.post("/jobs/")
async def save_jobs(jobs: List[JobSchema]):

    jobs_dict = [job.dict() for job in jobs]


    result = await job_collection.insert_many(jobs_dict)


    return {"inserted_ids": [str(id) for id in result.inserted_ids]}

@router.get("/jobs/", response_model=List[JobSchema])
async def get_jobs():

    jobs_cursor = job_collection.find()


    jobs = await jobs_cursor.to_list(length=1000) 

    return jobs



@router.get("/jobs/{job_id}", response_model=JobSchema)
async def get_job(job_id: str):
 
    job = await job_collection.find_one({"job_id": job_id})

    if job is None:
        raise HTTPException(status_code=404, detail="Job not found")

    return job



API_URL = os.getenv("API_URL")
API_KEY= os.getenv("API_KEY")
@router.get("/fetch_jobs")
async def fetch_jobs(
    field: str = Query("engineering", description="The job field to search for"),
    geoid: int = Query(..., description="Geographic location ID"),
    page: int = Query(1, description="Page number for pagination"),
):
    """
    Fetch jobs from ScrapingDog API and save them to MongoDB.

    Parameters:
    - field: The job field to search for (default: "engineering").
    - geoid: Geographic location ID (required).
    - page: The page number to fetch (default: 1).
    """
   
    url = f"{API_URL}?api_key={API_KEY}&field={field}&geoid={geoid}&page={page}"

    try:
      
        response = requests.get(url)
        response.raise_for_status()  
        jobs = response.json()  

        # Save jobs to MongoDB
        if jobs:
            job_collection.insert_many(jobs) 

        return {"message": "Jobs fetched and saved successfully!", "job_count": len(jobs)}
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}
    except Exception as e:
        return {"error": str(e)}








client = AsyncIOMotorClient(settings.MONGODB_URI)
db = client["mydatabase1"]  # Replace with your database name
fs = AsyncIOMotorGridFSBucket(db)
@router.post("/upload-pdf/")
async def upload_pdf(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Invalid file type. Only PDF files are allowed.")

    # Read file content
    pdf_content = await file.read()

    # Save the file in MongoDB using AsyncIOMotorGridFSBucket
    try:
        async with fs.open_upload_stream(file.filename, metadata={"content_type": file.content_type}) as upload_stream:
            await upload_stream.write(pdf_content)
            pdf_id = upload_stream._id  # Get the file ID
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred while uploading the file: {str(e)}")
    
    return {"message": "PDF uploaded successfully", "pdf_id": str(pdf_id)}

@router.get("/get-pdf/{pdf_id}")
async def get_pdf(pdf_id: str):
    try:
        # Retrieve the file from GridFS
        grid_out = await fs.open_download_stream(ObjectId(pdf_id))
    except Exception as e:
        raise HTTPException(status_code=404, detail="PDF not found")

    # Return the file as a streaming response
    return StreamingResponse(
        io.BytesIO(await grid_out.read()),
        media_type=grid_out.metadata["content_type"],
        headers={"Content-Disposition": f"attachment; filename={grid_out.filename}"}
    )





hf_token  = os.getenv("hf_token")
model_endpoint= os.getenv("model_endpoint")

@router.get("/get_api_key")
async def get_api_key():
    hf_token = os.getenv("hf_token")  # Get API key from environment variable

    if not hf_token:
        raise HTTPException(status_code=500, detail="API Key is missing")

    return {"api_key": hf_token}  # Return only the API key

# Define the headers for the API request
headers = {
    "Authorization": f"Bearer {hf_token}",
    "Content-Type": "application/json"
}

# Define a Pydantic model to represent the request body for a prompt



# Route to handle the prompt input and model request
@router.post("/process_prompt/")
async def process_prompt(prompt_request: PromptRequest):
    prompt = prompt_request.prompt  # Get the prompt from the request body

    # Prepare the payload for the Hugging Face API request
    payload = {
        "inputs": prompt,
        "parameters": {
            "max_length": 150,
            "temperature": 0.7
        }
    }

    # Send the request to Hugging Face API
    response = requests.post(model_endpoint, headers=headers, json=payload)

    # Check the response status and return the result
    if response.status_code == 200:
        result = response.json()
        if isinstance(result, list):
            return {"summary": result[0]['generated_text']}  # Extract the generated text
        else:
            return {"error": "Unexpected response format"}
    else:
        return {"error": f"Error: {response.status_code}", "message": response.text}
    
nlp = spacy.load("en_core_web_sm")

class PDFProcessor:
    def __init__(self, collection):
        self.collection = collection
    
    async def extract_text_from_pdf(self, file: BytesIO) -> str:
        """Extract text from a PDF file asynchronously."""
        document = fitz.open(stream=file, filetype="pdf")
        text = ""
        for page_num in range(document.page_count):
            page = document.load_page(page_num)
            text += page.get_text()
        return text

    def extract_keywords(self, text: str) -> List[str]:
        """Extract relevant keywords from text."""
        doc = nlp(text)
        keywords = set()

        # Extract entities like ORG (organizations), GPE (geopolitical entities), SKILL, etc.
        for ent in doc.ents:
            if ent.label_ in ["ORG", "GPE", "PERSON", "SKILL"]:
                keywords.add(ent.text)

        # Also extract nouns (could be skills, technologies, etc.)
        for token in doc:
            if token.pos_ == "NOUN" and len(token.text) > 2:
                keywords.add(token.text.lower())  # Convert to lowercase for consistency

        # Optionally, extract specific patterns such as email addresses or phone numbers
        email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b'
        phone_pattern = r'\+?[1-9]\d{1,14}'  # International phone numbers
        emails = re.findall(email_pattern, text)
        phones = re.findall(phone_pattern, text)

        # Add email addresses and phone numbers as keywords (if any)
        keywords.update(emails)
        keywords.update(phones)

        # Return the list of keywords (as a sorted list or you can return it as needed)
        return list(keywords)

    async def save_to_mongo(self, file_name: str, text: str, user_id: str):
        """Save extracted text to MongoDB asynchronously, along with extracted keywords."""
        keywords = self.extract_keywords(text)  # Extract keywords from text
        
        resume_data = {
            "file_name": file_name,
            "text": text,
            "keywords": keywords,  
            "user_id": user_id,  
            "uploaded_at": datetime.utcnow().isoformat()  
        }

        await self.collection.insert_one(resume_data)

# Instantiate the PDFProcessor class
pdf_processor = PDFProcessor(resume_information)

# Endpoint to upload PDF and save extracted data and keywords to MongoDB
@router.post("/upload/")  # Same endpoint to upload the PDF
async def upload_pdf(file: UploadFile = File(...), current_user: dict = Depends(get_current_user)):
    """
    Endpoint to upload a PDF file.
    The file will be parsed, and the data will be stored in MongoDB along with the user's information.
    """
    try:
        # Read file content into a BytesIO object
        file_content = await file.read()
        pdf_file = BytesIO(file_content)
        
        # Extract text from the PDF
        extracted_text = await pdf_processor.extract_text_from_pdf(pdf_file)

        # Save to MongoDB with user_id from current_user and extracted keywords
        await pdf_processor.save_to_mongo(file.filename, extracted_text, current_user["user_id"])
        
        return {"message": "File uploaded and data saved to MongoDB with extracted keywords!"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
@router.get("/allresumes/", response_model=Dict)
async def get_resume(current_user: dict = Depends(get_current_user)):
    """
    Fetch the most recent resume uploaded by the authenticated user.
    This endpoint fetches a single resume.
    """
    try:
        print(f"Fetching resume for user_id: {current_user['user_id']}")
        
        # Fetch the most recent resume for the authenticated user
        resume = await resume_information.find_one({"user_id": current_user["user_id"]})
        
        # If no resume is found, return a message indicating no data
        if not resume:
            return {"message": "No resume found for this user."}
        
        # Convert ObjectId to string for JSON serialization
        resume["_id"] = str(resume["_id"])  # This line converts the ObjectId to string
        
        return {"message": "Resume fetched successfully.", "resume": resume}

    except Exception as e:
        print(f"Error occurred: {e}")  # Log the error
        return {"message": "No resume found for this user."}

