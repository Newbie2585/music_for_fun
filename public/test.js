const { json } = require("express");
const fs = require("fs");
const path = require("path");

fs.promises.readFile("./public/songs.json")
.then((j) => JSON.parse(j).songs)
.then((j1) => j1.find((item) => item.id === 3))
.then((song) => JSON.stringify(song))
.then((j2) => console.log(j2))
.catch((err) => console.log(err));