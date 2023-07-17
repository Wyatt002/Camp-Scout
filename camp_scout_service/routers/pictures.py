import requests
import multipart, asyncpg
from fastapi import APIRouter, Depends, File, UploadFile
from typing import List, Optional
from authenticator import authenticator
from queries.pictures import PictureOut, PictureQueries

router = APIRouter()


@router.post("/api/pictures")
def upload_picture(account_id: int, picture: UploadFile, repo: PictureQueries):
    return repo.upload(account_id, picture)


@router.get("/api/pictures", response_model=List[PictureOut])
def get_pictures():
    pass
