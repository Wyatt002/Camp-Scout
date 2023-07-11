import requests
from pydantic import BaseModel, Field
from typing import Optional
from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)

from dotenv import load_dotenv
import os
import json


load_dotenv()
api_key = os.getenv("NPS_API_KEY")

router = APIRouter()


@router.get("/api/facilities")
async def get_camp_list(state_code: str):
    nps_url = "https://developer.nps.gov/api/v1/campgrounds"
    nps_params = {
        "stateCode": state_code,
        "api_key": api_key,
    }
    response = requests.get(nps_url, params=nps_params)
    if response.status_code == 200:
        content = response.json()
        camps = {}
        for camp in range(0, len(content["data"])):
            info = {
                "facility_id": content["data"][camp]["id"],
                "name": content["data"][camp]["name"],
                "description": content["data"][camp]["description"],
            }
            if len(content["data"][camp]["contacts"]["phoneNumbers"]) > 0:
                info["phone_number"] = content["data"][camp]["contacts"][
                    "phoneNumbers"
                ][0]["phoneNumber"]
            if len(content["data"][camp]["contacts"]["emailAddresses"]) > 0:
                info["email_address"] = content["data"][camp]["contacts"][
                    "emailAddresses"
                ][0]["emailAddress"]
            if len(content["data"][camp]["addresses"]) > 0:
                info["address"] = content["data"][camp]["addresses"][0][
                    "line1"
                ]
            camps[camp + 1] = info
        return camps


@router.get("/api/facility_details")
async def get_camp_details(facility_id: str):
    nps_url = "https://developer.nps.gov/api/v1/campgrounds"
    nps_params = {
        "q": facility_id,
        "api_key": api_key,
    }
    response = requests.get(nps_url, params=nps_params)
    if response.status_code == 200:
        content = response.json()
        camp = {
            "facility_id": content["data"][0]["id"],
            "name": content["data"][0]["name"],
            "description": content["data"][0]["description"],
            "images": content["data"][0]["images"],
            "lat": content["data"][0]["latitude"],
            "lon": content["data"][0]["longitude"],
            "amenities": content["data"][0]["amenities"],
            "contacts": content["data"][0]["contacts"],
            "operating_hours": content["data"][0]["operatingHours"],
            "addresses": content["data"][0]["addresses"],
            "weather_overview": content["data"][0]["weatherOverview"],
            "campsites": content["data"][0]["campsites"],
            "accessibility": content["data"][0]["accessibility"],
        }
        return camp
