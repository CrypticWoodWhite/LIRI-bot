// add all node packages
var Spotify = require("Node-Spotify-API");
var axios = require("axios"); // request seems to be the preferred package, axios is perfectly fine
var moment = require("moment");
var fs = require("fs");
require("dotenv").config();

// search for concerts by an artist
function concert_this(concert) {
    log("\r\nYou searched for this artist's concerts: " + concert + "\r\n");
    var queryURL = "https://rest.bandsintown.com/artists/" + concert + "/events?app_id=codingbootcamp";
    axios.get(queryURL)
        .then(function(response) {
            for (var i=0; i<response.data.length; i++) {
                log((i+1) + ". Venue: " + response.data[i].venue.name);
                log("Location: " +  response.data[i].venue.city + ", " + response.data[i].venue.country);
                log("Date: " + moment(response.data[i].venue.datetime).format("MM-DD-YYYY") + "\r\n");
            }
        })
        .catch(function(err) {
            log("ERROR: " + err + "\r\n");
        })
}

// spotify keys
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
// search for information about a song
function spotify_this_song(song) {
    // if no search term is entered, use "the sign"
    if (song === undefined) {
        log("\r\nYou did not give a song so we're using 'The Sign'\r\n");
        song = "The Sign";
    }
    else {
        log("\r\nYou searched for this song: " + song + "\r\n");
    }
    spotify.search({type: "track", query: song})
        .then(function(response) {
            for (var j=0; j<response.tracks.items.length; j++) {
                logger((j+1) + ". Artists: ");
                var artistsArray = []; // there can be more than one artist so create an array
                for (var k=0; k<response.tracks.items[j].artists.length; k++) {
                    artistsArray.push(response.tracks.items[j].artists[k].name);
                }
                var artists = artistsArray.join(", ");
                log(artists);
                log("Song: " + response.tracks.items[j].name);
                log("Link to song preview: " + response.tracks.items[j].preview_url);
                log("Album: " + response.tracks.items[j].album.name + "\r\n");
                }
        })
        .catch(function(err) {
            log("\nERROR: " + err + "\r\n");
        })
}

// search for information about a movie
function movie_this(movie) {
    // if no search term is entered, use the movie "mr. nobody"
    if (movie === undefined) {
        log("\r\nYou did not give a movie so we're giving you 'Mr. Nobody'\r\n");
        movie = "Mr. Nobody";
    }
    else {
        log("\r\nYou searched for this movie: " + movie + "\r\n");
    }
    var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    axios.get(queryURL)
        .then(function(response) {
            // no for loop because OMDB only returns one movie
            log("Title: " + response.data.Title);
            log("Year: " + response.data.Year);
            log("IMDB rating: " + response.data.imdbRating);
            log("Rotten Tomatoes rating: " + response.data.Ratings[1].Value); // Three different ratings in the Ratings object, Rotten tomatoes is the second one
            log("Country where produced: " + response.data.Country);
            log("Language: " + response.data.Language);
            log("Plot: " + response.data.Plot);
            log("Actors: " + response.data.Actors + "\r\n");
        })
        .catch(function(err) {
            log("\r\nERROR: " + err + "\r\n");
        })
}

// do what the random.txt file says
function do_what_it_says() {
    fs.readFile("./random.txt", "utf8", function(err, data) {
        if (err) {
            log("ERROR: " + err);
        }
        // data in the text file is csv
        var array = data.split(",");
        // assume the first item is the function, and second is the search term
        // assume there are only two items
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
function start(one, two) {
    if (one === "concert-this") {
        concert_this(two);
    }
    else if (one === "spotify-this-song") {
        spotify_this_song(two);
    }
    else if (one === "movie-this") {
        movie_this(two);
    }
    else if (one === "do-what-it-says") {
        do_what_it_says();
    }
    else {
        console.log("\r\nDid you make a typo? Try again!");
        console.log("These are the functions you can use:");
        console.log("- concert-this");
        console.log("- spotify-this-song");
        console.log("- movie-this");
        console.log("- do-what-it-says (this function has no input)");
        console.log("Remember to put your search term in quotes if it has more than one word!\r\n")
    }
}

// print results to log.txt
function log(output) {
    console.log(output);
    fs.appendFileSync("./log.txt", (output + "\r\n"), function(error) {
        if (error) {
            console.log(error);
            return;
        }
    })
}
function logger(output) {
    process.stdout.write(output);
    fs.appendFileSync("./log.txt", (output + "\r\n"), function(error) {
        if (error) {
            console.log(error);
            return;
        }
    })
}

start(functioncalled, searchterm);





