let nameH1;
let characters;
let planetsDiv;
let directorSpan;
let episodeSpan;
let releaseSpan;
const baseUrl = `https://swapi2.azurewebsites.net/api`;

// Runs on page load
addEventListener("DOMContentLoaded", () => {
  nameH1 = document.querySelector("h1#name");
  directorSpan = document.querySelector("span#director");
  episodeSpan = document.querySelector("span#episode_id");
  releaseSpan = document.querySelector("span#release_date");
  charactersUl = document.querySelector("#characters>ul");
  planetsUl = document.querySelector("#planets>ul");
  const sp = new URLSearchParams(window.location.search);
  const id = sp.get("id");
  getFilm(id);
});

async function getFilm(id) {
  let film;
  try {
    film = await fetchFilm(id);
    film.characters = await fetchCharacters(film);
    film.planets = await fetchPlanets(film);
  } catch (ex) {
    console.error(`Error reading character ${id} data.`, ex.message);
  }
  renderFilm(film);
}

async function fetchFilm(id) {
  const url = `${baseUrl}/films/${id}`;
  const films = await fetch(url).then((res) => res.json());
  return films;
}

async function fetchCharacters(film) {
  let characterUrl = `${baseUrl}/films/${film?.id}/characters`;
  return await fetch(characterUrl).then((res) => res.json());
}

async function fetchPlanets(film) {
  const url = `${baseUrl}/films/${film?.id}/planets`;
  const planet = await fetch(url).then((res) => res.json());
  return planet;
}

const renderFilm = (film) => {
  document.title = `SWAPI - ${film?.title}`; // Just to make the browser tab say their name
  nameH1.textContent = film?.title;
  directorSpan.textContent = film?.director;
  episodeSpan.textContent = film?.episode_id;
  releaseSpan.textContent = film?.release_date;
  const charactersLis = film?.characters?.map(
    (character) =>
      `<li><a href="/character.html?id=${character.id}">${character.name}</li>`
  );
  charactersUl.innerHTML = charactersLis.join("");
  const planetsLis = film?.planets?.map(
    (planets) =>
      `<li><a href="/planets.html?id=${planets.id}">${planets.name}</li>`
  );
  planetsUl.innerHTML = planetsLis.join("");
};
