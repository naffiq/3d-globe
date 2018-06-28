import * as THREE from 'three'
import * as WindowResize from 'three-window-resize'
import OrbitControlsSetup from 'three-orbit-controls'
const OrbitControls = OrbitControlsSetup(THREE)

import earthMaterial from './materials/earthMaterial'
import cloudMaterial from './materials/cloudMaterial'

var scene, renderer
var cameraAspect, camera, cameraControl

const sphereWidthSegments = 30
const sphereHeightSegments = 30
var sphereGeometry = new THREE.SphereGeometry(15, 30, 30)
var earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial)
earthMesh.name = 'earth'

const cloudGeometryRadius = sphereGeometry.parameters.radius * 1.01
var cloudGeometry = new THREE.SphereGeometry(
  cloudGeometryRadius, sphereWidthSegments, sphereHeightSegments
)
var cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial)
cloudMesh.name = 'clouds'

var directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1)
directionalLight.name = 'directional'
directionalLight.position.copy(new THREE.Vector3(100, 10, -50))

function init() {
  scene = new THREE.Scene()

  renderer = new THREE.WebGLRenderer
  renderer.setClearColor(0x000000)
  renderer.setSize(window.innerWidth, window.innerHeight)

  cameraAspect = window.innerWidth / window.innerHeight
  camera = new THREE.PerspectiveCamera(45, cameraAspect)
  camera.position.x = 30
  camera.position.y = 0
  camera.position.z = 15

  camera.lookAt(scene.position)

  cameraControl = new OrbitControls(camera)

  scene.add(earthMesh)
  scene.add(cloudMesh)

  scene.add(directionalLight)

  var ambientLight = new THREE.AmbientLight(0x111111)
  scene.add(ambientLight)

  document.body.appendChild(renderer.domElement)
  render()
}

function render() {
  requestAnimationFrame(render)
  cameraControl.update()

  earthMesh.rotation.y += .0005;
  cloudMesh.rotation.y += .00052;

  localStorage.setItem('earthRotation', earthMesh.rotation.y);
  localStorage.setItem('cloudsRotation', cloudMesh.rotation.y);

  renderer.render(scene, camera)
}

document.addEventListener('resize', function () {
  renderer.setSize(window.innerWidth, window.innerHeight)

  cameraAspect = window.innerWidth / window.innerHeight
  camera.aspect = cameraAspect
  camera.updateProjectionMatrix()
})

init()
var windowResize = new WindowResize(renderer, camera)