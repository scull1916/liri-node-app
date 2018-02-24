require("dotenv").config();

//import keys.js
var keyList = require("./keys.js");

//set API requests to individual variables
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");

//set variable to access twitter keys to pass to the API

var client = new Twitter(keyList.twitter);

//set variable to access spotify keys to pass to the API

var spotify = new Spotify(keyList.spotify);



//set a variable to accept a command to be given to LIRI
var liriCmd = process.argv[2];

//set a variable to accept a song or movie title -- set as a separate variable in the event a user does not
//enter a title value, the app will still run.
var title = process.argv[3];




//node liri.js my-tweets :: batch last 20 tweets, when each tweet was created, display in bash
function myTweets()
{

	//send request to Twitter API
	client.get("https://api.twitter.com/1.1/search/tweets.json?count=20&screen_name=wodewoseyew", {q: 'wodewoseyew'}, function(error, tweets, response)
	{

		if(error) throw error;
		{
			//display the twitter object body
			// console.log("Twitter output:" + JSON.stringify(tweets, null, 2));
			console.log([response]);
			

			console.log("Response: " + response);
		}

		console.log(error);

	});
}

function spotifyThisSong()
{
	//send the request to the Spotify API
	spotify.search(
	{
		type: "track",
		query: title,
		limit: 1
	}, function(err, data)

	{
		if (err){

			return console.log("Error: " + err);
		}


		// console.log("Test: " + spotify.album);
		console.log("Spotify output: " + JSON.stringify(data, null, 2));
		
		var musicParser = JSON.parse(data);
		console.log("Spotify output: " + musicParser);

});
}

//request data from OMDB API using the npm Request package
function movieThis()
{
	console.log("movie-this component");

	request("http://www.omdbapi.com/?apikey=" + process.env.apikey + "&t=" + title, function (error, response, body)
	{

		console.log("error: ", error);
		console.log("status code: ", response && response.statusCode);

		var movieParser = JSON.parse(body);

		//ouput data from api object
		console.log("Title: ", movieParser.Title);
		console.log("Year: ", movieParser.Year);
		console.log("IMDB Rating: ", movieParser.imdbRating);
		console.log("Rotten Tomatoes Rating: ", movieParser.Ratings[2]);
		console.log("Country: ", movieParser.Country);
		console.log("Language: ", movieParser.Language);
		console.log("Plot: ", movieParser.Plot);
		console.log("Actors: ", movieParser.Actors);
	});
}

function doWhatItSays()
{
	console.log("I'll do it!");

	//call the random text file containing the instruction(s) for this fx
	fs.open("#", "r", (err,fd)) =>
	{
		if (err) throw err;

		console.log("something here");

		
	}

}

//LIRI Commands

switch (liriCmd)
{
	case "my-tweets":
		myTweets();
		break;

	case "spotify-this-song":
		spotifyThisSong();
		break;

	case "movie-this":
		movieThis();
		break;

	case "do-what-it-says":
		doWhatItSays();
		break;
}



//node liri.js spotify-this-song '<song name here>' :: collect Artist, Song name, preview link from Spotify, 
//Album where the song appears, display all in bash. If the song requested is not available then default to
//"I Saw The Sign" by Ace of Base



//node liri.js movie-this ...will pull in movie data from OMDB
var omdbReq = "http://www.omdbapi.com/?apikey=trilogy&";



//node do-what-it-says




