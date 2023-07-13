from main import app
from fastapi.testclient import TestClient

client = TestClient(app)


def test_get_weather_from_facilities():
    response = client.get("/api/facilities", params={"state_code": "NC"})
    assert response.status_code == 200
    data = response.json()
    response = client.get(
        "/api/facility_details",
        params={"facility_id": data["1"]["facility_id"]},
    )
    assert response.status_code == 200
    data = response.json()
    assert data is not None
    response = client.get(
        "/api/weather", params={"lat": data["lat"], "lon": data["lon"]}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["1"] is not None
    assert data["2"] is not None
    assert data["3"] is not None
    assert data["4"] is not None
    assert data["5"] is not None
