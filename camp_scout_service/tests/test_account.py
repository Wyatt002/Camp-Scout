from main import app
from fastapi.testclient import TestClient


client = TestClient(app)

class FakeAccout(BaseModel):
    email:str
    password: str


def get_account():
    return FakeAccout(
        email="email@email.com",
        password="pass",
    )



def test_get_token():
    response = client.get("/api/token")
    if response.status_code == 200:
        assert "access_token" in response.json()
        assert response.json()["access_token"] == "string"
        assert "token_type" in response.json()
        assert response.json()["token_type"] == "Bearer"
        assert "account" in response.json()
        assert "id" in response.json()["account"]
        assert response.json()["account"]["id"] == "1"
        assert "password" in response.json()["account"]
        assert response.json()["account"]["password"] == "password"
        assert "email" in response.json()["account"]
        assert response.json()["account"]["email"] == "user@example.com"
        assert "first" in response.json()["account"]
        assert response.json()["account"]["first"] == "first"
        assert "last" in response.json()["account"]
        assert response.json()["account"]["last"] == "last"
