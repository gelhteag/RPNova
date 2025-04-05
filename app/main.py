from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router as api_router

# Create the FastAPI instance
app = FastAPI(title="RPN Calculator API")


# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow frontend origin specifically if deployed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include our API routes
app.include_router(api_router)

# Optionally, you could start the IMAP listener as a background task here or use a scheduler.
