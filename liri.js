require("dotenv").config();
var axios = require("axios");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var moment = require("moment");

var keys = require("./keys");
var spotify = new Spotify(keys.spotify);
var choice = process.argv[2];
var userInput = process.argv.slice(3).join(" ");
writeToFile(choice + " " + userInput + "\n");

function liri(input) {
  switch (input) {
    case "concert-this":
      findConcert();
      break;
    case "spotify-this-song":
      findSong();
      break;
    case "movie-this":
      findMovie();
      break;
    case "do-what-it-says":
      readMe("random.txt");
      break;
    default:
      console.log("Not a valid command");
  }
}

function findSong() {
  //artist, song's name, a preview link of the song on Spotify, the album the song is from
  if (userInput === "") {
    userInput = "I Want It That Way";
  }
  spotify.search({ type: "track", query: userInput }, function (err, data) {
    if (err) {
      console.log("Error occured: " + err);
      return;
    }
    var artist = data.tracks.items[0].album.artists[0].name;
    var website = data.tracks.items[0].album.external_urls.spotify;
    var album = data.tracks.items[0].album.name;
    var songFile =
      "Artist: " +
      artist +
      "\nSong name: " +
      userInput +
      "\nLink to the song on Spotify: " +
      website +
      "\nAlbum name: " +
      album;
    songFile +=
      "\n*-------------------------Spotify Information Over--------------------------------------*\n";
    console.log(songFile);
    writeToFile(songFile);
  });
}

function findMovie() {
  if (userInput === "") {
    userInput = "Mr. Nobody";
  }
  axios
    .get("http://www.omdbapi.com/?t=" + userInput + "&apikey=trilogy")
    .then(function (response) {
      // console.log(response.data); getting data parameters to fill in
      var title = response.data.Title;
      var year = response.data.Year;
      var rating = response.data.Rated;
      var score = response.data.Ratings[1].Value;
      var produced = response.data.Country;
      var language = response.data.Language;
      var plot = response.data.Plot;
      var actors = response.data.Actors;
      var movieInfo =
        "The movie's name is: " +
        title +
        "\nMovie release year: " +
        year +
        "\nMovie is rated: " +
        rating +
        "\nRotten Tomatoes Score: " +
        score +
        "\nCountry where it was produced: " +
        produced +
        "\nAvailable languages: " +
        language +
        "\nPlot of the movie: " +
        plot +
        "\nActors in the movie: " +
        actors;
      movieInfo +=
        "\n*--------------------------------Movie information ended----------------------------------------------------*\n";
      console.log(movieInfo);
      writeToFile(movieInfo);
    })
    .catch(function (error) {
      if (error.response) {
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}

function findConcert() {
  //name of venue, venue location, date of the event
  if (userInput === "") {
    userInput = "Backstreet Boys";
  }
  var artist = userInput.split(" ").join("%20");
  // console.log("artist name: " + artist);
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        artist +
        "/events?app_id=codingbootcamp"
    )
    .then(function (response) {
      // console.log("data: " + JSON.stringify(response.data));
      var venue = response.data[0].venue.name;
      var location =
        response.data[0].venue.city +
        " " +
        response.data[0].venue.region +
        " " +
        response.data[0].venue.country;
      var date = moment(response.data[0].venue.datetime).format(
        "MMMM Do YYYY, h:mm:ss a"
      );
      var concertInfo =
        "Name of venue: " +
        venue +
        "\nLocation of venue: " +
        location +
        "\nDate of the event:" +
        date;
      concertInfo +=
        "\n*---------------------------------Concert Information Ended----------------------------------------------*\n";
      console.log(concertInfo);
      writeToFile(concertInfo);
    })
    .catch(function (error) {
      if (error.resonse) {
        console.log(error);
        console.log("*-------------------------------------*");
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error" + error.message);
      }
      console.log(error.config);
    });
}

function readMe(file) {
  fs.readFile(file, "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    }
    var data = data.split(",");
    // console.log(data);
    choice = data[0];
    userInput = data[1].split('"').join("");
    console.log(
      "Testing choice: " + choice + "\nTesting userInput: " + userInput
    );
    liri(choice);
  });
}

function writeToFile(textFile) {
  fs.appendFile("./log.txt", textFile, function (err) {
    if (err) {
      console.log("Unable to write to log.txt" + err);
    } else {
      console.log("log.txt was updated!");
    }
  });
}

liri(choice);
