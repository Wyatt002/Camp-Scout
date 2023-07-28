from main import app
from fastapi.testclient import TestClient

client = TestClient(app)


def test_get_weather():
    response = client.get(
        "/api/weather", params={"lat": 42.357371, "lon": -71.060913}
    )
    assert response.status_code == 200


def test_bad_params():
    response = client.get(
        "/api/weather", params={"lat": "test123", "lon": "testing456"}
    )
    assert response.status_code == 422
