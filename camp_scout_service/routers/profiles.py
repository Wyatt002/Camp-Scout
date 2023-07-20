import requests
from fastapi import APIRouter, Depends
from typing import List, Optional
from authenticator import authenticator
from queries.profiles import (
    ProfileIn,
    ProfileInUpdate,
    ProfileOut,
    ProfileQueries,
)

router = APIRouter()


@router.get("/api/profile", response_model=List[ProfileOut])
def get_all_profiles(
    repo: ProfileQueries = Depends(),
) -> ProfileOut:
    return repo.get_all()


@router.get("/api/profile/{account_id}")
def get_profile(
    account_id: int,
    repo: ProfileQueries = Depends(),
) -> Optional[ProfileOut]:
    return repo.get_one(account_id)


@router.post("/api/profile")
def create_profile(
    profile: ProfileIn,
    repo: ProfileQueries = Depends(),
):
    return repo.create(profile)


@router.put("/api/profile/{account_id}")
def update_profile(
    account_id: int,
    profile: ProfileInUpdate,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ProfileQueries = Depends(),
):
    return repo.update(account_id, profile)
