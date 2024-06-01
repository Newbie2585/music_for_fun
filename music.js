const fs = require("fs");
const path = require("path");
const express = require("express");
const PORT = 8080;
const bodyParser = require("body-parser");

let exp = express();
exp.use(express.static(path.join(__dirname, "public")));
exp.use(bodyParser.urlencoded({ extended: true }));
exp.get("rerere/main/:id", async (req, res) => {
  const songId = +req.params.id;
  try {
    const jsonBuffer = await fs.promises.readFile(
      path.join(__dirname, "public", "songs.json")
    );
    const songs = await JSON.parse(jsonBuffer).songs;
    // console.log(songs);
    const sng = await songs.find((song) => song.id === songId);
    console.log("here is song : ", sng);
    if (!sng) {
      res.status(404).send("Song not found");
      return;
    }
    const song_path = path.join(__dirname, "music", sng.src);
    console.log("path of song :", song_path);
    let fileSize = 0;
    fileSize = (await fs.promises.stat(song_path)).size;
    console.log("file size of song : ", fileSize);
    const readstream = fs.createReadStream(song_path);
    const header = {
      "Content-Type": "audio/wav",
      "Content-Length": fileSize,
    };
    // res.send("Hello, Node.js HTTP Server!\n");
    res.status(200);
    res.set(header);
    readstream.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

exp.listen(PORT, "localhost", () => {
  console.log("server is running fine");
});
// const player = require("node-wav-player");
// exp.use(express.static("/"))
//const fs = require('fs');
// const event1 = require("events");
// let action = new event1();

// function play_b() {
//   player
//     .play({
//       path: "./music/Peach Tree Rascals - Mariposa.wav",
//     })
//     .then(() => {
//       console.log("The wav file started to be played successfully.");
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }

// function pause_b() {
//   setTimeout(() => {
//     player.stop();
//     console.log("Stopped.");
//   }, 10000);
// }

// play_b();
// pause_b()
// exp.get("/",(req,res)=>{
//   return res.json("action");
// });

// const http = require('http');
// // Define the hostname and port for the server to listen on.
// const hostname = '127.0.0.1'; // Loopback address for the local machine
// const port = 3000; // Port number
// // Create an HTTP server using the 'createServer' method of the 'http' module.
// const server = http.createServer((req, res) => {
// // Set the response's HTTP status code and content type.
// res.statusCode = 200;
// res.setHeader('Content-Type', 'text/plain');
// // Write a response message.
// });
// // Start the server and make it listen for incoming HTTP requests.
// // Output message that the server has started
// console.log(`Server running at http://${hostname}:${port}/`);
