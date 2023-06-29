from pydantic import BaseModel
from queries.pool import pool
from jwtdown_fastapi.authentication import Token


class Account(BaseModel):
    id: str
    username: str
    fullname: str
    email: str
    hashed_password: str


class AccountIn(BaseModel):
    username: str
    fullname: str
    email: str
    password: str


class AccountOut(AccountIn):
    id: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class AccountQueries:
    def get_one(self, email: str) -> Account:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id
                        , email
                        , password
                        , full_name
                    FROM accounts
                    WHERE email = %s;
                    """,
                    [email],
                )
                record = result.fetchone()
                if record is None:
                    return None
                return Account(
                    id=record[0],
                    email=record[1],
                    hashed_password=record[2],
                    fullname=record[3],
                )
