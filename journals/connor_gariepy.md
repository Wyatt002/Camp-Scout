## July 10, 2023

Today we worked on:
* Our unit tests for the Authenticator
* Signing up on the frontend

Today we worked on getting our sign up page on the frontend working to allow a user
to create an account, when making the account it has the user input their email, first
name, last name, a password and a confirmation of that password to verify it matches
with the entered password, if it does it will make a call to our api and create a new
account.

While we worked on this I fiddled around with the unit tests for our Authenticator and
managed to get another one working, learning as I go.

## June 30, 2023

Today we worked on:
* Our calls to the OpenWeather API
* Our calls to the National Park Service API

Today we worked together as a group of three since we were missing Brian R today, I
shared my screen as we put together our fastapi calls for getting our 7-day forecast
of the weather based on the input of a given latitude and longitude.  We were able to
get this working, however we discovered we would have to dial the forecast back from
7 days to 4 days due to a premium subscription being required to call anything more
than 4 days.

We also worked on our NPS API calls, making much faster progress on it after we had
gotten our weather API to work as intended, we made two separate routes for it:
One that obtained a list of campgrounds based on a given state code, returning
minimal details and most importantly an ID to reference the campground.
And another one that was the specific campground details, using that ID we obtained
from the campground list to get that specific campground's details, going in depth
in the details we obtained from it.

## June 29, 2023

Today we finished our work on:
* Getting our authenticator/authentication working

Today we worked together again as a group with Brian R sharing his screen as we tried
to get our authenticator to work.  After a few more hours of fiddling and sharing my
own screen Brian J cracked the code and got it working!  We pushed it our developer
branch for the authenticator and made sure it worked on each of our ends until we
were happy with it.

I started on the pytest for it and managed to get a successful return from it, both
to confirm a status code 200 and to confirm a json response.

## June 28, 2023

Today we began to work on:

* Finalized our SQL tables
* Getting our authenticator/authentication working

Today we worked together as a group with Brian R sharing his screen as we tried to
get our authenticator to worked.  We played around with it for awhile and managed
to work out several errors that were inhibiting our progress but we weren't able
to get it working by the end of the day.

We did however finalize and test our data tables, happy with the columsn we created
for it we were able to successfully use 'SELECT' and 'INSERT INTO' to both view and
populate them.

## June 27, 2023

Today, I worked on:

* Getting our branches merged to have the same docker-compose.yaml and migrations

Today we worked as a group making sure everyone's containers were properly running
after a little struggle of having to 'npm install' our package.json again, and
that our campscout_db was working properly.  We tested to make sure that we could
both 'SELECT' and 'INSERT INTO' our tables and we were able to successfully
populate them and view their contents.
