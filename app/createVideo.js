import { connectAPI } from "./connectAPI.js";

const formDOM = document.querySelector("[data-form]");

formDOM.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = formDOM.querySelector("[data-title]");
  const url = formDOM.querySelector("[data-url]");
  const img = formDOM.querySelector("[data-img]");

  const element = {
    id: Date.now(),
    title: title.value,
    desc: Math.floor(Math.random() * 67).toString(),
    url: url.value
      .split("&")[0]
      .replace('s://y', 's://www.y')
      .replace("watch?v=", "")
      .replace(".be/", "be.com/embed/"),
    img: img.value,
  };

  try {
    const data = await connectAPI.createVideo(element);
    buildCard(data);
    window.location.href = "../pages/envio-concluido.html";
  } catch (e) {
    alert(e);
  }
});

// unfortunately I couldnt make this work
async function CheckYtCount(url) {
  const response = await fetch(url);
  const text = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, "text/html");
  return doc.innerHTML;

  // return doc.querySelector('yt-formatted-string#info').querySelector('span').textContent
}
