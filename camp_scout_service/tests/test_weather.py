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


def test_no_empty_data():
    response = client.get(
        "/api/weather", params={"lat": 42.357371, "lon": 42.357371}
    )
    data = response.json()
    assert data["1"]
    assert data["2"]
    assert data["3"]
    assert data["4"]
    assert data["5"]
