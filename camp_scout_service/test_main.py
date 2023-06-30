from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from authenticator import authenticator
from fastapi import APIRouter
from routers import accounts
from main import app
from fastapi.testclient import TestClient

client = TestClient(app)


def test_create_account():
    response = client.post(
        "/api/accounts",
        json={
            "password": "watchwatch",
            "email": "watching@aol.com",
            "first_name": "watcher",
            "last_name": "who",
        },
    )
    assert response.status_code == 200
    assert response.json()
