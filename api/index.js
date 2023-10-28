require("dotenv").config();
const routes = require("./google/photos/photosRouter").routes;
const cors = require("cors");
const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors()).use(routes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
