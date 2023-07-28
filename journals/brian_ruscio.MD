## Journals

7/27/2023
Today we wrapped up the project. We had Brian do a Liveshare and we focused on cleaning up code structure and checking for errors. Along with doing a test to ensure everything is working after the changes. We plan on trying to finish CI/CD today, if it doesn't break on us.

7/26/2023
Lots of cleaning up code, making minor adjustments to pages. making sure everything works and having everyone merged and up tp date on the main.

7/25/2023
Continued parsing through the facilities details page and moving code around to make the improve the page flow.

7/24/2023
Today was focused on a lot of developing the details page for the facilities as well as cleaning up the Mainpage to make it look near finished. Along with trying to set up CI/CD

7/20/2023
Worked on creating a test for api/reviews
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
Jumped around on different Js files today. Continuing to fix different react and css styles.

7/18/2023
Today we worked on creating a review form so that users can review campsites they have visited.

7/17/2023
Began working on creating creating reviews endpoints under routers in reviews.py. This is established in order for users to 'get' 'post' and 'delete' reviews for facilities they visit.

7/14/2023
Worked on MainPage and Nav bar with Jennifer
7/13/2023
Began Work on MainPage and Nav bar with Jennifer

7/12/2023
Invalid doctype solved and login form was created!

7/11/2023
After the team solved our cors issue with signup, today we began the login form on the front end. Had some minor complications.
Kept getting invalid doctype

7/10/2023
Today was a good step as the team and I developed a way for a user to create an account on the front end with a form. I was the driver today and used my past knowledge on react along with what we have developed in the database, to allow our users to create their own profiles.
Created signup.js, signup.css, tested frontend form

6/30/2023
--- Excused Absence ---

6/29/2023
Today we finished Authentication. I was the driver as we went through the process.

6/28/2023
Today we were working through the process of the authenticator as well as finishing our SQL tables. Jennifer as the driver built most of the authenticator. Ran into some issues at the end of the day with authenticator token and hashed_password.

6/27/2023
Today we worked through establishing a connection to the SQL Database and being able to view some of the Data we created. The team ran into some bugs when setting up docker but they were eventually resolved for each member.
