// add all node packages
var spotifynode = require("Node-Spotify-API");
var axios = require("axios");
var moment = require("moment");
var dotenv =  require("dotenv").config();
var request = require("request");

// spotify keys
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var searchterm = process.argv.slice(2).join("");

function concert-this(error, searchterm) {
    if (error) {
        console.log("ERROR: " + error);
    }
    else {
        var queryURL = "https://rest.bandsintown.com/artists/" + searchterm + "/events?app_id=codingbootcamp";

        $.ajax({
            url: queryURL,
            method: "GET"  
        })
            .then(function(response) {
                var results = response.root;

                for (var i = 0; i<results.length; i++) {
                    var venue = results[i].venue.name;
                    var location = results[i].venue.city + ", " + results[i].venue.country;
                    var date = moment(results[i].venue.datetime, "MM/DD/YYYY");

                    console.log(artist, "\n", venue, "\n", location, "\n", date, "\n\n\n");
                }
            })
    }
}
    

// function spotify-this-song(searchterm) {

// }

// function movie-this(searchterm) {
//     var queryURL = "http://www.omdbapi.com/?apikey=trilogy&" + ;

// }

// function do-what-it-says(searchterm) {

// }

