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
