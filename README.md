# mmg-technical-test
Project for the technical test at MMG.

## Architecture
This project uses [Express framework](https://expressjs.com/) to expose a REST API for the manadgement of different users and coffe shops. 
All the users and shops data are stored and retrieved from a [MongoDB database](https://www.mongodb.com/) and, as the testing framework, [Jest](https://jestjs.io/) is being used (minimum tests).

## API Documentation
All the API endpoints require Basic Authentication, so you will nedd to use an already registered user to successfully request them (that's the reason you have to create your first user when seting up this code on your custom environment).

The API exposes the following methods:
#### POST /users
This endpoint creates an user. Request body should have the following JSON properties
```javascript
{ "name": "userName", // String, unique, required
"password": "myPass", // String, required
"role": 1 // Optional. 1 for admin, 0 for client. By default, it creates client users
}
```

#### POST /shops
This endpoint creates a shop. Request body should have the following JSON properties
```javascript
{ "name": "shopName", // String, required
"location": "my street, 1", // String, required
"nonCommentable": true // Optional. Default value is false
}
```

#### GET /shops
Returns all shops

#### GET /shops/:shopid
Returns the given :shopid shop. This is can be taken from the _id field of the GET /shops request

#### PUT /shops/:shopid/comment
This endpoint inserts a new comment on the given shop (if the shop is commentable, or the user has the right permissions to do it on a non-commentable shop). The body should have the comment property
```javascript
{ "comment": "This shop is cheap!" // String, required
}
```

## Try it out!!
This project has been deployed in [Heroku](https://www.heroku.com/) using a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) as the underlying database and you can test this instance by using the provided [Postman Collection](MMG-TEST.postman_collection.json).

Note that 2 users are already created: admin/admin and client/client (name/password, respectively). Also, there's already 2 shops created to test the different behaviors, one as *non-commentable*, and the other as *commentable*

## Deploy and Set Up
If you wish to configure this project in your development environment follow these steps: 
1. Clone the repo
2. Create a new MongoDB Database
3. Create a collection 'users' in the database
4. Populate your first users (check the user format above)
5. Set the environment variable 'DB_CONNECTION' with the MongoDB connection String
6. Run the code by the command *npm start*
