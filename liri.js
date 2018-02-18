require("dotenv").config();

//import keys.js
var keyList = require("./keys.js");

//set variables to access spotify and twitter keys
// var spotify = new Spotify(keys.spotify);

// var client = new Twitter(keys.twitter);

//Take an argument which will be the command given to LIRI
var liriCmd = process.argv[2];


//LIRI Commands
if (liriCmd == "my-tweets"){
	myTweets();
}

	//call the npm request package ***REVIEW NPM docs in gitHub repo, see class notes for link***
	var request = require("request");

//node liri.js my-tweets :: batch last 20 tweets, when each tweet was created, display in bash
function myTweets()
{

	//send request to Twitter API
	request("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=wodewoseyew&count=20", function(error, request, body)
	{
		console.log(response);
		
		//error-checking: if the request is successful
		if (!error && response.statusCode === 200)
		{
			//display the twitter object body
			console.log("Twitter output:" + JSON.parse(body));
		}

		console.log(error);

	});
}

//node liri.js spotify-this-song '<song name here>' :: collect Artist, Song name, preview link from Spotify, 
//Album where the song appears, display all in bash. If the song requested is not available then default to
//"I Saw The Sign" by Ace of Base



//node liri.js movie-this ...will pull in movie data from OMDB



//node do-what-it-says




