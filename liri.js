require("dotenv").config();

//import keys.js
var keyList = require("./keys.js");

//set twitter request to a variable
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");

//set variables to access spotify and twitter keys

var client = new Twitter(keyList.twitter);
// ,
// 	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
// 	access_token_key: process.env.TWITTER_TOKEN_KEY,
// 	access_token_secret: process.env.TWITTER_TOKEN_SECRET
// 	});

var spotify = new Spotify(keyList.spotify);
	// {
	// 	id: process.env.SPOTIFY_ID,
	// 	secret: process.env.SPOTIFY_SECRET

	// });

//set a variable to accept a command to be given to LIRI
var liriCmd = process.argv[2];

//set a variable to accept a song or movie title
var title = process.argv[3];


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

		console.log("Test: " + spotify.album);
		console.log("Spotify output: " + JSON.stringify(data, null, 2));
});
}

//request data from OMDB API using the npm Request package
function movieThis()
{
	console.log("movie-this component");
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
}

// if (liriCmd == "my-tweets"){
// 	myTweets();
// }
// if (liriCmd == "spotify-this-song")
// {
// 	spotifyThisSong();
// }

//node liri.js spotify-this-song '<song name here>' :: collect Artist, Song name, preview link from Spotify, 
//Album where the song appears, display all in bash. If the song requested is not available then default to
//"I Saw The Sign" by Ace of Base



//node liri.js movie-this ...will pull in movie data from OMDB



//node do-what-it-says




