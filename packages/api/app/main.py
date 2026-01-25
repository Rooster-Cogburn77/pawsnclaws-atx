"""
PawsNClaws ATX - API Entry Point

A 501(c)(3) nonprofit platform helping Austin's animals.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="PawsNClaws ATX API",
    description="Nonprofit platform for helping Austin's animals",
    version="0.1.0",
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # TODO: Configure for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """Health check endpoint."""
    return {"status": "healthy", "mission": "Helping Austin's animals"}


@app.get("/impact")
async def get_impact():
    """Public impact statistics."""
    # TODO: Implement actual stats from database
    return {
        "animals_helped": 0,
        "active_volunteers": 0,
        "monthly_donors": 0,
        "colonies_managed": 0,
    }
