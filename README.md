# Welcome to To-Do RESTFUl API

### Welcome to To-Do RESTFUl API! Here you'll find all the documentation you need to get up and running with it.

<br>

## Introduction

To-Do RESTFUl API is an API for managing the server-side work of your To-Do applications. If you have a ready UI for a To-Do application you can easily use my API for making your application alive and allowing your users to control their notes. If you want to add some feature, edit an existing one, or even fix a bug you found go ahead and make a PR or reach me and I will update it as soon as possible.

The API provides the following features:
* Creating a new user
* Login with user credentials
* Logout user
* CRUD operations for user notes
  - GET user notes
  - GET certain note
  - POST note
  - PUT note
  - DELETE note

<br>

## Used Tools

* #### Node.js: The whole server is developed using Node.js as a runtime environment.
* #### Express.js: Express is the most common framework for Node.js.
* #### MongoDB: Mongo is the database used for this project and I used MongoDB Atlas as a Cloud-hosted MongoDB service.
* #### Mongoose: A great ORM for MongoDB as it provides a straightforward, schema-based solution to model application data.
* #### JWT: I used JSONWebToken to control the authentication process of the API requests.
* #### Babel: Babel helps to compile ES6 code to a compatible JavaScript code.
* #### Mocha: JavaScript test framework running on Node.js.
* #### ESLint: A tool for patterns reporting in ECMAScript/JavaScript code and making code more consistent.
* #### Heroku: Platform as a service (PaaS) and there is a live instance of my API master branch deployed and running on it.

<br>

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br />
Open [http://localhost:3003](http://localhost:3003) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any debug errors in the console.

### `npm build`

Builds the app for production to the `build` folder.<br />
Your app is ready to be deployed!

### `npm start`

Calls `npm build` first then Runs the app in the production mode.<br />
Open [http://localhost:3010](http://localhost:3010) to view it in the browser.

### `npm test`

Launches the test runner

### `npm run coverage`

Launches the test runner with the Istanbul code coverage tool to get information about how well your tests cover your code.

<br>

## Authentication

First, the user should sign-up and then log in with his credentials, a token is returned as a response from the API, this token should be included in the header of all user coming requests as "header["api-jwt"]={token}" to verify authentication with the API.

<br>

## Request

#### Request URL
Request to this API consists of base url and API method. Example: <code>http://{baseURL}/api/v1/{method}</code>.
<br>
This API is deployed on Heroku so for consistency I will use Heroku base URL in all the examples here so now the base URL: <code>https://to-do-restapi.herokuapp.com/api/v1</code>

<br>

### NOTES Requests

#### GET / get all notes of some user
Request base URL: <code>https://to-do-restapi.herokuapp.com/api/v1/{userID}/note</code>
<br>
Request example: <code>https://to-do-restapi.herokuapp.com/api/v1/20160313/note</code>
<br>
<br>
The response:
<br>
<pre>
<code>[{
    "_id" : ObjectId("61ba5f6af2338ae9b7e8baad"),
    "userID" : "20160313",
    "text" : "Some Important Test",
    "label" : "IS",
    "created_date" : ISODate("2021-12-15T21:34:34.943Z"),
    "__v" : 0
},
{
    "_id" : ObjectId("61ba5f6af2338ae9b7e8baad"),
    "userID" : "20160313",
    "text" : "Some random text",
    "label" : "CS",
    "created_date" : ISODate("2021-12-15T21:34:34.943Z"),
    "__v" : 0
}]</code>
</pre>
The return is an array with 2 entries (notes) added by the user with id 20160313
<br>
<hr>

#### GET / get a certain note with note_id

Request base URL: <code>https://to-do-restapi.herokuapp.com/api/v1/note/{note_id}</code>
<br>
Request example: <code>https://to-do-restapi.herokuapp.com/api/v1/note/61ba5f6af2338ae9b7e8baad</code>
<br>
<br>
<hr>

#### POST / add a new note

Request base URL: <code>https://to-do-restapi.herokuapp.com/api/v1/note</code>
<br>
Request example: <code>https://to-do-restapi.herokuapp.com/api/v1/note</code>
<br>
###### The request body should include all the required values in The <a href="https://github.com/lwx-amr/To-Do-RESTFul-API/blob/master/src/repository/noteModel.js" target="_blank">Note Model</a>.
<hr>

#### PUT / update a certain note

Request base URL: <code>https://to-do-restapi.herokuapp.com/api/v1/note/{note_id}</code>
<br>
Request example: <code>https://to-do-restapi.herokuapp.com/api/v1/note/61ba5f6af2338ae9b7e8baad</code>
<br>
###### The request body should not include all the required values just the modified values
<hr>

#### DELETE / delete a certain note

Request base URL: <code>https://to-do-restapi.herokuapp.com/api/v1/note/{note_id}</code>
<br>
Request example: <code>https://to-do-restapi.herokuapp.com/api/v1/note/61ba5f6af2338ae9b7e8baad</code>
<br>
<br>
<br>

### Authentication Requests


#### POST / add a new user

Request base URL: <code>https://to-do-restapi.herokuapp.com/api/v1/auth/user</code>
<br>
Request example: <code>https://to-do-restapi.herokuapp.com/api/v1/auth/user</code>
<br>
###### The request body should include all the required values in The <a href="https://github.com/lwx-amr/To-Do-RESTFul-API/blob/master/src/repository/userModel.js" target="_blank">User Model</a>.
<hr>

#### POST / login to get user token

Request base URL: <code>https://to-do-restapi.herokuapp.com/api/v1/auth/token</code>
<br>
Request example: <code>https://to-do-restapi.herokuapp.com/api/v1/auth/token</code>
<br>
###### The request body should include user credentials **(email, password)**.
<hr>

#### DELETE / delete a certain user token

Request base URL: <code>https://to-do-restapi.herokuapp.com/api/v1/auth/token</code>
<br>
Request example: <code>https://to-do-restapi.herokuapp.com/api/v1/auth/token</code>
<br>
###### The request header should include user token in ['app-jwt'] attribute.
