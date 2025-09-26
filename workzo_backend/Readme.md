# For running locally
python -m venv myenv

myenv/scripts/activate

pip install -r requirements.txt

python main.py

# Search swagger docs
http://localhost:8000/job_api/v1/docs


# For production

docker-compose build
docker-compose up -d

