const authorize = require("../autenticationGenerator").authorize;

/**
 * Listar as fotos.
 * Cliente OAuth2 autorizado.
 */
async function photosList() {
  const authClient = await authorize();
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

  return printAndReturn({ ...res.data });
}

/**
 * Listar os albuns.
 * Cliente OAuth2 autorizado.
 */
async function albumsList() {
  const authClient = await authorize();
  const URL = "https://photoslibrary.googleapis.com/v1/albums";

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

  return printAndReturn({ ...res.data }, "albums");
}

function printAndReturn(files, keyName) {
  if (files.length === 0) {
    console.log("No files found.");
    return;
  }

  console.log(`Files:\n`);
  files[keyName].map((file) => {
    const repeat1 = "_".repeat(5);
    const repeat2 = "----".repeat(32);
    console.log(`\n${repeat2}`);
    console.log(
      `${repeat1}File Name: ${file.filename || file.title}\n ${repeat1.repeat(
        2
      )} ID: (${file.id})`
    );
    console.log(`\n${repeat2}`);
  });
  console.log(`\n\n\n`);

  return files;
}

exports.photosList = photosList;
exports.albumsList = albumsList;
