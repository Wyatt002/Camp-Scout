## Journals

## June 27, 2023

Today, I worked on:

* Getting docker.yaml file complete and docker up and running with Connor, Jennifer, and Brian R.

Jennifer composed docker.yaml file and migrations file.  We reviewed together and made some
minor updates before deploying.

We all ran into docker issues with GHI and fastAPI containers.  Resolved GHI issue by reinstalling nodes.
Also, had to delete migration file in api/pycache.

## June 29, 2023

* Worked with team to implement authentication.   I noticed the accounts.py did not have the router.get for "token".  I implemented and updated classes.

Once revised I was able to get the authenticator to work!

## June 30, 2023

* Worked with Jennifer and Connor to connect to two third party APIs.  We successfully connected to NPS(national parks) and Open Weather APIs.

## July 11, 2023

* Solved a CORS issue we were having with the sign up page.  We had to update docker.yaml file to not to only have CORS_HOST with one location.  We had both localhost 3000 and 8000 listed.

Still working with team to resolve syntax error we are getting at login page.  Receiving error SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON.

## July 12, 2023

* Finalized weather and national park service APIs.  Connor created merge request and we approved.

## July 13, 2023

*  Brian R. and Jennifer worked on organizing the main page and Nav.js.  Connor and I worked on FastAPI for profile page.

## July 18, 2023

* Worked on creating review form.  Worked with Brian R. and Connor.  Jennifer still finalizing the profile page.  We encountered issue with communicating to the backend. Realized we need to add the router and query to new branch.  By the end of the day we were able to post reviews to the database.

## July 19, 2023

* Finalized the review form.  Connor discovered some code from example provided to us in learn from "authentication-playground" that allowed us to pull account_id from token.  This was the last piece we needed to link the review with user.

Conner created merge request for API Profile and Brian created merge request for API Reviews.

We started working on component for details page.

## July 20, 2023

* Worked with Connor to finalize the facility details page.  We were able to get all details to display.

Brian worked on main page and Jennifer finalizing the profile page.

## July 24, 2023

* Worked with Connor to add features to facility detail page. We added the ability to choose stars when a review is created and display the associated review on facility page with stars.

Altered the layout of 5 day weather forecast to post along side each other in a row.  We implemented the getDay method to display the day of the week.

Brian R worked on details for Main page and Jennifer continued her work to integrate the Profile page to show associated reviews.

## July 25, 2023

Connor discovered issue when pulling description detail for Facility Detail page.  He fixed by adding the park_code in addition to facility_id for API call. this resolved the error.  He did a final push.  I created a merge request to main.

Brian created a merge request for Main page.  Jennifer continued to work on Profile page.

## July 26, 2023

Brian R worked on updating the Main page display.

Jennifer was finalizing the Profile page and creating a merge request.

Connor and I worked on CI/CD. We encountered issue with the way documentation wanted us to add the commands.  Instead of a "\" behind each line, we had to put all the code in one long line.  This allowed us the get the URL address needed to deploy our database. We encountered a 502 and 503 error.  Dalonte is working on a solution for us.
