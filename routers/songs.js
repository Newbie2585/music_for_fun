const { error } = require("console");
const fs = require("fs");
const path = require("path");
const rout = require("express").Router();
const PORT = 8080;

async function songJsonReader() {
  const jsonBuffer = await fs.promises.readFile(path.join(__dirname, "../","public", "songsjson.json"));
  const songs = await JSON.parse(jsonBuffer).songs;
  return songs;
}

rout.get("/no/:id", async (req, res) => {
  const songId = +req.params.id;
  try {
    const songs = await songJsonReader();
    const sng = await songs.find((song) => song.id === songId);

    if (!sng) {
      res.status(404).send("Song not found");
      return;
    }

    const song_path = path.join(__dirname,"../","music", sng.src);
    console.log("path of song :", song_path);
    let fileSize = 0;
    fileSize = (await fs.promises.stat(song_path)).size;
    console.log("file size of song : ", fileSize);
    const readstream = fs.createReadStream(song_path);

    const header = {
      "Content-Type": "audio/wav",
      "Content-Length": fileSize,
    };

    res.status(200);
    res.set(header);
    readstream.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

rout.get("/so",async (req,res) => {
  try {
    const songs = await songJsonReader();
    res.json({ songs });
  }
  catch (err) {
    console.error(err);
  }
});

module.exports = { rout };