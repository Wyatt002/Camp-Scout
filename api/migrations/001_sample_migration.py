steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE dummy (
            id SERIAL PRIMARY KEY NOT NULL,
            required_limited_text VARCHAR(1000) NOT NULL,
            required_unlimited_text TEXT NOT NULL,
            required_date_time TIMESTAMP NOT NULL,
            automatically_set_date_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            required_integer INTEGER NOT NULL,
            required_money MONEY NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE dummy;
        """
    ],
    [
        """
        CREATE TABLE account (
            id SERIAL PRIMARY KEY NOT NULL,
            first_name VARCHAR(50) NOT NULL,
            last_name VARCAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL,
            password VARCHAR(50) NOT NULL,
            avatar VARCHAR(200) NOT NULL,
            created VARCHAR(50) NOT NULL
        );
        """,
        # drop the table
        """
        DROP TABLE account;
        """
    ]
    [
        # "Up"
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
        # "Down"
        """
        DROP TABLE profile;
        """,
    ],
        [
        # "Up"
        """
        CREATE TABLE review (
            id serial PRIMARY KEY NOT NULL,
            review TEXT NOT NULL,
            rating INTEGER NOT NULL,
            account_id INTEGER REFERENCES account(id) ON DELETE CASCADE,
                UNIQUE (account_id)
        );
        """,
        # "Down"
        """
        DROP TABLE profile;
        """,
    ],


]
