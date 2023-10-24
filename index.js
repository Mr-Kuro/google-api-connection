// const API_URL = "http://localhost:3333";e
import jwt_decode from "https://cdn.skypack.dev/jwt-decode";
import axios from "https://cdn.skypack.dev/axios";

let token = null;

async function handleCredentialResponse(CredentialResponse) {
  try {
    const email = document.getElementById("email");
    const fullName = document.getElementById("fullName");
    const verified = document.getElementById("verified");
    const picture = document.getElementById("picture");

    const response = await jwt_decode(CredentialResponse.credential);

    token = CredentialResponse.credential;
    console.log(response);
    photos(); // get photos

    email.textContent = response.email;
    fullName.textContent = response.name;
    verified.textContent = response.email_verified;
    picture.setAttribute("src", response.picture);
  } catch (error) {
    console.log(error, "Erro ao enviar token para o servidor");
    prompt(error, "Erro ao enviar token para o servidor");
  }
}

async function photos() {
  const url = "https://photoslibrary.googleapis.com/v1/albums";
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response);
}

window.onload = () => {
  console.log("loaded");

  google.accounts.id.initialize({
    client_id:
      "682415795657-9nfo6cv186h3s0tb420pcuarem5771dj.apps.googleusercontent.com",
    callback: handleCredentialResponse,
  });
  google.accounts.id.renderButton(
    document.getElementById("buttonDiv"),
    {
      theme: "outline",
      size: "large",
      shape: "pill",
      text: "$ {button.text}",
      locale: "pt",
      logo_alignment: "left",
      width: "300px",
    } // customization attributes
  );
  google.accounts.id.prompt(); // also display the One Tap dialog
};
