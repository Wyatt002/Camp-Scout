## Journals

Please keep all of your individual journals in this directory.

Each team member is required to keep a development journal, which should be a single markdown file with an entry for each day the project was worked on.

Recommended naming convention is `first_last.md`.
### GET LIST OF REVIEWS

Endpoint path /reviews
enpoint method GET
Headers
    Authorization Bearer token

Response    A list of Reviews
Response shape
    JSON
    {
        "reviews" : [
            {
                username: str
                avatar url: str
                text: str
            }
        ]
    }

### CREATE A NEW REVIEW
endpoint path /reviews
enpoint method POST
Headers
    Authorization: Bearer token

Rewuest Body
    JSON
    {
        text: str
    }

Response    success or failure
Response shape
    JSON
    {
        success: boolean
        message: str
    }

### Log in
* Endpoint path: /token
* Endpoint method: POST

* Request shape (form):
  * username: string
  * password: string

* Response: Account information and a token
* Response shape (JSON):
    ```json
    {
      "account": {
        «key»: type»,
      },
      "token": string
    }
    ```

### Log out

* Endpoint path: /token
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: Always true
* Response shape (JSON):
    ```json
    true
    ```
### TESTING THIS STUFF vv
# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client["mydatabase"]
users_collection = db["users"]

@app.post("/users")
async def create_user(user: User):
    user_data = user.dict()
    result = users_collection.insert_one(user_data)
    user_data["_id"] = str(result.inserted_id)
    return user_data
