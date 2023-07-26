from main import app
from fastapi.testclient import TestClient

client = TestClient(app)


def test_get_facilities():
    response = client.get("/api/facilities", params={"state_code": "NC"})
    assert response.status_code == 200


def test_bad_state_code():
    response = client.get("/api/facilities", params={"state_code": "12"})
    data = response.json()
    assert data is None


def test_no_empty_data_facilities():
    response = client.get("/api/facilities", params={"state_code": "NC"})
    data = response.json()
    assert data is not None


def test_get_facility_details():
    response = client.get("/api/facilities", params={"state_code": "NC"})
    data = response.json()
    response = client.get(
        "/api/facility_details",
        params={
            "park_code": data["1"]["park_code"],
            "facility_id": data["1"]["facility_id"],
        },
    )
    assert response.status_code == 200
    assert data is not None
