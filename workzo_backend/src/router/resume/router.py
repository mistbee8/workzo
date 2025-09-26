from fastapi import APIRouter, HTTPException, Depends, File, UploadFile
from typing import List
from bson import ObjectId
from ...router.auth.models import Resume, ResumeOut, Experience, Education, Skill, resume_collection, resume_information, get_current_user
import io
import re
import PyPDF2
import docx
from datetime import datetime
from fastapi.responses import StreamingResponse

router = APIRouter()

@router.post('/auth/upload_resume', response_model=ResumeOut)
async def resume_submit(resume: Resume, current_user: dict = Depends(get_current_user)):
    """
    Endpoint to submit a resume. Only authenticated users can submit resumes.
    The resume will be associated with the user's ID.
    """
  
    resume_dict = resume.dict()


    resume_dict['user_id'] = current_user['user_id']

    try:

        result = await resume_collection.insert_one(resume_dict)


        resume_dict['id'] = str(result.inserted_id)

        return ResumeOut(**resume_dict)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error inserting resume into database: {str(e)}")
    

@router.get('/resumes/', response_model=List[ResumeOut])
async def get_all_resumes(current_user: dict = Depends(get_current_user)):
    """
    Endpoint to get all resumes for the authenticated user.
    Only resumes submitted by the authenticated user are returned.
    """
    try:
   
        resumes_cursor = resume_collection.find({"user_id": current_user["user_id"]})
        resumes = await resumes_cursor.to_list(length=None)

        if not resumes:
            raise HTTPException(status_code=404, detail="No resumes found for the user")


        for resume in resumes:
            resume['id'] = str(resume['_id']) 
        
        return [ResumeOut(**resume) for resume in resumes]

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving resumes: {str(e)}")


@router.get('/resumes/{resume_id}', response_model=ResumeOut)
async def get_resume(resume_id: str, current_user: dict = Depends(get_current_user)):
    """
    Endpoint to get a resume. Only the user who submitted the resume can retrieve it.
    """
    try:
  
        resume = await resume_collection.find_one({"_id": ObjectId(resume_id)})

        if not resume:
            raise HTTPException(status_code=404, detail="Resume not found")

        if resume['user_id'] != current_user['user_id']:
            raise HTTPException(status_code=403, detail="You are not authorized to view this resume")

        resume['id'] = str(resume['_id'])
        return ResumeOut(**resume)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving resume: {str(e)}")

@router.delete('/resumes/{resume_id}')
async def delete_resume(resume_id: str, current_user: dict = Depends(get_current_user)):
    """
    Endpoint to delete a resume. Only the user who submitted the resume can delete it.
    """
    try:
        resume = await resume_collection.find_one({"_id": ObjectId(resume_id)})
        
        if not resume:
            raise HTTPException(status_code=404, detail="Resume not found")
        
        if resume['user_id'] != current_user['user_id']:
            raise HTTPException(status_code=403, detail="You are not authorized to delete this resume")
        
        await resume_collection.delete_one({"_id": ObjectId(resume_id)})
        return {"message": "Resume deleted successfully"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting resume: {str(e)}")
   

@router.post("/resumes/upload/", response_model=ResumeOut)
async def upload_resume(file: UploadFile = File(...), current_user: dict = Depends(get_current_user)):
    """
    Endpoint to upload a resume file (PDF or DOCX).
    The file will be parsed and stored in MongoDB along with the user's information.
    """

    file_content = await file.read()
    parsed_resume = await parse_resume(file_content, file.filename)
    

    resume_data = parsed_resume.dict()
    resume_data["user_id"] = current_user["user_id"]  
    resume_data["uploaded_at"] = datetime.utcnow().isoformat() 
    
  
    result = await resume_collection.insert_one(resume_data)


    resume_data['id'] = str(result.inserted_id)

    return ResumeOut(**resume_data)



async def parse_resume(file_content: bytes, filename: str):
    """
    Parse the resume file based on its type (PDF or DOCX).
    """
    if filename.endswith(".pdf"):
        return await parse_pdf(file_content)
    elif filename.endswith(".docx"):
        return await parse_docx(file_content)
    else:
        raise HTTPException(status_code=400, detail="Unsupported file format")



async def parse_pdf(file_content: bytes):
    """
    Parse a PDF resume and extract key details (full name, phone, email, etc.).
    """
    pdf_reader = PyPDF2.PdfReader(io.BytesIO(file_content))
    text = ""
    for page in pdf_reader.pages:
        text += page.extract_text()
    
    # Extract each individual detail
    parsed_data = {
        "full_name": extract_full_name(text),
        "phone": extract_phone(text),
        "email": extract_email(text),
        "address": extract_address(text),
        "summary": extract_summary(text),
        "work_experience": extract_work_experience(text),
        "education": extract_education(text),
        "skills": extract_skills(text),
        "certifications": extract_certifications(text),
        "languages": extract_languages(text),
        "social_media": extract_social_media(text),
    }

   
    
    # Return the parsed data as a Resume object
    return Resume(**parsed_data)



async def parse_docx(file_content: bytes):
    """
    Parse a DOCX resume and extract key details (full name, phone, email, etc.).
    """
    doc = docx.Document(io.BytesIO(file_content))
    text = ""
    for paragraph in doc.paragraphs:
        text += paragraph.text
    
    # Extract the main details from the text
    parsed_data = {
        "full_name": extract_full_name(text),
        "phone": extract_phone(text),
        "email": extract_email(text),
        "address": extract_address(text),
        "summary": extract_summary(text),
        "work_experience": extract_work_experience(text),
        "education": extract_education(text),
        "skills": extract_skills(text),
        "certifications": extract_certifications(text),
        "languages": extract_languages(text),
        "social_media": extract_social_media(text),
    }

    # Extract social media profiles
   

    # Return the parsed data as a Resume object
    return Resume(**parsed_data)




def extract_full_name(text: str) -> str:
    return text.split("\n")[0].strip()

def extract_phone(text: str) -> str:
    phone_regex = r"\+?[0-9][0-9\-\(\)\ ]{7,15}"
    match = re.search(phone_regex, text)
    return match.group(0) if match else ""

def extract_email(text: str) -> str:
    email_regex = r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
    match = re.search(email_regex, text)
    return match.group(0) if match else ""

def extract_address(text: str) -> str:
    return ""

def extract_summary(text: str) -> str:
    return ""

def extract_work_experience(text: str) -> List[Experience]:
    return []

def extract_education(text: str) -> List[Education]:
    return []

def extract_skills(text: str) -> List[Skill]:
    return []

def extract_certifications(text: str) -> List[str]:
    return []

def extract_languages(text: str) -> List[str]:
    return []

def extract_social_media(text: str) -> List[str]:
    return []

# def extract_linkedin(text: str) -> str:
#     linkedin_regex = r"(https?://(www\.)?linkedin\.com/[a-zA-Z0-9_\-./]+)"
#     match = re.search(linkedin_regex, text)
#     return match.group(0) if match else "Not found"



# def extract_github(text: str) -> str:
#     github_regex = r"(https?://(www\.)?github\.com/[a-zA-Z0-9_\-./]+)"
#     match = re.search(github_regex, text)
#     return match.group(0) if match else "Not found"


@router.put("/resumes/{resume_id}/edit", response_model=ResumeOut)
async def edit_resume(resume_id: str, updated_resume: Resume, current_user: dict = Depends(get_current_user)):
    """
    Endpoint to edit a previously uploaded resume details.
    """

    resume = await resume_collection.find_one({"_id": ObjectId(resume_id), "user_id": current_user["user_id"]})
    
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found or doesn't belong to the current user.")
    

    update_data = updated_resume.dict(exclude_unset=True) 
    update_data["updated_at"] = datetime.utcnow().isoformat()

    result = await resume_collection.update_one(
        {"_id": ObjectId(resume_id)},
        {"$set": update_data}
    )

    if result.modified_count == 0:
        raise HTTPException(status_code=400, detail="No changes were made to the resume.")


    updated_resume_data = await resume_collection.find_one({"_id": ObjectId(resume_id)})
    updated_resume_data["id"] = str(updated_resume_data["_id"])

    return ResumeOut(**updated_resume_data)
