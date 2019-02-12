import * as THREE from "three";
import { init } from "./main";

const manager = new THREE.LoadingManager();

const loaderElement = document.getElementById("loader");
const loadedItemsElement = document.getElementById("loaded-textures");
const totalItemsElement = document.getElementById("total-textures");

const updateProgress = (itemsLoaded, itemsTotal) => {
  loadedItemsElement.innerText = itemsLoaded;
  totalItemsElement.innerText = itemsTotal;
};

manager.onStart = function(_, itemsLoaded, itemsTotal) {
  loaderElement.setAttribute("style", "display: flex");
  updateProgress(itemsLoaded, itemsTotal);
};

manager.onLoad = function() {
  init();
  loaderElement.setAttribute("style", "display: none");
  console.log("Loading complete!");
};

manager.onProgress = function(_, itemsLoaded, itemsTotal) {
  updateProgress(itemsLoaded, itemsTotal);
};

export default manager;
