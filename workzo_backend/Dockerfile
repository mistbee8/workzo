# Use official Python image as the base image
FROM python:3.11-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file to the working directory
COPY requirements.txt /app/

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

RUN python -m spacy download en_core_web_sm
# Copy the rest of the application code to the container
COPY . /app/

# Expose the port that FastAPI will run on
EXPOSE 8000

# Run the FastAPI app using Uvicorn with the "reload" option for development
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
