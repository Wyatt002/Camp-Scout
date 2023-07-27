from main import app
from pydantic import BaseModel
from fastapi.testclient import TestClient
from queries.reviews import ReviewQueries, ReviewOut
from typing import List, Optional
from authenticator import authenticator

client = TestClient(app)


class ReviewQueriesMock:
    def get_all(self) -> List[ReviewOut]:
        return [
            ReviewOut(
                id=1,
                facility_id="saij3289",
                park_code="bril",
                review="Nice place!",
                rating=4,
                first_name="terry",
                last_name="jones",
                account_id=2,
            )
        ]


def test_get_all_reviews():
    app.dependency_overrides[ReviewQueries] = ReviewQueriesMock
    response = client.get("/api/reviews")
    expected = [
        {
            "id": 1,
            "facility_id": "saij3289",
            "park_code": "bril",
            "review": "Nice place!",
            "rating": 4,
            "first_name": "terry",
            "last_name": "jones",
            "account_id": 2,
        }
    ]

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert len(response.json()) == 1
    assert response.json() == expected


class CreateReviewQueriesMock:
    def create(self, review):
        result = {
            "id": 1,
        }

        result.update(review)
        return result


class FakeAccountLogin(BaseModel):
    email: str
    password: str


def fake_get_current_account_data():
    return FakeAccountLogin(
        email="reviewer@gmail.com",
        password="review",
    )


def test_create_review():
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data

    app.dependency_overrides[ReviewQueries] = CreateReviewQueriesMock

    json = {
        "facility_id": "saij3289",
        "park_code": "bril",
        "review": "Nice place!",
        "rating": 4,
        "first_name": "terry",
        "last_name": "jones",
        "account_id": 2,
    }
    expected = {
        "id": 1,
        "facility_id": "saij3289",
        "park_code": "bril",
        "review": "Nice place!",
        "rating": 4,
        "first_name": "terry",
        "last_name": "jones",
        "account_id": 2,
    }

    response = client.post("/api/reviews", json=json)

    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected


class DeleteReviewQueriesMock:
    def delete(self, id):
        return True


def test_delete_review():
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    app.dependency_overrides[ReviewQueries] = DeleteReviewQueriesMock
    response = client.delete("/api/reviews/1")

    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() is True


class FacilityReviewQueriesmock:
    def get_by_facility(self, facility_id) -> List[Optional[ReviewOut]]:
        return [
            ReviewOut(
                id=1,
                facility_id="saij3289",
                park_code="bril",
                review="Nice place!",
                rating=4,
                first_name="terry",
                last_name="jones",
                account_id=2,
            )
        ]


def test_get_facility_review():
    app.dependency_overrides[ReviewQueries] = FacilityReviewQueriesmock
    expected = [
        {
            "id": 1,
            "facility_id": "saij3289",
            "park_code": "bril",
            "review": "Nice place!",
            "rating": 4,
            "first_name": "terry",
            "last_name": "jones",
            "account_id": 2,
        }
    ]
    response = client.get(
        "/api/facility_reviews", params={"facility_id": "saij3289"}
    )

    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected


class AccountReviewQueriesmock:
    def get_by_account(self, account_id) -> List[Optional[ReviewOut]]:
        return [
            ReviewOut(
                id=1,
                facility_id="saij3289",
                park_code="bril",
                review="Nice place!",
                rating=4,
                first_name="terry",
                last_name="jones",
                account_id=2,
            )
        ]


def test_get_account_review():
    app.dependency_overrides[ReviewQueries] = AccountReviewQueriesmock
    expected = [
        {
            "id": 1,
            "facility_id": "saij3289",
            "park_code": "bril",
            "review": "Nice place!",
            "rating": 4,
            "first_name": "terry",
            "last_name": "jones",
            "account_id": 2,
        }
    ]
    response = client.get("/api/account_reviews", params={"account_id": 2})

    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected
