import requests
from fastapi import APIRouter, Depends
from typing import List, Optional
from authenticator import authenticator
from queries.reviews import ReviewIn, ReviewOut, ReviewQueries

router = APIRouter()


@router.get("/api/reviews", response_model=List[ReviewOut])
def get_all_reviews(
    repo: ReviewQueries = Depends(),
) -> ReviewOut:
    return repo.get_all()


@router.get("/api/facility_reviews", response_model=List[Optional[ReviewOut]])
def get_facility_reviews(
    facility_id: str,
    repo: ReviewQueries = Depends(),
) -> Optional[ReviewOut]:
    return repo.get_by_facility(facility_id)


@router.get("/api/account_reviews", response_model=List[Optional[ReviewOut]])
def get_account_reviews(
    account_id: int,
    repo: ReviewQueries = Depends(),
) -> Optional[ReviewOut]:
    return repo.get_by_account(account_id)


@router.post("/api/reviews")
def create_review(
    review: ReviewIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ReviewQueries = Depends(),
):
    return repo.create(review)


@router.delete("/api/reviews/{id}", response_model=bool)
def delete_review(
    id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ReviewQueries = Depends(),
) -> bool:
    return repo.delete(id)
