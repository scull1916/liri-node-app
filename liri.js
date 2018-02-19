require("dotenv").config();

//import keys.js
var keyList = require("./keys.js");

//set twitter request to a variable
var Twitter = require("twitter");

//set variables to access spotify and twitter keys
// var spotify = new Spotify(keys.spotify);

//
var client = new Twitter(
	{consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token_key: process.env.TWITTER_TOKEN_KEY,
	access_token_secret: process.env.TWITTER_TOKEN_SECRET
	});

//Take an argument which will be the command given to LIRI
var liriCmd = process.argv[2];



	//call the npm request package ***REVIEW NPM docs in gitHub repo, see class notes for link***

//node liri.js my-tweets :: batch last 20 tweets, when each tweet was created, display in bash
function myTweets()
{

	//send request to Twitter API
	client.get("https://api.twitter.com/1.1/search/tweets.json?count=20&screen_name=wodewoseyew", {q: 'wodewoseyew'}, function(error, tweets, response)
	{
		// console.log(tweets.text);
		
		//error-checking: if the request is successful
		// if (!error && tweets.statusCode === 200)
		if(error) throw error;
		{
			//display the twitter object body
			console.log("Twitter output:" + JSON.stringify(tweets, null, 2));
			

			console.log("Response: " + response);
		}

		// console.log(error);

	});
}

//LIRI Commands
if (liriCmd == "my-tweets"){
	myTweets();
}

//node liri.js spotify-this-song '<song name here>' :: collect Artist, Song name, preview link from Spotify, 
//Album where the song appears, display all in bash. If the song requested is not available then default to
//"I Saw The Sign" by Ace of Base



//node liri.js movie-this ...will pull in movie data from OMDB



//node do-what-it-says




