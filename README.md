# Welcome to To-Do RESTFUl API

### Welcome to To-Do RESTFUl API! Here you'll find all the documentation you need to get up and running with it.

<br>

## Introduction

To-Do RESTFUl API is an API for managing the server-side work of your To-Do applications. If you have some UI for a To-Do application you can easily use my API for making your application alive and allowing your users to control their notes.If you want to add some feature, edit an existing one, or even fix a bug you found go ahead and make a PR or reach me and I will update it as soon as possible.

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
* #### Express.js: Express is the most common framemork for Node.js.
* #### MongoDB: Mongo is the database used for this project and I used MongoDB Atlas as a Cloud-hosted MongoDB service.
* #### Mongoose: A great ORM for MongoDB as it provides a straightforward, schema-based solution to model application data.
* #### JWT: I used JSONWebToken to control the authentication process of the API requests.
* #### Babel: Babel helps to compile ES6 code to a compatible JavaScript code.
* #### Mocha: JavaScript test framework running on Node.js.
* #### ESLint: A tool for patterns reporting in ECMAScript/JavaScript code and making code more consistent.
* #### Heroku: Platform as a service (PaaS) and there is a live instance of my API master branch deployed and running on it.

<br>

## Authentication

First, the user should signup and then log in with his credentials, a token is returned as a response from the API, this token should be included in the header of all user coming requests as "header["api-jwt"]={token}" to verify authentication with the API.

<br>

## Request

#### Request URL
Request to this API consists of base url and API method. Example: <code>http://{baseURL}/api/v1/{method}</code>.
This API is deployed on Heroku so for consistency I will use Heroku base url in all the examples here so now the base URL: <code>https://to-do-restapi.herokuapp.com/api/v1</code>

<br>

## NOTES Requests

<br>

### GET / notes of some user
Request base URL: <code>https://to-do-restapi.herokuapp.com/api/v1/{userID}/note</code>
<br>
Request example: <code>https://to-do-restapi.herokuapp.com/api/v1/20160313/note</code>
<br>
<br>
The reponse:
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
The return is an array with 2 enrties (notes) added by the user with id 20160313
<br>
<hr>

### GET / certain note with note_id

Request base URL: <code>https://to-do-restapi.herokuapp.com/api/v1/note/:node_id</code>
<br>
Request example: <code>https://to-do-restapi.herokuapp.com/api/v1/note/61ba5f6af2338ae9b7e8baad</code>
<br>
<br>
The reponse:
<br>
<pre>
<code>{
    "_id" : ObjectId("61ba5f6af2338ae9b7e8baad"),
    "userID" : "20160313",
    "text" : "Some Important Test",
    "label" : "IS",
    "created_date" : ISODate("2021-12-15T21:34:34.943Z"),
    "__v" : 0
}</code>
</pre>
The return is a json object of the note with the id "61ba5f6af2338ae9b7e8baad".
