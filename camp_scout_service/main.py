from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from authenticator import authenticator
from fastapi import APIRouter
from routers import accounts, facilities, weather, reviews, profiles


app = FastAPI()
app.include_router(authenticator.router)
app.include_router(accounts.router)
app.include_router(weather.router)
app.include_router(facilities.router)
app.include_router(reviews.router)
app.include_router(profiles.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=("http://localhost:3000", "http://localhost:8000"),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00",
        }
    }
