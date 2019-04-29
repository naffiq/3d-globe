import * as THREE from "three";
import OrbitControlsSetup from "three-orbit-controls";

const OrbitControls = OrbitControlsSetup(THREE);

import earthMaterial from "./materials/earthMaterial";
import cloudMaterial from "./materials/cloudMaterial";

var scene, renderer;
var cameraAspect, camera, cameraControl;

const sphereWidthSegments = 30;
const sphereHeightSegments = 30;
var sphereGeometry = new THREE.SphereGeometry(15, 30, 30);
var earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
earthMesh.name = "earth";

const cloudGeometryRadius = sphereGeometry.parameters.radius * 1.01;
var cloudGeometry = new THREE.SphereGeometry(
  cloudGeometryRadius,
  sphereWidthSegments,
  sphereHeightSegments
);
var cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
cloudMesh.name = "clouds";

var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.name = "directional";
directionalLight.position.copy(new THREE.Vector3(100, 10, -50));

export function init() {
  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0x000000);
  renderer.setSize(window.innerWidth, window.innerHeight);
  cameraAspect = window.innerWidth / window.innerHeight;

  camera = new THREE.PerspectiveCamera(45, cameraAspect);
  camera.position.x = 30;
  camera.position.y = 0;
  camera.position.z = 15;
  camera.lookAt(scene.position);

  cameraControl = new OrbitControls(camera);
  cameraControl.minDistance = 30;
  cameraControl.maxDistance = 100;

  scene.add(earthMesh);
  scene.add(cloudMesh);

  scene.add(directionalLight);

  var ambientLight = new THREE.AmbientLight(0x111111);
  scene.add(ambientLight);

  document.body.appendChild(renderer.domElement);
  render();
}

function render() {
  requestAnimationFrame(render);
  cameraControl.update();

  earthMesh.rotation.y += 0.0005;
  cloudMesh.rotation.y += 0.00052;

  renderer.render(scene, camera);
}

var isMobile = false; //initiate as false
// device detection
if (
  /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
    navigator.userAgent
  ) ||
  /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
    navigator.userAgent.substr(0, 4)
  )
) {
  isMobile = true;
}

if (!isMobile) {
  window.addEventListener(
    "resize",
    () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    },
    false
  );
}
