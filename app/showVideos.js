import { connectAPI } from "./connectAPI.js"

const listDOM = document.querySelector('[data-list]')
const searchInputDOM = document.querySelector('[data-search-input]')
const searchButtonDOM = document.querySelector('[data-search-btn]')


function buildSection(elements) {
  listDOM.innerHTML = ''
  elements.forEach((element) => buildCard(element))
}

function buildCard(element) {
  const card = document.createElement('li')
  card.classList.add('videos__item')
  card.dataset.id = element.id

  card.innerHTML = `
    <iframe
      width="100%"
      height="72%"
      src=${element.url}
      title=${element.title}
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  `

  const div = document.createElement('div')
  div.classList.add('descricao-video')
  div.innerHTML = `
    <img src=${element.img} alt=logo ${element.title} />
    <h3>${element.title}</h3>
    <p>${element.desc}</p>
  `

  card.appendChild(div)
  listDOM.appendChild(card)
}

async function listVideo() {
  try {
    const videosList = await connectAPI.readVideos()
    buildSection(videosList)
  } catch {
    listDOM.innerHTML = `<h2 class = "mensagem__titulo">
    Something happened while fetching videos.
    </h2>`
  }
}

async function listVideoWhere(query) {
  try {
    const videosList = await connectAPI.readVideosWhere(query)
    if (videosList[0] == undefined) {
      listDOM.innerHTML = `<h2 class = "mensagem__titulo">
      No videos found.
      </h2>`
    } else {
      buildSection(videosList)
    }
  } catch {
    listDOM.innerHTML = `<h2 class = "mensagem__titulo">
    Something happened while fetching videos.
    </h2>`
  }
}

// !
// * MAIN *
// !

listVideo()

document.addEventListener("keypress", (event) => {
  event.preventDefault()

  if (event.key === "/") {
    searchInputDOM.focus()
    searchInputDOM.innerHTML = ''
  }
});

searchInputDOM.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
      searchButtonDOM.click();
  }
});

searchButtonDOM.addEventListener('click', (event) => {
  event.preventDefault()

  const query = searchInputDOM.value
  listVideoWhere(query)
})
