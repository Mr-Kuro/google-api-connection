// GoogleAuthService.js
class GoogleAuthService {
  constructor() {
    this.fs = require("fs").promises;
    this.join = require("path").join;
    this.cwd = require("process").cwd;
    this.authenticate = require("@google-cloud/local-auth").authenticate;
    this.google = require("googleapis").google;
    this.OAuth2Client = require("google-auth-library").OAuth2Client;
    this.SCOPES = [
      "https://www.googleapis.com/auth/photoslibrary",
      "https://www.googleapis.com/auth/drive",
    ];
    this.TOKEN_PATH = this.join(this.cwd(), "./google/token.json");
    this.CREDENTIALS_PATH = this.join(this.cwd(), "./google/credentials.json");
  }

  printLog(logMSG, err = '') {
    this.TOKEN_PATH
    console.log('\n',logMSG, err);
  }

  async criaCredenciaisFile() {
    this.printLog("Gerando credenciais...");

    const credentialsJson = JSON.stringify({
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

    try {
      await this.fs.open(this.CREDENTIALS_PATH, "r");
      this.printLog("As credenciais já existem.");
    } catch (error) {
      try {
        await this.fs.writeFile(this.CREDENTIALS_PATH, credentialsJson, "utf8");
        this.printLog("Credenciais geradas com sucesso.");
      } catch (err) {
        this.printLog("Erro ao gerar credenciais.", err);
      }
    }
  }

  /**
   * Ler credenciais previamente autorizadas do arquivo salvo.
   *
   * @return {Promise<OAuth2Client|null>}
   */
  async loadSavedToken() {
    this.printLog("Carregando Token salvo...");
    try {
      const token = JSON.parse(await this.fs.readFile(this.TOKEN_PATH));

      this.printLog("Token carregado com sucesso.");
      return this.google.auth.fromJSON(token);
    } catch (err) {
      this.printLog("Erro ao carregar Token salvo.", err);
      return null;
    }
  }

  /**
   * Serializar credenciais em um arquivo compatível com GoogleAUth.fromJSON.
   *
   * @param {OAuth2Client} client
   * @return {Promise<void>}
   */
  async saveToken(client) {
    this.printLog("Salvando Token...");
    const content = await this.fs.readFile(this.CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    try {
      const payload = JSON.stringify({
        type: "authorized_user",
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
        access_token: client.credentials.access_token,
      });
      await this.fs.writeFile(this.TOKEN_PATH, payload);
      this.printLog("Token salva com sucesso.");
    } catch (err) {
      this.printLog("Erro ao salvar Token.", err);
    }
  }

  /**
   * Carregar ou solicitar as autorizações para chamar a APIs.
   * @return {Promise<OAuth2Client>}
   */
  async authorize() {
    this.printLog("Gerando autorização...");

    await this.criaCredenciaisFile();

    let client = null;

    try {
      client = await this.loadSavedToken();
      if (client) {
        return client;
      }

      client = await this.authenticate({
        scopes: this.SCOPES,
        keyfilePath: this.CREDENTIALS_PATH,
      });

      if (client.credentials) {
        await this.saveToken(client);
      }

      const credentials = JSON.parse(await this.fs.readFile(this.CREDENTIALS_PATH));
      const { client_secret, client_id, redirect_uris } =
        credentials["installed" || "web"];
      const token = await this.fs.readFile(this.TOKEN_PATH);

      const myAuthclient = new this.OAuth2Client(
        client_secret,
        client_id,
        redirect_uris
      );

      myAuthclient.setCredentials(JSON.parse(token));

      this.printLog("Autorizado com sucesso.");
      return myAuthclient;
    } catch (error) {
      this.printLog("Erro ao gerar autorização.", error);
      return null;
    }
  }
}

module.exports = { GoogleAuthService };
