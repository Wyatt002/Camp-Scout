# APIs

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

## Account

* Endpoint path: `GET`, `PUT`, `DELETE`, `POST`,
* Endpoint method: `/api/accounts`, `/api/account/<int:pk>`,

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
```json
{
  "first_name": string,
  "last_name": string,
  "email": string,
  "password": string,
  "avatar": url,
  "created": date,
}
    ```

* Response: The Accounts API will create, update, or delete an account for a user on the Camp Scout website. Users will need to enter in all of the information listed to create an account.

* Response shape (JSON):
```json
{
  "first_name": string,
  "last_name": string,
  "email": string,
  "password": string,
  "avatar": string,
  "created": date,
}
```

## Reviews

* Endpoint path: `GET`,`DELETE`, `POST`,
* Endpoint method: `/api/reviews`,`/api/reviews/<int:pk>`,

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
```json
{
  "account_id": int,
  "facility_id": int,
  "first_name": string,
  "last_name": string,
  "review": string,
  "rating": int,
}
```

* Response: The reviews API will be tied to the accounts and users will update.
* Response shape (JSON):
```json
{
  "account_id": int,
  "facility_id": int,
  "first_name": string,
  "last_name": string,
  "review": string,
  "rating": int,
}
```

## Facilities List

* Endpoint path: `GET`,
* Endpoint method: `/api/facilities`,
* Query parameters:
  * state_code: string

* Request shape (JSON):
```json
{
  "state_code": string,
}
```

* Response: Based on query, view of all related faclities will be displayed.
* Response shape (JSON):
```json
{
  "1": {
    "facility_id": string,
    "name": string,
    "description": string,
    "phone_number": string,
    "email_address": string,
    "address": string
  },
  ...
}
```

## Facility Details

* Endpoint path: `GET`,
* Endpoint method: `/api/facility_details`,
* Query parameters:
  * facility_id: string

* Request shape (JSON):
```json
{
  "facility_id": string,
}
```

* Response: Detail view with pertinent campsite information.
* Response shape (JSON):
```json
{
  "facility_id": string,
  "name": string,
  "description": string,
  "images": [...],
  "lat": float,
  "lon": float,
  "amenities": {...},
  "contacts": {
    "phoneNumbers": [...],
    "emailAddresses": [...]
  },
  "operating_hours": [...],
  "addresses": [...],
  "weather_overview": string,
  "campsites": {...},
  "accessibility": {...}
}
```

## Profile

* Endpoint path: `GET`, `PUT`,
* Endpoint method: `/api/profile`, `/api/profile/<int:pk>`,
* Query parameters:
  * q: acccount_id

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
{
  "account_id": int,
}
    ```

* Response: Detal page for account user.
* Response shape (JSON):
    ```json
{
   "account_id": (first, last, email),
   "description": string,
   "goals": string,
   "status": string,
   "pictures": [],
   "wishlist": (...),
   "location": string,
   "avatar": url,
   "banner": url,
}
    ```
