import requests
from fastapi import APIRouter
from dotenv import load_dotenv
import os

load_dotenv()
api_key = os.getenv("OPEN_WEATHER_API_KEY")

router = APIRouter()


@router.get("/api/weather")
async def get_forecast(lat: float, lon: float):
    weather_url = "https://api.openweathermap.org/data/2.5/forecast"
    weather_params = {
        "lat": lat,
        "lon": lon,
        "units": "imperial",
        "appid": api_key,
    }
    response = requests.get(weather_url, params=weather_params)
    if response.status_code == 200:
        weather = {}
        num_day = 0
        content = response.json()
        for day in range(0, 40):
            if day == 0 or day == 8 or day == 16 or day == 24 or day == 32:
                num_day += 1
                info = {
                    "temp": content["list"][day]["main"]["temp"],
                    "temp_min": content["list"][day]["main"]["temp_min"],
                    "temp_max": content["list"][day]["main"]["temp_max"],
                    "feels_like": content["list"][day]["main"]["feels_like"],
                    "humidity": content["list"][day]["main"]["humidity"],
                    "weather": content["list"][day]["weather"][0]["main"],
                    "weather_description": content["list"][day]["weather"][0][
                        "description"
                    ],
                    "weather_icon": content["list"][day]["weather"][0]["icon"],
                    "clouds": content["list"][day]["clouds"]["all"],
                    "wind": content["list"][day]["wind"]["speed"],
                    "visiblity": content["list"][day]["visibility"],
                    "date": content["list"][day]["dt_txt"],
                }
                weather[num_day] = info
        return weather
