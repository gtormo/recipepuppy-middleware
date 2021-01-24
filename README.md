# recipepuppy-middleware

> API to act as an intermediary with [Recipe Puppy API](http://www.recipepuppy.com/about/api/.). This service allows access to the recipe api by managing user roles

## Technologies Used

- NodeJS
- TypeScript
- MongoDB
- Docker & Docker Compose

## Technologies Used

- NodeJS
- TypeScript
- MongoDB
- Docker & Docker Compose

## Features

- Signup (as consumer or admin)
- Consumer/Admin signin
- Consumer creation of recipes
- Consumer elimination of recipes
- Admin creation of user recipes
- Admin elimination of user recipes

## Usage

### Node version

- 14.15.1

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
