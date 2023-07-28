## Journals

6/27/2023
 - Getting docker.yaml file complete and docker up and running with Connor, Brian J, and Brian R.
I bulilt the dockler.yaml and migration tables, we worked together to make updates and bugs before finally deploying.
We had some issues with docker containers but resolved the issue for each member.

6/28
 - Getting our authenticator/authentication working
 - finished our SQL tables
I built most of the authenticator before we had Brian R share his screen as we tried to get our auth working as a group.
We ran into a blocker as we had several errors that we couldn't resolve and by the end of the day we didn'y get our Auth done.

Our tables and getting them to display in pg admin.

6/29
 - Auth works!
Brain J noticed we were missing a router pathe for our Token and was able to get our Auth working!
Connor started messing with pytests.

6/30
 - Calls to OpenWeather API
 - Calls to National Park Service API
Today we worked together as a group of three bc we are missing Brian R today.
Worked with Brain and Connor to connect to our APIs.  We successfully connected to NPS(national parks) and Open Weather APIs.

7/10/2023
 - Signing up on the frontend.
We began adding a sign up on our frontend. when making the account it has the user input their email, first
name, last name, a password and a confirmation of that password to verify it matches with the entered password.
We successfully got our sign up working!

7/11
 - We began wokring on our login on our frontend.
Today was a stump we ran into errors attempting to implament our login page but kept running into an issue involving an 'invalid <!DOCTYPE>' and are unsure what is causing it.

7/12
 - Login on frontend.
Figured out the 'invalid <!DOCTYPE>' issue we were running into and found out it was bc we were forgetting to include the 'baseUrl' in the 'App.js', the rest
of our code was perfectly fine and did it jobs perfectly, allowing us to login with any users that existed within our database.

7/13 and 7/14
 Brian R and I began to work on the main page and nav of our frontend

7/17 and 7/18
- I worked on reformating our signup and login pages along with making the navbar buttons visible depending on login status.
- I also added a eye icon to show and hide our passwords for login and signup
- Began working on Profile Page
- I started CI/CD with everyone we didn't get very far but made changes to our code for when we go back to CI/CD

7/19
- Continued to work on Profile Page

7/20
- Finished work on Profile Page
- Began to make a Edit Profile Page, Realized that making an account does not automatically make a profile for the user so added a redirect on sign up to the profile form which will make a profile for them
- I want to try to use the same form for creating or updating a profile

7/24 7/25
- Linked reviews/facilities to Profile Page
- I updated our Profile Backend and tests to add a First and Last name field.
- couldn't get POST and PUT to work on the same form, ended up making two seprate forms
- Update needs all fields inputted or else it will update empty fields as empty
- We went back to CI/CD and managed to deploy our database but had some issues.

7/26
- Profile is done!
- I Finalizing and made merge request to main for Profile
- Fixed out review table and did some minro code clean up
- We continued to work on CI/CD

7/27
- Ran into some errors with Edit Profile after the merge from main but we fixed it and pushed the final merge for Profile
- Everything is done and ready just minor clean up
