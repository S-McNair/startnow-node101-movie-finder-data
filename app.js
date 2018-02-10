//import appropriate modules
const express = require('express');
var morgan = require('morgan');
var axios = require('axios');


var cacheitems = {}; //create JSON object for cache memory

const app = express();  //calls express function, assigns to variable


app.use(morgan('dev')); //call morgan middleware logger to log status tokens, req and res for express server


var port = 3000;        //variable to hold the port number
app.listen(port, listening);    //tell express server to listen on Port: "var port" (3000) and call callback function listening
function listening()  {
  console.log('listening on Port ' + port + '.....');   //indicator that the express server is listening and on which port
}


app.get('/', function (req, res) {      //make GET request to the homepage
    var movieId = req.query.i;          //if url query ends in 'i=' assign the string to var movieId
    var MovieTitle = req.query.t;       //if url query ends in 't=' assign the string to var MovieTitle
    

    if (movieId!=undefined) {   //evaluating '/?i=' against itself, if they are equal then... 
        if (movieId == cacheitems.movieId) {     //evaluate movieID vs the movieId currently held by cacheitems, if the are the same...  
            res.status(200).json(cacheitems.data);     //return status code 200 and the json data for the appropriate moveId
            console.log('MovieId sent from cache from id');
        } else {
            axios.get('http://www.omdbapi.com/?i=' + movieId + '&apikey=8730e0e')   //if the movieId is not in cacheitems make axios call to API
                .then(function (response) {         
                    cacheitems = { 'movieId': movieId, 'data': response.data };     //send movieId to cacheitemes as object and build the object
                    res.json(response.data);        //sends JSON response w/ with response.data
                    console.log('goes to cache from id');



                })

                .catch(function error() {       //error handling for if something goes awry
                    console.log(error);
                });
        }
    }
    else {                                                  //if query string == '/?t=' then...
        if (MovieTitle == cacheitems.MovieTitle) {          //if movieTitle is in cacheitems....
            res.status(200).json(cacheitems.data);          //return status code 200 and send JSON response w/ data from cacheitems
            console.log('cache from name');
        }
        else {                                               //if movieTitle is not in cacheitems.....
            console.log('this is the movie title: ' + MovieTitle);      
         
            axios.get(('http://www.omdbapi.com/?t=' + MovieTitle).replace(' ','%20')+ '&apikey=8730e0e') //axios call to the API using '.repalce' to format for url a user entered multi-word title 
                .then(function (response) {
                    cacheitems = { 'MovieTitle': MovieTitle, 'data': response.data };   //send MovieTitle data from API to cacheitems and build the object
                 
                    res.json(response.data);            //send JSON response
                    console.log('sent from axios from MovieTitle');

                }
                );
        }
    }
});


module.exports = app;



// finally export the express application




