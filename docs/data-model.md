# Data Models

### Account

- The user account for signing up and logging in a user
- Used to validate if a user has a valid token upon successful login
- Allows access to features such as user profile, reviews

```
TABLE account (
    id SERIAL PRIMARY KEY NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(350) NOT NULL
);
```

### Review

- Reviews made for facilities
- When generated on the frontend the facility_id and park_code are taken from the page's params
- Able to viewed by Reviews with matching facility_id's or account_id's

```
TABLE review (
    id serial PRIMARY KEY NOT NULL,
    facility_id VARCHAR(100) NOT NULL,
    park_code VARCHAR(4) NOT NULL,
    review TEXT NOT NULL,
    rating INTEGER NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    account_id INTEGER REFERENCES account(id) ON DELETE CASCADE
);
```

### Profile

- A user's profile which allows them to display their personalized information
- Can be edited if a user decides to change something, such as their status
- Tied to an account_id, meaning every profile is linked to only one account

```
TABLE profile (
    id serial PRIMARY KEY NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    description VARCHAR(250) NOT NULL,
    goals VARCHAR(200) NOT NULL,
    status VARCHAR(200) NOT NULL,
    location VARCHAR(50) NOT NULL,
    avatar VARCHAR(200) NOT NULL,
    banner_url VARCHAR(200) NOT NULL,
    account_id INTEGER REFERENCES account(id) ON DELETE CASCADE,
        UNIQUE (account_id)
);
```
