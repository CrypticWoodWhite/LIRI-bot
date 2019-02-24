// add all node packages
var Spotify = require("Node-Spotify-API");
var axios = require("axios");
var moment = require("moment");
require("dotenv").config();

// spotify keys
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

// taking in user input
var functioncalled = process.argv[2];
var searchterm = process.argv.slice(3).join("");

// instructions

function concert_this(searchterm) {
    var queryURL = "https://rest.bandsintown.com/artists/" + searchterm + "/events?app_id=codingbootcamp";
    // console.log(searchterm);
    // console.log(queryURL);

    axios.get(queryURL)
        .then(function(response) {
            // console.log(response);
            // for loop is not working....
            for (var i=0; i<response.length; i++) {
                var venue = response[i].venue.name;
                var location = response[i].venue.city + ", " + response[i].venue.country;
                var date = moment(response[i].venue.datetime, "MM/DD/YYYY");
                console.log("You searched for: " + searchterm + "\n"+ venue + "\n" + location + "\n" + date + "\n\n");
            }
        })
        .catch(function(err) {
            console.log("ERROR: " + err);
        })
}

if (functioncalled === "concert_this") {
    concert_this(searchterm);
}
else if (functioncalled === "spotify_this_song") {
    spotify_this_song(searchterm);
}
else if (functioncalled === "movie_this") {
    movie_this(searchterm);
}
else if (functioncalled === "do_what_it_says") {
    do_what_it_says(searchterm);
}
else {
    console.log("\nDid you make a typo? Try again!");
    console.log("These are the functions you can use:");
    console.log("- concert_this");
    console.log("- spotify_this_song");
    console.log("- movie_this");
    console.log("- do_what_it_says\n");
}
    

function spotify_this_song(searchterm) {
    if (searchterm.length === 0) {
        console.log("You did not give a song so we're using 'The Sign' by Ace of Base\n");
        searchterm = "The Sign";
    }
    spotify.search({type: "track", query: searchterm})
        .then(function(response) {
            console.log(response);
        })
        .catch(function(err) {
            console.log("ERROR: " + err);
        })
}

// function movie_this(searchterm) {

    // var queryURL = "http://www.omdbapi.com/?apikey=trilogy&" + stufffffff ;

// }

// function do_what_it_says(searchterm) {

// }




