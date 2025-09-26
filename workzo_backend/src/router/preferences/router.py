
from fastapi import APIRouter, HTTPException, Depends
from bson import ObjectId
from src.router.auth.models import Preferences, wishlist_information, personal_preference, db, get_current_user,users_collection

router = APIRouter()

@router.get("/wishlist/")
async def get_wishlist(current_user: dict = Depends(get_current_user)):
    """
    Retrieve the wishlist for the authenticated user.
    """
    # Validate current user
    user = await users_collection.find_one({"_id": ObjectId(current_user["user_id"])})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if not user.get("is_verified", False):
        raise HTTPException(status_code=403, detail="User is not verified")

    # Fetch the wishlist for the user
    wishlist = await wishlist_information.find_one({"user_id": current_user["user_id"]})

    if not wishlist:
        return {
            "message": "No wishlist found for the user",
            "user_id": current_user["user_id"],
            "jobs": [],
        }

    return {
        "message": "Wishlist retrieved successfully",
        "user_id": current_user["user_id"],
        "jobs": wishlist["jobs"],
    }

@router.post("/wishlist/")
async def save_wishlist(job_id: str, current_user: dict = Depends(get_current_user)):
    """
    Add or remove a job to/from the wishlist for the authenticated user in the 'namemedia' collection.
    """

    user = await db.users.find_one({"_id": ObjectId(current_user["user_id"])})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if not user.get("is_verified", False):
        raise HTTPException(status_code=403, detail="User is not verified")

    # Check if a wishlist already exists for the user
    existing_wishlist = await wishlist_information.find_one({"user_id": current_user["user_id"]})

    if existing_wishlist:
        # Check if the job_id is already in the wishlist
        if job_id in existing_wishlist["jobs"]:
            # Remove the job_id from the wishlist
            await wishlist_information.update_one(
                {"user_id": current_user["user_id"]},
                {"$pull": {"jobs": job_id}}  # Pull the job_id out of the jobs array
            )
            return {"message": f"Job {job_id} removed from wishlist successfully"}
        else:
            # Add the job_id to the wishlist
            await wishlist_information.update_one(
                {"user_id": current_user["user_id"]},
                {"$push": {"jobs": job_id}}  # Add the job_id to the jobs array
            )
            return {"message": f"Job {job_id} added to wishlist successfully"}
    else:
        # Create a new wishlist with the job_id if no wishlist exists
        data = {
            "user_id": current_user["user_id"],
            "jobs": [job_id]  # Initialize the jobs array with the new job_id
        }
        await wishlist_information.insert_one(data)
        return {"message": f"Job {job_id} added to wishlist successfully"}


@router.post("/preferences/")
async def save_preferences(
    preferences: Preferences, current_user: dict = Depends(get_current_user)
):
    """Save preferences of the user."""

    # Fetch the user from the database using the user_id from current_user
    user = await db.users.find_one({"_id": ObjectId(current_user["user_id"])})

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Check if the user is verified
    if not user.get("is_verified", False):
        raise HTTPException(status_code=403, detail="User is not verified")

    # Insert preferences into the database
    data = preferences.dict()
    data["user_id"] = current_user["user_id"]  # Associate preferences with the user
    result = await personal_preference.insert_one(data)

    return {"message": "Preferences saved successfully", "id": str(result.inserted_id)}

@router.get("/preferences/")
async def get_preferences(current_user: dict = Depends(get_current_user)):
    """Get preferences of the user."""
    
 
    preferences = await personal_preference.find_one({"user_id": current_user["user_id"]})
    
    if not preferences:
        raise HTTPException(status_code=404, detail="Preferences not found")


    preferences.pop("_id")
    
    return preferences

# Endpoint to update preferences (PUT)
@router.put("/preferences/")
async def update_preferences(
    preferences: Preferences, current_user: dict = Depends(get_current_user)
):
    """Update preferences of the user."""
    
    # Fetch the existing preferences from the database
    existing_preferences = await personal_preference.find_one({"user_id": current_user["user_id"]})
    
    if not existing_preferences:
        raise HTTPException(status_code=404, detail="Preferences not found")
    
    # Update the preferences with new data
    updated_preferences = preferences.dict()
    updated_preferences["user_id"] = current_user["user_id"]
    
    result = await personal_preference.update_one(
        {"user_id": current_user["user_id"]}, {"$set": updated_preferences}
    )

    if result.modified_count == 0:
        raise HTTPException(status_code=400, detail="Failed to update preferences")

    return {"message": "Preferences updated successfully"}
