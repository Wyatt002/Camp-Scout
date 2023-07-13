## July 13, 2023
Today we worked on:
* Implementing and merging 'api-facilities' and 'api-weather'
* Started to work on 'api-profile'
* Began working on the main page

To start the day off I went through the proccess of creating a merge request for both
the 'api-facilities' branch and 'api-weather' branch, I passed each request to both
Brians and after each one was approved they were merged to main one after the other.
Before merging them I did go through the imports and other unused code to clean it up
a little bit to look a bit cleaner, once everything was merged we did one more test
through everything for good measure both on fastapi and my unit tests and everything
came back working.

Brian J and I began to work on the 'api-profile' so we could create GET, POST, PUT,
and DELETE endpoints for the profiles, we spent awhile trying to get things working by
starting with the POST and were able to successfully create one, after that we created
two GET endpoints, one for obtaining a profile with a matching 'account_id' and another
that returned a list of all profiles.  Both of these endpoints worked, and by the time
we finished those the end of the day had rolled around.

While we worked on that, Brian R and Jen began to work on the main page of our frontend
and got a placeholder template working, they have big plans for it and will hopefully
have the /api/facilities working with it soon.

## July 12, 2023

Today we worked on:
* Implementing login on the frontend
* Expanded unit tests for 'api-facilities'

Today we worked on figuring out the 'invalid <!DOCTYPE>' issue we were running into and
discovered it was due to forgetting to include the 'baseUrl' in the 'App.js', the rest
of our code was perfectly fine and did it jobs perfectly, allowing us to login with any
users that existed within our database.  Once we were sure everything worked we pushed
it to the development branch and created a merge request to the main, Brian J handled
the request and it was merged with main.  We all pulled from main and made sure
everything still worked as intended and were satisfied with the results.  We also
did light testing on the 'logout' feature and found it was very easy to implement, we
plan to include it into the navbar and have it hidden if a user is not logged in, if a
user is not logged in it will instead show a 'Signup' and 'Login' button.

While they were handling the merge request I revisited some of my tests on the
'api-facilities' and decided to add an extra step of validation by making the
'/api/facilities' endpoint require the input to be a two-letter state code since on the
front-end this is how the search will be done, with the user selecting a state from a
dropdown and the two-letter abbreviation being used in the api query, so just incase by
some strange circumstance a user manages to search something that isn't on the list, the
backend will verify its integrity and if the input is not on the list returns 'None'.

Tomorrow I intend to do a once over on both 'api-facilities' and 'api-weather' to make
sure they are working how I want them to and that the unit tests are functioning as
intended before making a merge request for both of them.  We hope to start on the
main-page tomorrow, and the 'api-facilities' will be needed for that.

## July 11, 2023

Today we worked on:
* Unit tests for 'api-weather' and 'api-facilities'
* Implementing login on the frontend

I started the day finishing up the last of the scrubbing I started before our vacation
and remade branches I made for 'api-weather' and 'api-facilities' to remove prior
commit history with the old api keys I used, while the keys themselves are rotated and
no longer valid I didn't like having that there in the commit and preferred a clean slate.
I went through the process of removing the old branches and creating new ones and
renaming them to the old one's names.

After that I started to fiddle around with unit tests more and managed to figure out how
to create successful tests with our third party api's, creating three successful tests
for 'api-weather' and four for 'api-facilities'.  I plan to try and create tests that
check for failures next and get input from my teammates to see if they have any ideas
for other tests we can implement before we merge both with the main branch.

We spent the afternoon trying to implement our login page but kept running into an issue
involving an 'invalid <!DOCTYPE>', we're unsure what's causing it but we're certain that
the input must be wrong for it be causing an error, we confirmed however that our sign
up page at least works and creates a new account successfully, on a brighter note.

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
