from pydantic import BaseModel
from queries.pool import pool
from typing import List, Optional


class ProfileIn(BaseModel):
    first_name: str
    last_name: str
    description: str
    goals: str
    status: str
    location: str
    avatar: str
    banner_url: str
    account_id: int


class ProfileInUpdate(BaseModel):
    description: str
    goals: str
    status: str
    location: str
    avatar: str
    banner_url: str


class ProfileOut(BaseModel):
    id: int
    first_name: str
    last_name: str
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
                    SELECT id, first_name, last_name, description, goals, status, location, avatar,
                    banner_url, account_id FROM profile ORDER BY id;
                    """,
                )
                data = []
                for record in db:
                    profile = ProfileOut(
                        id=record[0],
                        first_name=record[1],
                        last_name=record[2],
                        description=record[3],
                        goals=record[4],
                        status=record[5],
                        location=record[6],
                        avatar=record[7],
                        banner_url=record[8],
                        account_id=record[9],
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
                    first_name=data[1],
                    last_name=data[2],
                    description=data[3],
                    goals=data[4],
                    status=data[5],
                    location=data[6],
                    avatar=data[7],
                    banner_url=data[8],
                    account_id=data[9],
                )
                return profile

    def create(self, profile: ProfileIn):
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO profile (
                        first_name,
                        last_name,
                        description,
                        goals,
                        status,
                        location,
                        avatar,
                        banner_url,
                        account_id
                    )
                    VALUES (%s, %s,%s, %s, %s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        profile.first_name,
                        profile.last_name,
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

    def update(self, account_id: int, profile: ProfileInUpdate) -> ProfileOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                        UPDATE profile
                        SET description = %s
                        , goals = %s
                        , status = %s
                        , location  = %s
                        , avatar = %s
                        , banner_url = %s
                        WHERE account_id = %s
                        RETURNING id;
                    """,
                    [

                        profile.description,
                        profile.goals,
                        profile.status,
                        profile.location,
                        profile.avatar,
                        profile.banner_url,
                        account_id,
                    ],
                )
                conn.commit()
                return self.get_one(account_id)
