import * as THREE from "three";
import manager from "../LoadingProgress";

const textureUrl = require("../../assets/earthmap4k.jpg");

const earthTexture = new THREE.TextureLoader(manager).load(textureUrl);
const earthMaterial = new THREE.MeshPhongMaterial();
earthMaterial.map = earthTexture;

const normalTextureUrl = require("../../assets/earth_normal_map4k.jpg");
const normalMap = new THREE.TextureLoader(manager).load(normalTextureUrl);
earthMaterial.normalMap = normalMap;

const specularTextureUrl = require("../../assets/earthspec4k.jpg");
const specularMap = new THREE.TextureLoader(manager).load(specularTextureUrl);
earthMaterial.specularMap = specularMap;

earthMaterial.shadow;

export default earthMaterial;
