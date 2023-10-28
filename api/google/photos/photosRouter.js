const {
  listPhotos,
  listAlbums,
  createAlbum,
  updateAlbum,
} = require("./photosControler");
const route = require("express").Router();

route.route("/listPhotos").get(listPhotos);

route.get("/listAlbums", listAlbums);

route.post("/createAlbum", createAlbum);

route.patch("/updateAlbum", updateAlbum);

route.get("/", (req, res) => {
  console.log("Bem vindo ao conector de APIs do Google.");
  res.status(200).json({ msg: "Bem vindo ao conector de APIs do Google." });
});

module.exports = { routes: route };
