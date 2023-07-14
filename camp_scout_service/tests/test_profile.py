from main import app
from fastapi.testclient import TestClient
from queries.profiles import ProfileQueries, ProfileOut, ProfileIn
from typing import List, Optional

client = TestClient(app)


class ProfileQueriesMock:
    def get_all(self) -> List[ProfileOut]:
        return [
            ProfileOut(
                id=1,
                description="I like to camp",
                goals="I want to camp more",
                status="I am a camper",
                location="Boston",
                avatar="https://www.google.com",
                banner_url="https://www.google.com",
                account_id=1,
            ),
            ProfileOut(
                id=2,
                description="I like to camp",
                goals="I want to camp more",
                status="I am a camper",
                location="Boston",
                avatar="https://www.google.com",
                banner_url="https://www.google.com",
                account_id=2,
            ),
        ]

    def get_one(self, account_id) -> ProfileOut:
        return ProfileOut(
            id=1,
            description="I like to camp",
            goals="I want to camp more",
            status="I am a camper",
            location="Boston",
            avatar="https://www.google.com",
            banner_url="https://www.google.com",
            account_id=1,
        )


def test_get_all_profile():
    # Arrange
    app.dependency_overrides[ProfileQueries] = ProfileQueriesMock
    # Act
    response = client.get("/api/profile")
    expected = [
        {
            "id": 1,
            "description": "I like to camp",
            "goals": "I want to camp more",
            "status": "I am a camper",
            "location": "Boston",
            "avatar": "https://www.google.com",
            "banner_url": "https://www.google.com",
            "account_id": 1,
        },
        {
            "id": 2,
            "description": "I like to camp",
            "goals": "I want to camp more",
            "status": "I am a camper",
            "location": "Boston",
            "avatar": "https://www.google.com",
            "banner_url": "https://www.google.com",
            "account_id": 2,
        },
    ]
    # Clean up
    app.dependency_overrides = {}
    # Assert
    assert response.status_code == 200
    assert len(response.json()) == 2
    assert response.json() == expected


class CreateProfileQueriesMock:
    def create(self, profile):
        result = {
            "id": 1,
        }

        result.update(profile)
        return result


def test_create_profile():
    # Arrange
    app.dependency_overrides[ProfileQueries] = CreateProfileQueriesMock
    # Act
    json = {
        "description": "I like to camp",
        "goals": "I want to camp more",
        "status": "I am a camper",
        "location": "Boston",
        "avatar": "https://www.google.com",
        "banner_url": "https://www.google.com",
        "account_id": 1,
    }
    expected = {
        "id": 1,
        "description": "I like to camp",
        "goals": "I want to camp more",
        "status": "I am a camper",
        "location": "Boston",
        "avatar": "https://www.google.com",
        "banner_url": "https://www.google.com",
        "account_id": 1,
    }

    # Act
    response = client.post("/api/profile", json=json)

    # Clean up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == expected


def test_get_profile():
    # Arrange
    app.dependency_overrides[ProfileQueries] = ProfileQueriesMock
    json = {"account_id": 1}
    # Act
    response = client.get("/api/profile/{account_id}", json=json)
    expected = {
        "id": 1,
        "description": "I like to camp",
        "goals": "I want to camp more",
        "status": "I am a camper",
        "location": "Boston",
        "avatar": "https://www.google.com",
        "banner_url": "https://www.google.com",
        "account_id": 1,
    }
    # Clean up
    app.dependency_overrides = {}
    # Assert
    assert response.status_code == 200
    assert response.json() == expected
