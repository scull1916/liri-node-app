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
	client.get("https://api.twitter.com/1.1/search/tweets.json?count=40&screen_name=wodewoseyew", {q: 'wodewoseyew'}, function(error, tweets, response)
	{

		if(error) throw error;
		{
			var empty = "";
			//display the twitter object body
			var twitOut = JSON.stringify(tweets,null,2);

			console.log(JSON.parse(twitOut));



			for (i=0; i<20; i++)
			{
			// console.log(Object.getOwnPropertyNames(JSON.parse(twitOut).statuses[0]));
				console.log("increment: ", i);

				
				console.log("*********************************************************");
				console.log("Tweet: \n", JSON.parse(twitOut).statuses[i]["text"] + "\n");
				console.log("Created: \n", JSON.parse(twitOut).statuses[i]["created_at"]);
				
				
			
			}

		}

		// console.log(error);

	});
}

function spotifyThisSong()
{
	if (title == null)
	{
			//send the request to the Spotify API
			spotify.search(
			{
				type: "track",
				query: "The Sign" && "Ace of Base",
				limit: 1
			}, function(err, data)
			{

			
					if (err)
				{

					return console.log("Error: " + err);
				}

					console.log(data);
				
					console.log("Tracks: \n", data["tracks"]["items"]);
			});
	}
	
	else
	{
		//send the request to the Spotify API
		spotify.search(
		{
			type: "track",
			query: title,
			limit: 1
		}, function(err, data)
			{

			
					if (err)
				{

					return console.log("Error: " + err);
				}

					console.log(data);
				
					console.log("Tracks: \n", data["tracks"]["items"]);
				
			});
			


		
	}
}
	

//request data from OMDB API using the npm Request package
function movieThis()
{
	//If the user does not enter a movie title, the utility will default to a search for the movie Mr. Nobody"
	if (title == null)
	{
		request("http://www.omdbapi.com/?apikey=" + process.env.apikey + "&t=Mr. Nobody", function (error, response, body)
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


	//*********************************************
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
	fs.open("random.txt", "r", (err,fd) =>
	{
		if (err) throw err;

		console.log(err);

		console.log("fd: ", fd);

		fs.fstat(fd, (err, stat) =>
		{
			if (err) throw (err);
			console.log("fstat err: ", err);

			console.log("stat: ", JSON.stringify(stat, null, 2));

			fs.close(fd, (err) =>
			{
				console.log("close err: ", err);
			});

		});

	});

	//use fs.readFile to read the contents of the random.txt file - to run node liri?
	fs.readFile("random.txt", "utf-8", (err, data) =>
	{
		if (err) throw err;
		console.log("err: ", err);

		console.log("file contents? ", data);

		console.log("node liri.js", data, "\r");



	});
		// spotifyThisSong();

}

//LIRI Commands

switch (liriCmd)
{
	case "do-what-it-says":
		doWhatItSays();
		break;

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



//node liri.js spotify-this-song '<song name here>' :: collect Artist, Song name, preview link from Spotify, 
//Album where the song appears, display all in bash. If the song requested is not available then default to
//"I Saw The Sign" by Ace of Base



//node liri.js movie-this ...will pull in movie data from OMDB
var omdbReq = "http://www.omdbapi.com/?apikey=trilogy&";



//node do-what-it-says




