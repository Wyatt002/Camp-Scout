steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE account (
            id SERIAL PRIMARY KEY NOT NULL,
            first_name VARCHAR(50) NOT NULL,
            last_name VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL,
            password VARCHAR(50) NOT NULL,
            avatar VARCHAR(200) NOT NULL,
            created VARCHAR(50) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE account;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE review (
            id serial PRIMARY KEY NOT NULL,
            facility_id VARCHAR(100) NOT NULL,
            review TEXT NOT NULL,
            rating INTEGER NOT NULL,
            account_id INTEGER REFERENCES account(id) ON DELETE CASCADE,
                UNIQUE (account_id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE review;
        """
    ]
]
