from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from queries.accounts import AccountQueries
from main import app
from fastapi.testclient import TestClient

client = TestClient(app)


def test_create_account():
    response = client.post(
        "/api/accounts",
        json={
            "password": "testing",
            "email": "test@aol.com",
            "first_name": "tester",
            "last_name": "testing",
        },
    )
    assert response.status_code == 200


def test_get_account():
    response = AccountQueries.get(client, "test@aol.com")
    assert (
        response.email == "test@aol.com"
        and response.first_name == "tester"
        and response.last_name == "testing"
        and response.hashed_password != "testing"
    )
