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
    def get_picture(self, id: int) -> Optional[PictureOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id, picture_name, picture_data, account_id
                    FROM picture_gallery
                    WHERE id = %s;
                    """,
                    [id],
                )
                record = db.fetchone()
                if record is None:
                    return None
                return PictureOut(
                    id=record[0],
                    picture_name=record[1],
                    picture_data=record[2],
                    account_id=record[3],
                )

    def upload(self, account_id: int, picture: UploadFile):
        picture_data = picture.file.read()
        picture_name = picture.filename
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
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
                id = result.fetchone()[0]
                return {
                    "filename": picture_name,
                    "id": id,
                    "account_id": account_id,
                }
