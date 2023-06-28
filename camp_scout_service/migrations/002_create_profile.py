steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE profile (
            id serial PRIMARY KEY NOT NULL,
            description VARCHAR(100) NOT NULL,
            goals VARCHAR(100) NOT NULL,
            status VARCHAR(50) NOT NULL,
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
        """
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
        """
    ]
]
