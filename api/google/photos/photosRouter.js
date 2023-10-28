const {listPhotos, listAlbums} = require("./photosControler");
const route = require("express").Router();


route.route("/listPhotos").get(listPhotos);

route.get("/listAlbums", listAlbums);

route.get("/", (req, res) => {
  console.log("Bem vindo ao conector de APIs do Google.");
  res.status(200).json({msg:"Bem vindo ao conector de APIs do Google."});
})

module.exports = {routes: route};
