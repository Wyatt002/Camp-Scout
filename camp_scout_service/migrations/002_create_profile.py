steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE profile (
            id serial PRIMARY KEY NOT NULL,
            first_name VARCHAR(50) NOT NULL,
            last_name VARCHAR(50) NOT NULL,
            description VARCHAR(250) NOT NULL,
            goals VARCHAR(200) NOT NULL,
            status VARCHAR(200) NOT NULL,
            location VARCHAR(50) NOT NULL,
            avatar VARCHAR NOT NULL,
            banner_url VARCHAR(200) NOT NULL,
            account_id INTEGER REFERENCES account(id) ON DELETE CASCADE,
                UNIQUE (account_id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE profile;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE picture_gallery (
        picture_data BYTEA,
        account_id INTEGER REFERENCES account(id) ON DELETE CASCADE,
            UNIQUE (account_id)
        )
        """,
        # "Down" SQL statement
        """
        DROP TABLE picture_gallery;
        """,
    ],
]
