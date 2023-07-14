## Journals

## June 27, 2023

Today, I worked on:

* Getting docker.yaml file complete and docker up and running with Connor, Jennifer, and Brian R.

Jennifer composed docker.yaml file and migrations file.  We reviewed together and made some
minor updates before deploying.

We all ran into docker issues with GHI and fastAPI containers.  Resolved GHI issue by reinstalling nodes.
Also, had to delete migration file in api/pycache.

## June 29, 2023

Today, I worked on:

* Worked with team to implement authentication.   I noticed the accounts.py did not have the router.get for "token".  I implemented and updated classes.

Once revised I was able to get the authenticator to work!

## June 30, 2023

Today, I worked on:

* Worked with Jennifer and Connor to connect to two third party APIs.  We successfully connected to NPS(national parks) and Open Weather APIs.

## July 11, 2023

Today, I worked on:

* Solved a CORS issue we were having with the sign up page.  We had to update docker.yaml file to not to only have CORS_HOST with one location.  We had both localhost 3000 and 8000 listed.

Still working with team to resolve syntax error we are getting at login page.  Receiving error SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON.

## July 12, 2023

* Finalized weather and national park service APIs.  Connor created merge request and we approved.

## July 13, 2023

*  Brian R. and Jennifer worked on organizing the main page and Nav.js.  Connor and I worked on FastAPI for profile page.
