require("dotenv").config();
const fs = require("fs").promises;
const join = require("path").join;
const cwd = require("process").cwd;
const authenticate = require("@google-cloud/local-auth").authenticate;
const { google } = require("googleapis");
const { OAuth2Client } = require("google-auth-library");

const SCOPES = [
  "https://www.googleapis.com/auth/photoslibrary",
  "https://www.googleapis.com/auth/drive",
];

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
 * Ler credenciais previamente autorizadas do arquivo salvo.
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
 * Serializar credenciais em um arquivo compatível com GoogleAUth.fromJSON.
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
 * Carregar ou solicitar ou autorização para chamar APIs.
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
 * Listar os nomes e IDs de até 10 arquivos.
 * @param {OAuth2Client} authClient Cliente OAuth2 autorizado.
 * @returns {Promise<OAuth2Client>}
 */
// async function

/**
 * Listar os nomes e IDs de até 10 arquivos.
 * @param {OAuth2Client} authClient Cliente OAuth2 autorizado.
 */

exports.authorize = authorize;
