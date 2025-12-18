"use strict";

// image arrays
// de endelige billeder skal ligge her. gallery1 og gallery2 er opdelt i de to lokationer(karolinelund og akkc)
const gallery1 = [
  "../../assets/images/agaeta01.jpeg",
  "../../assets/images/agaeta02.jpeg",
  "../../assets/images/confital01.jpeg",
  "../../assets/images/dessert01.jpeg",
  "../../assets/images/laaldea01.jpeg",
  "../../assets/images/mountains01.jpeg",
  "../../assets/images/mountains02.jpeg",
  "../../assets/images/mountains03.jpeg",
  "../../assets/images/mountains04.jpeg",
  "../../assets/images/mountains05.jpeg",
  "../../assets/images/lascanteras01.jpeg",
  "../../assets/images/lascanteras02.jpeg",
  "../../assets/images/laspalmas01.jpeg",
  "../../assets/images/mogan01.jpeg",
  "../../assets/images/mogan02.jpeg"
];

const gallery2 = [
  "../../assets/images/lascanteras01.jpeg",
  "../../assets/images/lascanteras02.jpeg",
  "../../assets/images/laspalmas01.jpeg",
  "../../assets/images/mogan01.jpeg",
  "../../assets/images/mogan02.jpeg",
  "../../assets/images/agaeta01.jpeg",
  "../../assets/images/agaeta02.jpeg",
  "../../assets/images/confital01.jpeg",
  "../../assets/images/dessert01.jpeg",
  "../../assets/images/laaldea01.jpeg",
  "../../assets/images/mountains01.jpeg",
  "../../assets/images/mountains02.jpeg",
  "../../assets/images/mountains03.jpeg",
  "../../assets/images/mountains04.jpeg",
  "../../assets/images/mountains05.jpeg",
];

let currentGallery = [];
let currentIndex = 0;


let gridStart = 0;

// SECTION 1 – switch gallery
function loadGallery(number) {
  currentGallery = number === 1 ? gallery1 : gallery2;
  currentIndex = 0;
  gridStart = 0; 

  updateSlider();
  buildGrid();
}

// SECTION 2 – slider
function updateSlider() {
  document.getElementById("gallerySliderImage").src =
    currentGallery[currentIndex];
}

function nextImage() {
  currentIndex++;

  if (currentIndex >= currentGallery.length) {
    currentIndex = 0;
  }

  updateSlider();
}

function prevImage() {
  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = currentGallery.length - 1;
  }

  updateSlider();
}

// SECTION 3 – grid gallery (9 images only)
function buildGrid() {
  const grid = document.getElementById("galleryGrid");
  grid.innerHTML = "";

  for (let i = gridStart; i < gridStart + 9 && i < currentGallery.length; i++) {
    const image = document.createElement("img");
    image.src = currentGallery[i];

    image.onclick = () => {
      currentIndex = i;
      updateSlider();
    };

    grid.appendChild(image);
  }
}


function nextGrid() {
  gridStart += 9;
  if (gridStart >= currentGallery.length) {
    gridStart = 0;
  }
  buildGrid();
}

function prevGrid() {
  gridStart -= 9;
  if (gridStart < 0) {
    gridStart = Math.max(currentGallery.length - 9, 0);
  }
  buildGrid();
}

// init
loadGallery(1);