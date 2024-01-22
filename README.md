# qbooks

Project is written with node express and typescript. For the database mongodb is used alongside mongoose odm.
In order to run project please isntall dependecies first by running 

npm i

after that you can start db migrations scripts (but make sure first you have mongo and mongod running on its default port (mongodb://127.0.0.1:27017) which will create collections and add default admin user.
You start db migrations script by running following command

npx migrate-mongo up

after db is ready you can run 

npm start

in order to start the project
 
In the package.json you can see the other scripts you could run (including the test script)

In order to get access to login protected routes you need to send request to login endpoint

/login

with following paramaters sent in request body

{"username": "admin", "password": "admin-password"}

As a response you will get token which you should use as a bearer token when sending further request to auth protected routes

In order to create a book you should send POST request to the

/books 

endpoint with body that would look like in this example

{"authorName": "Igor Josic", "bookName": "Very Often Driven Road", "publicationDate": "2012"}

In order to query all the books, send the GET request to the /books endpoint

In order to get specific book send GET request to the following endpoint

books/:bookId


