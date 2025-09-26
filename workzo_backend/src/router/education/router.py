from fastapi import APIRouter, Depends, HTTPException
from typing import List
from bson import ObjectId
from pydantic import BaseModel, Field
from ...router.auth.models import Education, get_current_user, education_information, db

router = APIRouter()

@router.post("/education/")
async def save_education_info(
    education: List[Education], current_user: dict = Depends(get_current_user)
):
    """Save multiple education entries for the user."""
    user = await db.users.find_one({"_id": ObjectId(current_user["user_id"])})

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if not user.get("is_verified", False):
        raise HTTPException(status_code=403, detail="User is not verified")

    # Prepare education data, removing empty GPA values
    education_data = []
    for edu in education:
        edu_dict = edu.dict(exclude_unset=True)  # Exclude unset (None) values
        edu_dict["user_id"] = current_user["user_id"]

        # Remove GPA if it's None
        if "gpa" in edu_dict and edu_dict["gpa"] is None:
            del edu_dict["gpa"]

        education_data.append(edu_dict)

    # Insert education information into MongoDB
    result = await education_information.insert_many(education_data)

    return {"message": "Education information saved successfully", "ids": [str(id) for id in result.inserted_ids]}



@router.get("/education/")
async def get_education_info(current_user: dict = Depends(get_current_user)):
    """Fetch multiple education entries for the authenticated user."""
    user_id = current_user["user_id"]
    
    # Query the database for the user's education information
    education_info = await education_information.find({"user_id": user_id}).to_list(length=None)
    
    # If no education data is found, return an empty array with a message
    if not education_info:
        return {"message": "No education information found", "education": []}
    
    # Convert ObjectId to string for JSON serialization
    for edu in education_info:
        edu["_id"] = str(edu["_id"])
    
    return education_info


@router.put("/education/{education_id}")
async def update_education_info(
    education_id: str,
    education_info: Education,
    current_user: dict = Depends(get_current_user)
):
    """Update education entry for the authenticated user."""
    user_id = current_user["user_id"]

    # Ensure the user exists
    user = await db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Ensure the user is verified
    if not user.get("is_verified", False):
        raise HTTPException(status_code=403, detail="User is not verified")

    # Fetch the existing education entry by its _id and user_id
    education_entry = await education_information.find_one(
        {"_id": ObjectId(education_id), "user_id": user_id}
    )

    if not education_entry:
        raise HTTPException(status_code=404, detail="Education entry not found")

    # Update the fields with the new values from education_info
    update_data = {"$set": {}}
    if education_info.degree:
        update_data["$set"]["degree"] = education_info.degree
    if education_info.institution:
        update_data["$set"]["institution"] = education_info.institution
    if education_info.start_year:
        update_data["$set"]["start_year"] = education_info.start_year
    if education_info.end_year:
        update_data["$set"]["end_year"] = education_info.end_year
    if education_info.gpa is not None:
        update_data["$set"]["gpa"] = education_info.gpa

    # Perform the update operation
    result = await education_information.update_one(
        {"_id": ObjectId(education_id), "user_id": user_id},
        update_data
    )

    if result.modified_count == 0:
        raise HTTPException(status_code=400, detail="Failed to update education information")

    return {"message": "Education information updated successfully"}

@router.delete("/education/{education_id}")
async def delete_education_info(
    education_id: str, current_user: dict = Depends(get_current_user)
):
    """Delete an education entry for the authenticated user."""
    user_id = current_user["user_id"]

    # Ensure the user exists
    user = await db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Ensure the user is verified
    if not user.get("is_verified", False):
        raise HTTPException(status_code=403, detail="User is not verified")

    # Find and delete the education entry by its _id and user_id
    result = await education_information.delete_one(
        {"_id": ObjectId(education_id), "user_id": user_id}
    )

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Education entry not found")

    return {"message": "Education entry deleted successfully"}
