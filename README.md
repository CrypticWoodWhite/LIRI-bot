# LIRI-bot

### Overview

This app uses a command line interface to search for music and movie information. There are four possible functions:

1. concert-this:
    - ex. node liri.js concert_this eminem
    - Returns information about upcoming concerts for an artist/band

2. spotify-this-song
    - ex. node liri.js spotify_this_song "let it be"
    - Returns information about a song
    - If more than one song matches the search term, all songs are returned

3. movie-this
    - ex. node liri.js movie_this gladiator
    - Returns information about a movie

4. do-what-it-says
    - ex. node liri.js do_what_it_says
    - Returns the results of the commands in the random.txt file
    - The random.txt file contains a function and a search term

The results of each function are piped to a log.txt file.
