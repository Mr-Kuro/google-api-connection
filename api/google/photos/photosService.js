const Authorizations = require("../models/GoogleAuthService").GoogleAuthService;

/**
 * Listar as fotos.
 * Cliente OAuth2 autorizado.
 */
async function photosList() {
  const authorizations = new Authorizations();
  const authClient = await authorizations.authorize();

  const URL = "https://photoslibrary.googleapis.com/v1/mediaItems";

  const access_token = (await authClient.getAccessToken()).res.data;

  const res = await authClient.request({
    method: "GET",
    url: URL,
    headers: {
      Authorization: `Bearer ${access_token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return printAndReturn({ ...res.data }, "mediaItems");
}

/**
 * Listar os albuns.
 * Cliente OAuth2 autorizado.
 */
async function albumsList() {
  const authorizations = new Authorizations();
  const authClient = await authorizations.authorize();
  const URL = "https://photoslibrary.googleapis.com/v1/albums";
  const access_token = (await authClient.getAccessToken()).res.data;

  try {
    console.log("Fazendo request da lista  de albuns...");
    const res = await authClient.request({
      method: "GET",
      url: URL,
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    console.log("Requeste aceita com sucesso.");

    if(res.status !== 200) { throw new Error};
    return printAndReturn({ ...res.data }, "albums");
  } catch (err) {
    console.log(err, "err listAlbums");
    return { msg: "Erro ao buscar albuns" };
  }
}

/**
 *  printa e retorna a resposta das requisições.
 */
function printAndReturn(files, keyName) {
  if (!files[0] || files[0].length === 0) {
    console.log("lista vazia");
    return { msg: "lista vazia" };
  }

  console.log(`Files:\n`);
  files[keyName].map((file) => {
    const repeat1 = "_".repeat(5);
    const repeat2 = "----".repeat(32);
    console.log(`\n${repeat2}`);
    console.log(
      `${repeat1}File Name: ${file.filename || file.title}\n
       ${repeat1.repeat(2)} ID: (${file.id})`
    );
    console.log(`\n${repeat2}`);
  });
  console.log(`\n\n\n`);

  return files;
}

module.exports = {
  photosList,
  albumsList,
};
