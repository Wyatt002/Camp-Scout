# Camp Scout

- Jennifer Rojas
- Brian Ruscio
- Connor Gariepy
- Brian Johnson

Camp Scout – explore our national parks' campgrounds.

Camp Scout - choose your next adventure.

## Design

- [API design](docs/apis.md)
- [Data model](docs/data-model.md)
- [GHI](docs/ghi.md)
- [Integrations](docs/integrations.md)

## Intended market

We are targeting general camping enthusiast looking for their next adventure at one of our nations national parks. Campers can research, by state, for their next adventure.

## Functionality

- Visitors to the site can view all of our nations national parks and research campground information
- Users can explore, by state, where they would like to travel
- Home page provides a search feature and list of facilities
- Detail page provides specific data for campground located at selected park
- Weather forecast and contact information is provided
- Accounts
- Authenticated users can provide reviews for campgrounds

## Project Initialization

To fully enjoy this application on your local machine, please make sure to follow these steps:

1. Clone the repository down to your local machine
2. CD into the new project directory
3. Run `docker volume create camp-db`
4. Run `docker compose build`
5. Run `docker compose up`
6. Run `docker exec -it camp-scout-api-1 bash`
7. Run `python manage.py loaddata products.json`
8. Exit the container's CLI, and enjoy Camp Scout to its fullest!
