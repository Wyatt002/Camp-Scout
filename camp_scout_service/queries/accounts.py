from pydantic import BaseModel
from queries.pool import pool
from jwtdown_fastapi.authentication import Token


<<<<<<< HEAD
=======
class DuplicateAccountError(ValueError):
    pass


>>>>>>> main
class Account(BaseModel):
    id: int
    email: str
    hashed_password: str
    first_name: str
    last_name: str



class AccountIn(BaseModel):
    password: str
    email: str
    first_name: str
    last_name: str


<<<<<<< HEAD
class AccountOut(AccountIn):
=======
class AccountOut(BaseModel):
>>>>>>> main
    id: str
    email: str
    first_name: str
    last_name: str



class AccountOutWithPassword(AccountOut):
    hashed_password: str


class AccountQueries:
<<<<<<< HEAD
    def get_one(self, email: str) -> Account:
=======
    def get(self, username: str) -> AccountOutWithPassword:
>>>>>>> main
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id
                        , email
                        , password
<<<<<<< HEAD
                        , full_name
                    FROM accounts
                    WHERE email = %s;
                    """,
                    [email],
=======
                        , first_name
                        , last_name
                    FROM account
                    WHERE email = %s;
                    """,
                    (username,),
>>>>>>> main
                )
                record = result.fetchone()
                if record is None:
                    return None
                return AccountOutWithPassword(
                    id=record[0],
                    email=record[1],
                    hashed_password=record[2],
                    first_name=record[3],
                    last_name=record[4],
                )

    def create(self, account: AccountIn, hashed_password: str) -> Account:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO account (
                        email
                        , password
                        , first_name
                        , last_name
                    )
                    VALUES (%s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        account.email,
                        hashed_password,
                        account.first_name,
                        account.last_name,
                    ],
                )
                id = result.fetchone()[0]
                return Account(
                    id=id,
                    email=account.email,
                    hashed_password=hashed_password,
                    first_name=account.first_name,
                    last_name=account.last_name,
                )
