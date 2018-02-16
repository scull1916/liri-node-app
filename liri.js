require("dotenv").config();

//import keys.js
var keyList = require("./keys.js");

//set variables to access spotify and twitter keys
var spotify = new Spotify(keys.spotify);

var client = new Twitter(keys.twitter);

//Take an argument which will be the command given to LIRI
var liriCmd = process.argv[2];


//LIRI Commands

//node liri.js my-tweets :: batch last 20 tweets, when each tweet was created, display in bash


//node liri.js spotify-this-song '<song name here>' :: collect Artist, Song name, preview link from Spotify, 
//Album where the song appears, display all in bash. If the song requested is not available then default to
//"I Saw The Sign" by Ace of Base




