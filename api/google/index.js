require("dotenv").config();
const fs = require("fs").promises;
const join = require("path").join;
const cwd = require("process").cwd;
const authenticate = require("@google-cloud/local-auth").authenticate;
const { google } = require("googleapis");
const { OAuth2Client } = require("google-auth-library");

// If modifying these scopes, delete token.json.
const SCOPES = [
  "https://www.googleapis.com/auth/photoslibrary",
  "https://www.googleapis.com/auth/drive",
];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.

const TOKEN_PATH = join(cwd(), "./google/token.json");
const CREDENTIALS_PATH = join(cwd(), "./google/credentials.json");

async function criaCredenciaisFile() {
  const jsonContent = JSON.stringify({
    installed: {
      client_id: process.env.CLIENT_ID,
      project_id: process.env.PROJECT_ID,
      auth_uri: process.env.AUTH_URI,
      token_uri: process.env.TOKEN_URI,
      auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uris: [process.env.REDIRECT_URI],
    },
  });

  console.log(process.env.CLIENT_ID, "\naaaaaaaaaaaaaaaaa CLIENT_ID\n\n");

  try {
    await fs.open(CREDENTIALS_PATH, "r");
    console.log("O arquivo JSON já existe.");
  } catch (error) {
    console.log("O arquivo não existe. Criando...");
    try {
      await fs.writeFile(CREDENTIALS_PATH, jsonContent, "utf8");
      console.log("Arquivo JSON foi salvo.");
    } catch (err) {
      console.log("Ocorreu um erro ao escrever o objeto JSON no arquivo.");
      console.log(err);
    }
  }
}

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
    access_token: client.credentials.access_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 * @return {Promise<OAuth2Client>}
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }

  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });

  if (client.credentials) {
    await saveCredentials(client);
  }

  const credentials = await fs.readFile(CREDENTIALS_PATH);
  const credentialsJson = JSON.parse(credentials);
  const { client_secret, client_id, redirect_uris } = credentialsJson.installed;
  const tokens = await fs.readFile(TOKEN_PATH);

  const myAuthclient = new OAuth2Client(
    client_secret,
    client_id,
    redirect_uris
  );

  myAuthclient.setCredentials(JSON.parse(tokens));

  return myAuthclient;
}

/**
 * Lists the names and IDs of up to 10 files.
 * @param {OAuth2Client} authClient An authorized OAuth2 client.
 * @returns {Promise<OAuth2Client>}
 */
// async function

/**
 * Lists the names and IDs of up to 10 files.
 * @param {OAuth2Client} authClient An authorized OAuth2 client.
 */
async function photosList(authClient) {
  const URL = "https://photoslibrary.googleapis.com/v1/mediaItems";

  // const res = await fetch(URL, {
  //   method: "GET",
  //   contentType: "application/json",
  //   headers: {
  //     Authorization: `Bearer ${access_token}`,
  //   },
  // });

  const access_token = (await authClient.getAccessToken()).res.data;
  console.log(
    access_token,
    "\naaaaaaaaaaaaaaaaa authClient.getAccessToken()\n\n"
  );

  const res = await authClient.request({
    method: "GET",
    url: URL,
    headers: {
      Authorization: `Bearer ${access_token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  console.log(
    res.data["nextPageToken"],
    "\naaaaaaaaaaaaaaaaa res nextPageToken \n\n"
  );

  const files = [res.data["mediaItems"], res.data["nextPageToken"]];
  if (files.length === 0) {
    console.log("No files found.");
    return;
  }
  
  console.log(`Files:\n`);
  files[0].map((file) => {
    const repeat1 = "_".repeat(5);
    const repeat2 = "----".repeat(32);
    console.log(`\n${repeat2}`);
    console.log(
      `${repeat1}File Name: ${file.filename}\n ${repeat1.repeat(
        2
      )} Fille ID: (${file.id})`
    );
    console.log(`\n${repeat2}`);
  });
  console.log(files[1],`\n\n\n`);
}

criaCredenciaisFile().then(authorize().then(photosList).catch(console.error));
