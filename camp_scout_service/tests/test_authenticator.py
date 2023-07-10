from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
import authenticator
from fastapi import APIRouter
from routers import accounts
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
