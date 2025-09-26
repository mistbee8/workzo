from fastapi import APIRouter, HTTPException, Depends
from bson import ObjectId
from ...router.auth.models import Personal, NameMedia, personal_information, name_information, db, get_current_user

router = APIRouter()

@router.get("/personal/")
async def get_personal_info(current_user: dict = Depends(get_current_user)):
    """Fetch personal information of the authenticated user."""
    user_id = current_user["user_id"]
    
    # Query the database for the user's personal information
    personal_info = await personal_information.find_one({"user_id": user_id})
    
    # If no personal data is found, return a message with an empty object
    if not personal_info:
        return {"message": "No personal information found", "personal": {}}
    
    # Convert ObjectId to string for JSON serialization
    personal_info["_id"] = str(personal_info["_id"])
    
    return {"message": "Personal information retrieved successfully", "personal": personal_info}

@router.put("/personal/")
async def update_personal_info(
    personal_info: Personal,
    current_user: dict = Depends(get_current_user)
):
    """Update personal information of the authenticated user."""
    user_id = current_user["user_id"]
    
    # Check if personal info exists for the user
    existing_info = await personal_information.find_one({"user_id": user_id})
    
    if not existing_info:
        raise HTTPException(status_code=404, detail="Personal information not found")
    
    # Update the user's personal information
    updated_info = await personal_information.update_one(
        {"user_id": user_id},
        {"$set": personal_info.dict()}  # Update fields with new data
    )
    
    if updated_info.modified_count == 0:
        raise HTTPException(status_code=400, detail="Failed to update information")
    
    return {"message": "Personal information updated successfully"}



# @router.get("/full_name/")
# async def get_full_name(current_user: dict = Depends(get_current_user)):
#     """Fetch the full name (first_name and last_name) of the authenticated user."""
#     user_id = current_user["user_id"]

#     # Query the database for the user's name
#     name_info = await full_name.find_one({"user_id": user_id}, {"_id": 0, "first_name": 1, "last_name": 1})

#     if not name_info:
#         raise HTTPException(status_code=404, detail="Name information not found")

#     return {"first_name": name_info.get("first_name"), "last_name": name_info.get("last_name")}


# @router.put("/full_name/")
# async def update_full_name(
#     myname: MyName,
#     current_user: dict = Depends(get_current_user)
# ):
#     """Update the full name (first_name and last_name) of the authenticated user."""
#     user_id = current_user["user_id"]

#     # Check if name information exists for the user
#     existing_name = await name_collection.find_one({"user_id": user_id})

#     if not existing_name:
#         raise HTTPException(status_code=404, detail="Name information not found")

#     # Update the user's name information
#     update_data = myname.dict(exclude_unset=True)  # Only include fields that are provided
#     updated_name = await name_collection.update_one(
#         {"user_id": user_id},
#         {"$set": update_data}
#     )

#     if updated_name.modified_count == 0:
#         raise HTTPException(status_code=400, detail="Failed to update name information")

#     return {"message": "Name information updated successfully"}

# @router.post("/full-name/")
# async def save_full_name(
#     myname: MyName, current_user: dict = Depends(get_current_user)
# ):
#     """Save full name (first_name and last_name) of the user."""
#     # Fetch the user from the database using user_id
#     user = await db.users.find_one({"_id": ObjectId(current_user["user_id"])})

#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")

#     # Check if the user is verified
#     if not user.get("is_verified", False):
#         raise HTTPException(status_code=403, detail="User is not verified")

#     # Insert full name into MongoDB
#     data = myname.dict()
#     data["user_id"] = current_user["user_id"]  # Associate full name with the user
#     result = await name_collection.insert_one(data)

#     return {
#         "message": "Full name saved successfully",
#         "id": str(result.inserted_id),
#     }

@router.post("/full_name/")
async def save_full_name(name: NameMedia, current_user: dict = Depends(get_current_user)):
    """Save full name (first_name and last_name) to the 'namemedia' collection."""
    
    # Validate current user
    user = await db.users.find_one({"_id": ObjectId(current_user["user_id"])})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if not user.get("is_verified", False):
        raise HTTPException(status_code=403, detail="User is not verified")

    # Check if the user has already saved their full name
    existing_entry = await name_information.find_one({"user_id": current_user["user_id"]})
    if existing_entry:
        # Return a success message if the full name already exists
        return {"message": "Full name already saved for this user", "id": str(existing_entry["_id"])}

    # Prepare data to insert into the collection
    data = name.dict()
    data["user_id"] = current_user["user_id"]  # Associate full name with user

    # Insert the full name into the 'namemedia' collection
    result = await name_information.insert_one(data)

    return {"message": "Full name saved successfully", "id": str(result.inserted_id)}



@router.get("/full_name/")
async def get_full_name(current_user: dict = Depends(get_current_user)):
    """Get full name (first_name and last_name) for the authenticated user."""
    
    # Fetch the full name from the 'namemedia' collection
    name_info = await name_information.find_one({"user_id": current_user["user_id"]})

    if not name_info:
        raise HTTPException(status_code=404, detail="Full name not found")

    # Convert ObjectId to string for JSON serialization
    name_info["_id"] = str(name_info["_id"])

    return name_info

@router.put("/full_name/")
async def update_full_name(name: NameMedia, current_user: dict = Depends(get_current_user)):
    """Update full name (first_name and last_name) for the authenticated user."""
    
    # Check if full name exists for the user
    existing_name = await name_information.find_one({"user_id": current_user["user_id"]})

    if not existing_name:
        raise HTTPException(status_code=404, detail="Full name not found")

    # Prepare data to update
    update_data = name.dict()

    # Update the full name in the 'namemedia' collection
    updated_result = await name_information.update_one(
        {"user_id": current_user["user_id"]},
        {"$set": update_data}
    )

    if updated_result.modified_count == 0:
        raise HTTPException(status_code=400, detail="Failed to update full name")

    return {"message": "Full name updated successfully"}
