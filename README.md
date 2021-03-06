# recipepuppy-middleware

> API to act as an intermediary with [Recipe Puppy API](http://www.recipepuppy.com/about/api/.). This service allows access to the recipe api by managing user roles

## Technologies Used

- NodeJS
- TypeScript
- MongoDB
- Docker & Docker Compose

## Prerequisites

These packages are required:

- NodeJS
- npm

> if you want to run the project using containers, install:

- docker
- docker-compose

## Features

- Signup (as consumer or admin)
- Consumer/Admin signin
- Get recipes from Recipe Puppy
- Consumer creation of recipes
- Consumer elimination of recipes: TODO
- Admin list of user recipes: TODO
- Admin elimination of user recipes: TODO

## Settings

### Node version

- This project has be coded using v14.15.1. However, older versions should be work as well.

### Env Variables

Create a .env file in then root. You can copy .env.sample file.
Should follow the following structure:

```
API_PORT=8080
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=password
MONGO_INITDB_DATABASE=admin
MONGO_CONNECTION_HOST=db
MONGO_CONNECTION_PORT=27017
MONGO_CONNECTION_USERNAME=recipepuppy_production
MONGO_CONNECTION_PASSWORD=123456
MONGO_CONNECTION_DATABASE=recipepuppy_production
JWT_SECRET_KEY=741591d1-2n01-4572-afba-a85d47272159
CRYPTO_SECRET_KEY=nPVG6sdmpNWjRTIqCc7rdxs01lwHyfr2
CRYPTO_ALGORITHM=aes-256-ctr
RECIPEPUPPY_API_URL=http://www.recipepuppy.com/api
```

### Manual Deployment

Install required packages

```
npm install
```

Set up and connect to MongoDB server by updating the database environment variables:

```

MONGO_INITDB_ROOT_USERNAME=
MONGO_INITDB_ROOT_PASSWORD=
MONGO_INITDB_DATABASE=
MONGO_CONNECTION_HOST=
MONGO_CONNECTION_PORT=
MONGO_CONNECTION_USERNAME=
MONGO_CONNECTION_PASSWORD=
MONGO_CONNECTION_DATABASE=
```

Run the server:

```
npm start
```

### Container Deployment

> For this method it is necesary that the docker daemon is up

```
npm run docker:start
```

### API Documentantion

Import file `postman-api-doc.json` into postman to see all requests
