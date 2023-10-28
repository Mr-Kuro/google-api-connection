const {photosList, albumsList} = require("../photos/photosService");

async function listPhotos(req, res) {
  console.log("listPhotos");
  try {
    const lista = await photosList();
    res.status(201).json(lista);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
}

async function listAlbums(req, res) {
  try {
    const lista = await albumsList();
    res.status(201).json(lista);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
}

module.exports = {
  listPhotos,
  listAlbums,
};
