import logging
import requests
from motor.motor_asyncio import AsyncIOMotorClient
from src.utils.config import get_settings
setting=settings=get_settings()
# Configure logging to save logs to a file
LOG_FILENAME = "job_fetching.log"
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[
        logging.FileHandler(LOG_FILENAME, mode='a'),  # Save logs to a file (append mode)
        logging.StreamHandler()  # Also print logs to the console
    ]
)

# API & MongoDB configuration
API_URL = "https://api.scrapingdog.com/linkedinjobs/"
API_KEY = "67ac444b5b5d22d2c1c9ff91"


# Initialize MongoDB client
client = AsyncIOMotorClient(settings.MONGODB_URI)
db = client.mydatabase1  
job_collection = db.jobs  

job_fields = [
  "Pilot", "Renewable Energy Consultant", "Store Manager"
]

def fetch_and_save_jobs(field: str, geoid: int, page: int = 1):
    """
    Fetch jobs for a specific field and save them to MongoDB.
    """
    url = f"{API_URL}?api_key={API_KEY}&field={field}&geoid={geoid}&page={page}"
    logging.info(f"Fetching jobs for: {field}, Page: {page}")

    try:
        response = requests.get(url, timeout=10)  # Added timeout
        response.raise_for_status()
        jobs = response.json()

        if jobs:
            job_collection.insert_many(jobs)
            logging.info(f"Saved {len(jobs)} jobs for {field} (Page {page})")
        else:
            logging.warning(f"No jobs found for {field} (Page {page})")

        return len(jobs)

    except requests.exceptions.RequestException as e:
        logging.error(f"Error fetching jobs for {field}: {e}")
        return 0
    except Exception as e:
        logging.error(f"Unexpected error: {e}")
        return 0

def fetch_jobs_for_multiple_fields(geoid: int, pages: int = 1):
    """
    Fetch jobs for multiple job fields and save them to MongoDB.
    """
    total_jobs_fetched = 0

    for field in job_fields:
        for page in range(1, pages + 1):
            jobs_fetched = fetch_and_save_jobs(field, geoid, page)
            total_jobs_fetched += jobs_fetched
            logging.info(f"Fetched {jobs_fetched} jobs for {field} (Page {page})")

    logging.info(f"Total jobs fetched and saved: {total_jobs_fetched}")

if __name__ == "__main__":
    geoid = 1242764  
    logging.info("Starting job fetching process...")
    fetch_jobs_for_multiple_fields(geoid, pages=3)
    logging.info("Job fetching process completed.")
