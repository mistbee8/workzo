
from fastapi import APIRouter, HTTPException, Depends
from typing import List
from bson import ObjectId
from ...router.auth.models import Experience, experience_information, db, get_current_user

router = APIRouter()

@router.post("/experience/")
async def save_experience_info(
    experiences: List[Experience], current_user: dict = Depends(get_current_user)
):
    """Save multiple experience entries for the user."""
    # Fetch the user from the database using user_id
    user = await db.users.find_one({"_id": ObjectId(current_user["user_id"])})
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Check if the user is verified
    if not user.get("is_verified", False):
        raise HTTPException(status_code=403, detail="User is not verified")

    # Prepare the experience data and associate it with the user
    experience_data = [exp.dict() for exp in experiences]
    for exp in experience_data:
        exp["user_id"] = current_user["user_id"]  # Associate personal info with the user

    # Insert experience information into MongoDB
    result = await experience_information.insert_many(experience_data)

    # Return the IDs of the newly created experience entries
    return {"message": "Experience information saved successfully", "ids": [str(id) for id in result.inserted_ids]}

@router.get("/experience/")
async def get_experience_info(current_user: dict = Depends(get_current_user)):
    """Fetch multiple experience entries for the authenticated user."""
    user_id = current_user["user_id"]
    
    # Query the database for the user's experience information
    experience_info = await experience_information.find({"user_id": user_id}).to_list(length=None)
    
    # If no experience data is found, return an empty array with a message
    if not experience_info:
        return {"message": "No experience information found", "experience": []}
    
    # Convert ObjectId to string for JSON serialization
    for exp in experience_info:
        exp["_id"] = str(exp["_id"])  # This line converts the ObjectId to string
    
    return experience_info

@router.put("/experience/{experience_id}")
async def update_experience_info(
    experience_id: str,
    experience_info: Experience,
    current_user: dict = Depends(get_current_user)
):
    """Update an experience entry for the authenticated user."""
    user_id = current_user["user_id"]

    # Ensure the user exists
    user = await db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Ensure the user is verified
    if not user.get("is_verified", False):
        raise HTTPException(status_code=403, detail="User is not verified")

    # Fetch the existing experience entry by its _id and user_id
    experience_entry = await experience_information.find_one(
        {"_id": ObjectId(experience_id), "user_id": user_id}
    )

    if not experience_entry:
        raise HTTPException(status_code=404, detail="Experience entry not found")

    # Update the fields with the new values from experience_info
    update_data = {"$set": {}}
    if experience_info.job_title:
        update_data["$set"]["job_title"] = experience_info.job_title
    if experience_info.company_name:
        update_data["$set"]["company_name"] = experience_info.company_name
    if experience_info.start_date:
        update_data["$set"]["start_date"] = experience_info.start_date
    if experience_info.end_date:
        update_data["$set"]["end_date"] = experience_info.end_date
    if experience_info.description:
        update_data["$set"]["description"] = experience_info.description
    if experience_info.location:
        update_data["$set"]["location"] = experience_info.location

    # Perform the update operation
    result = await experience_information.update_one(
        {"_id": ObjectId(experience_id), "user_id": user_id},
        update_data
    )

    if result.modified_count == 0:
        raise HTTPException(status_code=400, detail="Failed to update experience information")

    return {"message": "Experience information updated successfully"}

@router.delete("/experience/{experience_id}")
async def delete_experience_info(
    experience_id: str, current_user: dict = Depends(get_current_user)
):
    """Delete an experience entry for the authenticated user."""
    user_id = current_user["user_id"]

    # Ensure the user exists
    user = await db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Ensure the user is verified
    if not user.get("is_verified", False):
        raise HTTPException(status_code=403, detail="User is not verified")

    # Find and delete the experience entry by its _id and user_id
    result = await experience_information.delete_one(
        {"_id": ObjectId(experience_id), "user_id": user_id}
    )

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Experience entry not found")

    return {"message": "Experience entry deleted successfully"}
