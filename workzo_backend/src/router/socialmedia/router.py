from fastapi import APIRouter, HTTPException, Depends
from typing import List
from bson import ObjectId
from ...router.auth.models import SocialMedia, social_information, db, get_current_user

router = APIRouter()

@router.post("/socialmedia/")
async def save_or_update_social_media_links(
    social_links: List[SocialMedia],
    current_user: dict = Depends(get_current_user)
):
    """
    Save or update social media links for the authenticated user.
    If any social media links exist for the user, they will be overwritten; otherwise, new records will be created.
    """
    user_id = current_user["user_id"]

    # Fetch the user from the database using user_id
    user = await db.users.find_one({"_id": ObjectId(user_id)})

    # Ensure the user is verified
    if not user.get("is_verified", False):
        raise HTTPException(status_code=403, detail="User is not verified")

    response = {"created": [], "updated": []}

    # Check if the user already has social media links
    for link in social_links:
        # Always overwrite the existing data
        update_data = {"$set": {}}
        if link.platform:
            update_data["$set"]["platform"] = link.platform
        if link.url:
            update_data["$set"]["url"] = link.url

        # Perform the update (if the record exists) or insert (if the record does not exist)
        result = await social_information.update_one(
            {"user_id": user_id, "platform": link.platform},
            update_data,
            upsert=True  # This ensures that if the record doesn't exist, it will be created
        )

        if result.upserted_id:
            response["created"].append(str(result.upserted_id))  # New record created
        else:
            response["updated"].append(link.platform)  # Existing record updated

    return {
        "message": "Social media links processed successfully",
        "created_ids": response["created"],
        "updated_platforms": response["updated"],
    }

@router.get("/socialmedia/")
async def get_social_media_links(
    current_user: dict = Depends(get_current_user)
):
    """Retrieve social media links for the authenticated user."""
    # Fetch the user from the database using user_id
    user = await db.users.find_one({"_id": ObjectId(current_user["user_id"])})

    # Ensure the user is verified
    if not user.get("is_verified", False):
        raise HTTPException(status_code=403, detail="User is not verified")

    # Fetch the social media links associated with the user
    social_links = await social_information.find({"user_id": current_user["user_id"]}).to_list(length=100)

    # Convert ObjectId to string for JSON serialization
    formatted_links = [{**link, "_id": str(link["_id"])} for link in social_links]

    # Return the social media links
    return {"social_media_links": formatted_links}



# @router.put("/socialmedia/{link_id}")
# async def update_social_media_link(
#     link_id: str,
#     social_media_info: SocialMedia,
#     current_user: dict = Depends(get_current_user)
# ):
#     """Update a social media link for the authenticated user."""
#     user_id = current_user["user_id"]

#     # Ensure the user exists
#     user = await db.users.find_one({"_id": ObjectId(user_id)})
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")

#     # Ensure the user is verified
#     if not user.get("is_verified", False):
#         raise HTTPException(status_code=403, detail="User is not verified")

#     # Fetch the existing social media link by its _id and user_id
#     social_media_entry = await social_information.find_one(
#         {"_id": ObjectId(link_id), "user_id": user_id}
#     )

#     if not social_media_entry:
#         raise HTTPException(status_code=404, detail="Social media link not found")

#     # Update the fields with the new values from social_media_info
#     update_data = {"$set": {}}
#     if social_media_info.platform:
#         update_data["$set"]["platform"] = social_media_info.platform
#     if social_media_info.url:
#         update_data["$set"]["url"] = social_media_info.url

#     # Perform the update operation
#     result = await social_information.update_one(
#         {"_id": ObjectId(link_id), "user_id": user_id},
#         update_data
#     )

#     if result.modified_count == 0:
#         raise HTTPException(status_code=400, detail="Failed to update social media information")

#     # Fetch the updated social media link
#     updated_entry = await social_information.find_one({"_id": ObjectId(link_id)})
#     updated_entry["_id"] = str(updated_entry["_id"])  # Convert ObjectId to string

#     return {"message": "Social media link updated successfully", "link": updated_entry}


@router.delete("/socialmedia/{link_id}")
async def delete_social_media_link(
    link_id: str, current_user: dict = Depends(get_current_user)
):
    """Delete a social media link for the authenticated user."""
    user_id = current_user["user_id"]

    # Ensure the user exists
    user = await db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Ensure the user is verified
    if not user.get("is_verified", False):
        raise HTTPException(status_code=403, detail="User is not verified")

    # Find and delete the social media link by its _id and user_id
    result = await social_information.delete_one(
        {"_id": ObjectId(link_id), "user_id": user_id}
    )

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Social media link not found")

    return {"message": "Social media link deleted successfully"}
