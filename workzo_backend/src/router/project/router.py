from fastapi import APIRouter, HTTPException, Depends
from typing import List
from bson import ObjectId
from ...router.auth.models import Project, project_information, db, get_current_user

router = APIRouter()

@router.post("/project/")
async def save_project_info(
    projects: List[Project], current_user: dict = Depends(get_current_user)
):
    """Save multiple project entries for the user."""
    user = await db.users.find_one({"_id": ObjectId(current_user["user_id"])})

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if not user.get("is_verified", False):
        raise HTTPException(status_code=403, detail="User is not verified")

    # Prepare the project data and associate it with the user
    project_data = [proj.dict() for proj in projects]
    for proj in project_data:
        proj["user_id"] = current_user["user_id"]

    # Insert project information into MongoDB
    result = await project_information.insert_many(project_data)

    return {"message": "Project information saved successfully", "ids": [str(id) for id in result.inserted_ids]}


@router.get("/project/")
async def get_project_info(current_user: dict = Depends(get_current_user)):
    """Fetch multiple project entries for the authenticated user."""
    user_id = current_user["user_id"]
    
    # Query the database for the user's project information
    project_info = await project_information.find({"user_id": user_id}).to_list(length=None)
    
    # If no project data is found, return an empty array with a message
    if not project_info:
        return {"message": "No project information found", "projects": []}
    
    # Convert ObjectId to string for JSON serialization
    for proj in project_info:
        proj["_id"] = str(proj["_id"])  # Convert ObjectId to string
    
    return project_info


@router.put("/project/{project_id}")
async def update_project_info(
    project_id: str,
    project_info: Project,
    current_user: dict = Depends(get_current_user)
):
    """Update a project entry for the authenticated user."""
    user_id = current_user["user_id"]

    user = await db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if not user.get("is_verified", False):
        raise HTTPException(status_code=403, detail="User is not verified")

    # Fetch the existing project entry
    project_entry = await project_information.find_one(
        {"_id": ObjectId(project_id), "user_id": user_id}
    )

    if not project_entry:
        raise HTTPException(status_code=404, detail="Project entry not found")

    # Update the fields with the new values from project_info
    update_data = {"$set": {}}
    if project_info.project_title:
        update_data["$set"]["project_title"] = project_info.project_title
    if project_info.project_name:
        update_data["$set"]["project_name"] = project_info.project_name
    if project_info.start_month:
        update_data["$set"]["start_month"] = project_info.start_month
    if project_info.end_month:
        update_data["$set"]["end_month"] = project_info.end_month
    if project_info.start_year:
        update_data["$set"]["start_year"] = project_info.start_year
    if project_info.end_year:
        update_data["$set"]["end_year"] = project_info.end_year
    if project_info.description:
        update_data["$set"]["description"] = project_info.description
    if project_info.location:
        update_data["$set"]["location"] = project_info.location
    if project_info.link:
        update_data["$set"]["link"] = project_info.link

    result = await project_information.update_one(
        {"_id": ObjectId(project_id), "user_id": user_id},
        update_data
    )

    if result.modified_count == 0:
        raise HTTPException(status_code=400, detail="Failed to update project information")

    return {"message": "Project information updated successfully"}


@router.delete("/project/{project_id}")
async def delete_project_info(
    project_id: str, current_user: dict = Depends(get_current_user)
):
    """Delete a project entry for the authenticated user."""
    user_id = current_user["user_id"]

    user = await db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if not user.get("is_verified", False):
        raise HTTPException(status_code=403, detail="User is not verified")

    # Find and delete the project entry
    result = await project_information.delete_one(
        {"_id": ObjectId(project_id), "user_id": user_id}
    )

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Project entry not found")

    return {"message": "Project entry deleted successfully"}

