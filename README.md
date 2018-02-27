# liri-node-app
LIRI Bot is a project I built for Node.js. From the command line call liri.js and pass a command with an optional parameter. 
#### There are four commands:
  1) *my-tweets* which uses the Twitter API to call the 20 most recent tweets from a twitter account,
  2) *spotify-this-song* which uses the Spotify API to pull song details including artist, song title, album, and a preview link. This command will also accept an optional argument of a song title of your choice. 
  3) *movie-this* makes a call to the OMDB API to pull in movie details such as year release, plot summary, and cast. This command will also take an optional argument for your movie of choice
  4) *do-what-it-says* will run *spotify-this-song* with a pre-populated search parameter.
  
  The package.json file contains all the dependencies necessary to run the application. You will need to provide your own API keys to call the Twitter and Spotify APIs.
