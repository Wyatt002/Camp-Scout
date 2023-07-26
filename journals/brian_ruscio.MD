## Journals

Please keep all of your individual journals in this directory.

Each team member is required to keep a development journal, which should be a single markdown file with an entry for each day the project was worked on.

Recommended naming convention is `first_last.md`.

7/24/2023
Today was focused on a lot of developing the details page for the facilities as well as cleaning up the Mainpage to make it look near finished.

7/20/2023
Four backend endpoints referenced by:

'/api/reviews' Returns all of the reviews using a 'GET' request. Along with the ability for a review to be created with a 'POST' request.
'api/account_reviews' This uses a 'GET' request to return a review from a specific account, using the account_id.
'api/facility_reviews'This uses a 'GET' request to return a review from a specific facility, using the facility_id.
'/api/reviews/{id}' This uses 'DELETE' in order to delete a specific review referenced by its id.

I made the following changes:
created a new router and queries file both named 'reviews.py'.
    Holds the endpoints and code for each API call.
Created 'tests/test_reviews.py'
    Unit tests to check for the success and failure in the API

7/19/2023

7/18/2023

7/17/2023

7/14/2023

7/13/2023

7/12/2023

7/11/2023

7/10/2023
Created signup.js, signup.css, tested frontend form


6/29/2023
Today we Began Authentication and completed it. I was the driver as we went through the process.
6/27/2023
Today we worked through establishing a connection to the SQL Database and being able to view some of the Data we created. The team ran into some bugs when setting up docker but they were eventually resolved for each member.

6/10/2023

Today was a good step as the team and I developed a way for a user to create an account on the front end with a form. I was the driver today and used my past knowledge on react along with what we have developed in the database, to allow our users to create their own profiles.
