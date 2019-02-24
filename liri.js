// add all node packages
var Spotify = require("Node-Spotify-API");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
require("dotenv").config();

// spotify keys
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

function concert_this(concert) {
    var queryURL = "https://rest.bandsintown.com/artists/" + concert + "/events?app_id=codingbootcamp";
    axios.get(queryURL)
        .then(function(response) {
            for (var i=0; i<response.data.length; i++) {
                console.log("\nYou searched for: " + concert);
                console.log("Venue: " + response.data[i].venue.name);
                console.log("Location: " +  response.data[i].venue.city + ", " + response.data[i].venue.country);
                console.log("Date: " + moment(response.data[i].venue.datetime).format("MM-DD-YYYY") + "\n");
            }
        })
        .catch(function(err) {
            console.log("ERROR: " + err + "\n");
        })
}
    

function spotify_this_song(song) {
    if (song === undefined) {
        console.log("You did not give a song so we're using 'The Sign' by Ace of Base\n");
        song = "The Sign";
    }
    spotify.search({type: "track", query: song})
        .then(function(response) {
            // console.log(response);
            // for (var i=0; i<response.length; i++) {
            // console.log("\nArtists: " + response.artists); need a for loop for artists
                console.log("Song: " + response.data.name);
                console.log("Link to song preview: " + response.data.preview_url);
                console.log("Album: " + response.data.album.name + "\n");
            // }
        })
        .catch(function(err) {
            console.log("\nERROR: " + err + "\n");
        })
}

function movie_this(movie) {
    if (movie === undefined) {
        console.log("You did not give a movie so we're using 'Mr. Nobody'\n");
        movie = "Mr. Nobody";
    }
    var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    axios.get(queryURL)
        .then(function(response) {
            // no for loop because OMDB only returns one movie
            console.log("\nTitle: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMDB rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes rating: " + response.data.Ratings[1].Value);
            console.log("Country where produced: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors + "\n");
        })
        .catch(function(err) {
            console.log("\nERROR: " + err + "\n");
        })
}

function do_what_it_says() {
    fs.readFile("./random.txt", "utf8")
        .then(
            // code here
        )
        .catch(function(err) {
            console.log("\nERROR: " + err + "\n");
        })
}

// taking in user input to determine which function to run
var functioncalled = process.argv[2];
var searchterm = process.argv[3];

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
    console.log("- do_what_it_says (this function has no input)\n");
}




