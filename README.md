# Liri-Node-App
In this program, LIRI is born. LIRI is like iPhone's SIRI. 
However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. 
LIRI will be a command line node app that takes in parameters and gives you back data.
There are 4 parameters that Liri will work with: spotify-this-song, concert-this, movie-this, do-what-it-says. 
If none of these choices have been made the program will output an error and close. 

spotity-this-song uses the spotify api and takes in a parameter of a song title, that the user provides, and writes to a log file and outputs it to the terminal with the information of: the title, artist(s), a link preview to the song on Spotify, and the album the song is from.  If no song has been inputed the system will automatically use 'I want it that way'.

concert-this will use the bands in town artist event api to search for a concert of an artist for the user.  It will output and write to a log file with the following information of: name of venue, location of venue, date of the event and time.
If no artist has been selected the system will return information for The Backstreet Boys.

movie-this will take in a parameter of a movie from the user and it will also write to a log.txt file.  The following information will be shown to the user: movie title, year the movie came out, imdb rating, rotten tomatoes score, country the movie was produced, language of the movie it's available in, plot of the movie, actors in the movie.  If no movie has been inputed the system will return Mr. Nobody.

do-what-it-says will take in a text file and use any of the choices in that text file and use any of the three apps that has been selected inside the text file.

All of the users log will be saved into a lot.txt file for them to go back on.  The file will not overwrite itself it will just add information from where it left off.  It will also write in the users input that they choose.
