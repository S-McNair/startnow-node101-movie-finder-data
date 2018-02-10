# Movie Data Finder

Using the OMDB API create a cache server using express so that:

Server should log each request using morgan's dev format.
Server should indicate when it is listening, and on which port.
Server should respond to GET requests to /?i=tt3896198 with movie data.
Server should respond to GET requests to /?i=tt3896198 with movie data without fetching from the OMDb api.
Server should also respond to GET requests to /?t=baby%20driver with movie data.
Server should also respond to GET requests to /?t=baby%20driver with movie data without fetching from the OMDb api.