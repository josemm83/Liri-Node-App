require("dotenv").config();
var axios = require("axios");
var Spotify = require("node-spotify-api");
var fs = require("fs");

var keys = require("./keys");
var spotify = new Spotify(keys.spotify);
var choice = process.argv[2];
var userInput = process.argv.slice(3).join(" ");

switch(choice) {
    case "concert-this":
        break;
    case "spotify-this-song":
        break;
    case "movie-this":
        break;
    case "do-what-it-says":
        readMe("random.txt");
        break;
    default:
        console.log("Not a valid command");
}

function findSong(){

}

function findMovie(){

}

function readMe(file){
    fs.readFile(file, "utf8", function(error, data){
        if(error){
            return console.log(error);
        }

    });
}