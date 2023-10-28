const {
  photosList,
  albumsList,
  albumsCreate,
  albumsUpdate,
} = require("../photos/photosService");

async function listPhotos(req, res) {
  try {
    const lista = await photosList();
    res.status(200).json(lista);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
}

async function listAlbums(req, res) {
  try {
    const lista = await albumsList();
    res.status(200).json(lista);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
}

async function createAlbum(req, res) {
  try {
    const title = req.body.title;
    const createdAlbum = await albumsCreate(title);
    res.status(201).json(createdAlbum);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
}

async function updateAlbum(req, res) {
  try {
    const { title, id } = req.body;
    const updatedAlbum = await albumsUpdate(title, id);
    res.status(201).json(updatedAlbum);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
}

module.exports = {
  listPhotos,
  listAlbums,
  createAlbum,
  updateAlbum,
};
