require("dotenv").config();
var axios = require("axios");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var moment = require("moment");

var keys = require("./keys");
var spotify = new Spotify(keys.spotify);
var choice = process.argv[2];
var userInput = process.argv.slice(3).join(" ");
// console.log("input: " + userInput);

function liri(input){
    switch(input) {
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

function findSong(){//artist, song's name, a preview link of the song on Spotify, the album the song is from
    spotify.search({type:'track', query: userInput}, function(err, data){
        if(err){
            console.log("Error occured: " + err);
            return;
        }
        var artist = data.tracks.items[0].album.artists[0].name;
        var website = data.tracks.items[0].album.external_urls.spotify;
        var album = data.tracks.items[0].album.name;
        console.log("Artist: " + artist + "\nSong name: " + userInput + "\nLink to the song on Spotify: " +
        website + "\nAlbum name: " + album);
        console.log("*---------------------------------------------------------------*")
    });
}

function findMovie(){
    if(userInput === ""){
        userInput = "Mr. Nobody";
    }
    axios.get("http://www.omdbapi.com/?t=" + userInput + "&apikey=trilogy").then(
  function(response) {
    // console.log(response.data.Year);
    var title = response.data.Title;
    var year = response.data.Year;
    var rating = response.data.Rated;
    var score = response.data.Ratings[1].Value;
    var produced = response.data.Country;
    var language = response.data.Language;
    var plot = response.data.Plot;
    var actors = response.data.Actors;

    console.log("The movie's name is: " + title + "\nMovie release year: " + year + "\nMovie is rated: " + rating +
        "\nRotten Tomatoes Score: " + score + "\nCountry where it was produced: " + produced + "\nAvailable languages: " + language +
        "\nPlot of the movie: " + plot + "\nActors in the movie: " + actors);
  })
  .catch(function(error) {
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

function findConcert(){//name of venue, venue location, date of the event
    axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=3288377d-41a0-447d-9794-63854cadbaa8")
    .then(function(response){
            console.log("data: " + response.name);
        })
        .catch(function(error){
            if(error.resonse){
                console.log(error);
                console.log("*-------------------------------------*");
            }
            else if(error.request){
                console.log(error.request);
            }
            else {
                console.log("Error" + error.message)
            }
            console.log(error.config);
        });
}

function readMe(file){
    fs.readFile(file, "utf8", function(error, data){
        if(error){
            return console.log(error);
        }
        var data = data.split(",");
        // console.log(data);
        choice = data[0];
        userInput = data[1].split('"').join('');
        console.log("Testing choice: " + choice + "\nTesting userInput: " + userInput);
        liri(choice);
    });
}

liri(choice);