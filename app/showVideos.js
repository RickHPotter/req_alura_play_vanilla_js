import { connectAPI } from "./connectAPI.js"

const list = document.querySelector('[data-list]')

function buildCard(element) {
  const card = document.createElement('li')
  card.classList.add('videos__item')

  card.innerHTML = `
    <iframe
      width="100%"
      height="72%"
      src=${element.url}
      title=${element.titulo}
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  `

  const div = document.createElement('div')
  div.classList.add('descricao-video')
  div.innerHTML = `
    <img src=${element.imagem} alt=logo do ${element.titulo} />
    <h3>${element.titulo}</h3>
    <p>${element.descricao}</p>
  `

  card.appendChild(div)
  list.appendChild(card)
}


// <div class="descricao-video">
//   <img src="./img/logo.png" alt="logo canal alura" />
//   <h3>Qual é o melhor hardware para programação com Mario Souto</h3>
//   <p>236 mil visualizações</p>
// </div>

async function listVideo() {
  const videosList = await connectAPI.listVideos()
  videosList.forEach(buildCard)
}


// !
// * MAIN *
// !

listVideo()
