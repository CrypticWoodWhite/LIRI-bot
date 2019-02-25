// add all node packages
var Spotify = require("Node-Spotify-API");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
require("dotenv").config();

// search for concerts by an artist
function concert_this(concert) {
    console.log("\nYou searched for this artist's concerts: " + concert + "\n");
    var queryURL = "https://rest.bandsintown.com/artists/" + concert + "/events?app_id=codingbootcamp";
    axios.get(queryURL)
        .then(function(response) {
            for (var i=0; i<response.data.length; i++) {
                console.log(i + ". Venue: " + response.data[i].venue.name);
                console.log("Location: " +  response.data[i].venue.city + ", " + response.data[i].venue.country);
                console.log("Date: " + moment(response.data[i].venue.datetime).format("MM-DD-YYYY") + "\n");
            }
        })
        .catch(function(err) {
            console.log("ERROR: " + err + "\n");
        })
}

// spotify keys
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
// search for information about a song
function spotify_this_song(song) {
    console.log("\nYou searched for this song: " + song + "\n");
    // if no search term is entered, use "the sign"
    if (song === undefined) {
        console.log("\nYou did not give a song so we're using 'The Sign' by Ace of Base\n");
        song = "The Sign";
    }
    spotify.search({type: "track", query: song})
        .then(function(response) {
            for (var j=0; j<response.tracks.items.length; j++) {
                process.stdout.write("Artists: ");
                var artistsArray = []; // there can be more than one artist so create an array
                for (var k=0; k<response.tracks.items[j].artists.length; k++) {
                    artistsArray.push(response.tracks.items[j].artists[k].name);
                }
                var artists = artistsArray.join(", ");
                console.log(artists);
                console.log("Song: " + response.tracks.items[j].name);
                console.log("Link to song preview: " + response.tracks.items[j].preview_url);
                console.log("Album: " + response.tracks.items[j].album.name + "\n");
                }
        })
        .catch(function(err) {
            console.log("\nERROR: " + err + "\n");
        })
}

// search for information about a movie
function movie_this(movie) {
    console.log("\nYou searched for this movie: " + movie + "\n");
    // if no search term is entered, use the movie "mr. nobody"
    if (movie === undefined) {
        console.log("\nYou did not give a movie so we're giving you 'Mr. Nobody'\n");
        movie = "Mr. Nobody";
    }
    var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    axios.get(queryURL)
        .then(function(response) {
            // no for loop because OMDB only returns one movie
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMDB rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes rating: " + response.data.Ratings[1].Value);
            // Three different ratings in the Ratings object, Rotten tomatoes is the second one
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
    fs.readFile("./random.txt", "utf8", function(err, data) {
        if (err) {
            console.log("ERROR: " + err);
        }
        // data in the text file is csv
        var array = data.split(",");
        // assume the first string is the function, and second is the search term
        start(array[0], array[1]);
    })
        // why can I not use this notation?
        // .catch(function(err) {
        //     console.log("\nERROR: " + err + "\n");
        // })
}

// taking in user input to determine which function to run
var functioncalled = process.argv[2];
var searchterm = process.argv[3]; // assume if more than one word, user puts it in quotes

// decide which function was called, and run that function using the provided search term
function start(functioncalled, searchterm) {
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
        do_what_it_says();
    }
    else {
        console.log("\nDid you make a typo? Try again!");
        console.log("These are the functions you can use:");
        console.log("- concert_this");
        console.log("- spotify_this_song");
        console.log("- movie_this");
        console.log("- do_what_it_says (this function has no input)");
        console.log("Remember to put your search term in quotes if it has more than one word!\n")
    }
}

start(functioncalled, searchterm);





