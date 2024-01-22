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

In order to create Author you need to send POST request to /authors endpoint that looks like following example

{"authorName": "IgorRJosic", "birthDate":"1984"}

In order to fetch All authors you need to send GET request to /authors endpoint


In order to create a book you should send POST request to the

/books 

endpoint with body that would look like in this example

{"authorName": "Igor Josic", "bookName": "Very Often Driven Road", "publicationDate": "2012", "authorId": "123"}

Note, you need to put the ID of the existing author in the authorId field

In order to query all the books, send the GET request to the /books endpoint

In order to get specific book send GET request to the following endpoint

books/:bookId

In order to create new user you need to send POST request to /register route that looks like this

{"username": "IgorJ", "password": "Igorjosic", "role": "Admin"}

If you create new user with 
The user can have either Admin or Author role. If you create new user  of type Author you can provide auhtorId param if you want to connect that new user with one of the existing authors from authors collection

{"username": "IgorJ", "password": "Igorjosic", "role": "Author", "authorId":"123"} 

If you do not provide authorId param, the system will, before creating new User, first create new Author in the authors table, and then it will assign id of that newly created Author to User.author. Again, this is only true if the user role is of type 'Author'

 const newUser = new User({
                username,
                password,
                role: "Author",
                author: author.id,
            });



