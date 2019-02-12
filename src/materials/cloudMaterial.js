import * as THREE from "three";
import manager from "../LoadingProgress";

const textureUrl = require("../../assets/cloudmap4k.png");

var cloudTexture = new THREE.TextureLoader(manager).load(textureUrl);
var cloudMaterial = new THREE.MeshPhongMaterial();
cloudMaterial.map = cloudTexture;
cloudMaterial.transparent = true;

export default cloudMaterial;
