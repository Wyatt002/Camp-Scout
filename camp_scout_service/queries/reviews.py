from pydantic import BaseModel
from queries.pool import pool
from typing import List, Optional


class ReviewIn(BaseModel):
    facility_id: str
    park_code: str
    review: str
    rating: int
    first_name: str
    last_name: str
    account_id: int


class ReviewOut(BaseModel):
    id: int
    facility_id: str
    park_code: str
    review: str
    rating: int
    first_name: str
    last_name: str
    account_id: int


class ReviewQueries:
    def reviews_out(self, db):
        data = []
        for record in db:
            review = ReviewOut(
                id=record[0],
                facility_id=record[1],
                park_code=record[2],
                review=record[3],
                rating=record[4],
                first_name=record[5],
                last_name=record[6],
                account_id=record[7],
            )
            data.append(review)
        return data

    def get_all(self) -> List[ReviewOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                data = db.execute(
                    """
                    SELECT id,
                    facility_id,
                    park_code,
                    review,
                    rating,
                    first_name,
                    last_name,
                    account_id
                    FROM review ORDER BY id;
                    """,
                )
                data = self.reviews_out(db)
                return data

    def get_by_facility(self, facility_id: str) -> List[Optional[ReviewOut]]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                data = db.execute(
                    """
                    SELECT id,
                    facility_id,
                    park_code,
                    review,
                    rating,
                    first_name,
                    last_name,
                    account_id
                    FROM review WHERE facility_id = %s ORDER BY id;
                    """,
                    [facility_id],
                )
                data = self.reviews_out(db)
                return data

    def get_by_account(self, account_id: int) -> List[Optional[ReviewOut]]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                data = db.execute(
                    """
                    SELECT id,
                    facility_id,
                    park_code,
                    review,
                    rating,
                    first_name,
                    last_name,
                    account_id
                    FROM review WHERE account_id = %s ORDER BY id;
                    """,
                    [account_id],
                )
                data = self.reviews_out(db)
                return data

    def create(self, review: ReviewIn):
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO review (
                        facility_id,
                        park_code,
                        review,
                        rating,
                        first_name,
                        last_name,
                        account_id

                    )
                    VALUES (%s, %s, %s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        review.facility_id,
                        review.park_code,
                        review.review,
                        review.rating,
                        review.first_name,
                        review.last_name,
                        review.account_id,
                    ],
                )
                id = result.fetchone()[0]
                data = review.dict()
                return ReviewOut(id=id, **data)

    def delete(self, id: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM review
                    WHERE id = %s
                    """,
                    [id],
                )
                return True
