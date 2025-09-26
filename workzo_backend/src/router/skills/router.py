from fastapi import APIRouter, HTTPException, Depends
from typing import List
from bson import ObjectId
from ...router.auth.models import Skill, skill_information, db, get_current_user

router = APIRouter()

def serialize_skill(skill):
    return {**skill, "_id": str(skill["_id"])}

# Create skills
@router.post("/job_api/skills/")
async def save_skills(
    skills: List[Skill], current_user: dict = Depends(get_current_user)
):
    """Save multiple skills for the user."""
    # Fetch the user from the database using user_id
    user = await db.users.find_one({"_id": ObjectId(current_user["user_id"])})
    if not user.get("is_verified", False):
        raise HTTPException(status_code=403, detail="User is not verified")

    # Prepare skill data and associate it with the user
    skill_data = [skill.dict() for skill in skills]
    for skill in skill_data:
        skill["user_id"] = current_user["user_id"]

    # Insert the data into the skill_information collection
    result = await skill_information.insert_many(skill_data)

    return {"message": "Skills saved successfully", "ids": [str(id) for id in result.inserted_ids]}

# Retrieve skills
@router.get("/job_api/skills/")
async def get_skills(current_user: dict = Depends(get_current_user)):
    """Retrieve skills for the authenticated user."""
    user = await db.users.find_one({"_id": ObjectId(current_user["user_id"])})
    if not user.get("is_verified", False):
        raise HTTPException(status_code=403, detail="User is not verified")

    skills = await skill_information.find({"user_id": current_user["user_id"]}).to_list(length=100)
    return {"skills": [serialize_skill(skill) for skill in skills]}

# Update a skill
@router.put("/job_api/skills/{skill_id}")
async def update_skill(
    skill_id: str, skill_info: Skill, current_user: dict = Depends(get_current_user)
):
    """Update a skill for the authenticated user."""
    user_id = current_user["user_id"]

    # Ensure the user exists
    user = await db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if not user.get("is_verified", False):
        raise HTTPException(status_code=403, detail="User is not verified")

    # Fetch the existing skill by _id and user_id
    skill_entry = await skill_information.find_one({"_id": ObjectId(skill_id), "user_id": user_id})
    if not skill_entry:
        raise HTTPException(status_code=404, detail="Skill not found")

    # Update the fields with new values
    update_data = {"$set": {}}
    if skill_info.name:
        update_data["$set"]["name"] = skill_info.name
    if skill_info.proficiency:
        update_data["$set"]["proficiency"] = skill_info.proficiency

    result = await skill_information.update_one({"_id": ObjectId(skill_id), "user_id": user_id}, update_data)
    if result.modified_count == 0:
        raise HTTPException(status_code=400, detail="Failed to update skill")

    updated_skill = await skill_information.find_one({"_id": ObjectId(skill_id)})
    return {"message": "Skill updated successfully", "skill": serialize_skill(updated_skill)}

# Delete a skill
@router.delete("/job_api/skills/{skill_id}")
async def delete_skill(skill_id: str, current_user: dict = Depends(get_current_user)):
    """Delete a skill for the authenticated user."""
    user_id = current_user["user_id"]

    # Ensure the user exists
    user = await db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if not user.get("is_verified", False):
        raise HTTPException(status_code=403, detail="User is not verified")

    result = await skill_information.delete_one({"_id": ObjectId(skill_id), "user_id": user_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Skill not found")

    return {"message": "Skill deleted successfully"}