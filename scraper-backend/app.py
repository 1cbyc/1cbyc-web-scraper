import os
from main import app
from asgiref.wsgi import AsgiToWsgi

# This file makes the FastAPI app available for deployment
# The app is imported from main.py and can be served with uvicorn 

# Convert FastAPI app (ASGI) to WSGI for gunicorn compatibility
wsgi_app = AsgiToWsgi(app)

# Export the WSGI app for gunicorn
app = wsgi_app 