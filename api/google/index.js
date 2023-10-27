const express = require("express");
const photosList = require("./photos/photosService").photosList;
const albumsList = require("./photos/photosService").albumsList;

const port = 3000;
const app = new express();

app.get("/listPhotos", (req, res) => {
  photosList();
  res.status(200).send();
});

app.get("/listAlbums", (req, res) => {
  albumsList();
  res.status(200).send();
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

app.post("/");
