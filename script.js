"use strict";

const cities = [
  { name: "Athens", src: "/images/00_Athens.jpg" },
  { name: "Rome", src: "/images/01_Rome.jpg" },
  { name: "Paris", src: "/images/02_Paris.jpg" },
  { name: "London", src: "/images/03_London.jpg" },
  { name: "Moscow", src: "/images/04_Moscow.jpg" },
  { name: "Vienna", src: "/images/05_Vienna.jpg" },
  { name: "Berlin", src: "/images/06_Berlin.jpg" },
  { name: "Riga", src: "/images/07_Riga.jpg" },
  { name: "Riga", src: "/images/07_Riga.jpg" },
  { name: "Tallinn", src: "/images/08_Tallinn.jpg" },
  { name: "Helsinki", src: "/images/09_Helsinki.jpg" },
  { name: "Los Angeles", src: "/images/10_Los_Angeles.jpg" },
  { name: "New York", src: "/images/11_New_York.jpg" },
  { name: "Saint Petersburg", src: "/images/12_Saint_Petersburg.jpg" },
  { name: "Barcelona", src: "/images/13_Barcelona.jpg" },
  { name: "Bremen", src: "/images/14_Bremen.jpg" },
  { name: "Prague", src: "/images/15_Prague.jpg" },
];

const startGameElement = document.querySelector(".btn_start");
const scoreElement = document.querySelector(".score");
const puzzleElement = document.querySelector(".puzzle");
const lettersElement = document.querySelector(".letters");
const showHintElement = document.querySelector(".btn_hint");
const imageHitsElement = document.querySelector(".image_hits");
const gameOverElement = document.querySelector(".game_over");

(function start() {
  startGameElement.addEventListener("click", () => {
    let randomNumber = Math.floor(Math.random() * cities.length);
    let city = cities[randomNumber].name.toLocaleUpperCase();
    let arrayCity = city.split("");
    createPuzzle(arrayCity);
    createAbc(arrayCity);
    buttonShowHint(randomNumber);
    counterGame();
    console.log(arrayCity);
    gameOverElement.textContent = "";
  });
})();

function createPuzzle(arrayCity) {
  puzzleElement.innerHTML = "";
  createSpaceBlocks(arrayCity, puzzleElement);
}

function createSpaceBlocks(arrayCity, element) {
  let spaceBlocks;
  arrayCity.forEach((item) => {
    if (item !== " ") {
      spaceBlocks = `<div class="boxE" data-dash>-</div>`;
    } else {
      spaceBlocks = `<div class="boxE empty">${item}</div>`;
    }
    element.insertAdjacentHTML("beforeend", spaceBlocks);
  });
}

function createAbc(arrayCity) {
  const emptyBlocks = document.querySelectorAll("[data-dash]");
  lettersElement.innerHTML = "";
  const alphabet = String.fromCharCode(
    ...Array.from({ length: 26 }, (_, i) => i + 65),
  );
  const arrAlphabet = alphabet.split("");
  arrAlphabet.forEach((item) => {
    let letterBlock = `<div class="boxE alphabet">${item}</div>`;
    lettersElement.insertAdjacentHTML("beforeend", letterBlock);
  });
  document.querySelectorAll(".alphabet").forEach((item) => {
    item.addEventListener("click", () => {
      chooseLetter(item.textContent, arrayCity, emptyBlocks);
    });
  });
}

function buttonShowHint(number) {
  imageHitsElement.innerHTML = "";
  showHintElement.classList.remove("hide");
  showHintElement.addEventListener("click", () => {
    let imgBlock = `<img src=${cities[number].src} alt="view of city" width=350/>`;
    imageHitsElement.innerHTML = imgBlock;
  });
}

function chooseLetter(text, array, emptyBlocks) {
  const newArray = array.filter((item) => item !== " ");
  let lettersOfWord = [];
  newArray.forEach((item, index) => {
    if (item === text) {
      lettersOfWord.push(index);
      emptyBlocks[index].textContent = item;
      emptyBlocks[index].removeAttribute("data-dash");
      counterGame();
    }
  });
}

function createNameCityBlocks(arrayCity, element) {
  arrayCity.forEach((item) => {
    let letterBlock;
    if (item !== " ") {
      letterBlock = `<div class="boxE">${item}</div>`;
    } else {
      letterBlock = `<div class="boxE" empty>${item}</div>`;
    }
    element.insertAdjacentHTML("beforeend", letterBlock);
  });
}

function counterGame() {
  let lengthToEnd = document.querySelectorAll("[data-dash]").length;
  scoreElement.textContent = `Total Letters Left: ${lengthToEnd}`;
  if (lengthToEnd === 0) {
    gameOverElement.textContent = "game over!";
  }
}
