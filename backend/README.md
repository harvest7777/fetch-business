# Backend

Django REST API with an orders app.

## Setup

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cd business
python manage.py migrate
python manage.py runserver
```

## API Documentation

Once the server is running, you can view the interactive Swagger API documentation at:

- `http://localhost:8000/api/docs/`
