import * as THREE from 'three'

const textureUrl = require('../../assets/earthmap4k.jpg')

const earthTexture = new THREE.TextureLoader().load(textureUrl)
const earthMaterial = new THREE.MeshPhongMaterial()
earthMaterial.map = earthTexture

const normalTextureUrl = require('../../assets/earth_normal_map4k.jpg')
const normalMap = new THREE.TextureLoader().load(normalTextureUrl)
earthMaterial.normalMap = normalMap

const specularTextureUrl = require('../../assets/earth_normal_map4k.jpg')
const specularMap = new THREE.TextureLoader().load(specularMap)
earthMaterial.specularMap = specularMap

earthMaterial.shadow

export default earthMaterial