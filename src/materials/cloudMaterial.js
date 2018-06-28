import * as THREE from 'three'

const textureUrl = require('../../assets/cloudmap4k.png');

var cloudTexture = new THREE.TextureLoader().load(textureUrl)
var cloudMaterial = new THREE.MeshPhongMaterial()
cloudMaterial.map = cloudTexture
cloudMaterial.transparent = true

export default cloudMaterial