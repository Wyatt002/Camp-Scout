from pydantic import BaseModel
from queries.pool import pool
from typing import List, Optional


class ProfileIn(BaseModel):
    description: str
    goals: str
    status: str
    location: str
    avatar: str
    banner_url: str
    account_id: int


class ProfileOut(BaseModel):
    id: int
    description: str
    goals: str
    status: str
    location: str
    avatar: str
    banner_url: str
    account_id: int


class ProfileQueries:
    def get_all(self) -> List[ProfileOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                data = db.execute(
                    """
                    SELECT id, description, goals, status, location, avatar,
                    banner_url, account_id FROM profile ORDER BY id;
                    """,
                )
                data = []
                for record in db:
                    profile = ProfileOut(
                        id=record[0],
                        description=record[1],
                        goals=record[2],
                        status=record[3],
                        location=record[4],
                        avatar=record[5],
                        banner_url=record[6],
                        account_id=record[7],
                    )
                    data.append(profile)
                return data

    def get_one(self, account_id: int) -> Optional[ProfileOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT * FROM profile
                    WHERE account_id = %s;
                    """,
                    [account_id],
                )
                data = result.fetchone()
                if data is None:
                    return None
                profile = ProfileOut(
                    id=data[0],
                    description=data[1],
                    goals=data[2],
                    status=data[3],
                    location=data[4],
                    avatar=data[5],
                    banner_url=data[6],
                    account_id=data[7],
                )
                return profile

    def create(self, profile: ProfileIn):
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO profile (
                        description,
                        goals,
                        status,
                        location,
                        avatar,
                        banner_url,
                        account_id

                    )
                    VALUES (%s, %s, %s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        profile.description,
                        profile.goals,
                        profile.status,
                        profile.location,
                        profile.avatar,
                        profile.banner_url,
                        profile.account_id,
                    ],
                )
                id = result.fetchone()[0]
                data = profile.dict()
                return ProfileOut(id=id, **data)
