from pydantic import BaseModel
from fastapi import File, UploadFile
from queries.pool import pool
from typing import List, Optional
import asyncpg


class PictureOut(BaseModel):
    id: int
    picture_name: str
    picture_data: bytes
    account_id: int


class PictureQueries:
    async def upload(self, account_id: int, picture: UploadFile):
        picture_data = await picture.read()
        picture_name = picture.filename
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    INSERT INTO picture_gallery (
                        picture_name
                        , picture_data
                        , account_id
                    )
                    VALUES (%s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        picture_name,
                        picture_data,
                        account_id,
                    ],
                )
                return True
