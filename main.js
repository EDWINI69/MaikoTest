import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  100,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 5;
controls.maxDistance = 20;
controls.minPolarAngle = 1;
controls.maxPolarAngle = 1.5;
controls.autoRotate = false;
controls.target = new THREE.Vector3(0, 1, 0);
controls.update();

renderer.outputColorSpace = THREE.sRGBEncoding;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);

camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const spaceTexture = new THREE.TextureLoader().load("./public/space.jpg");
scene.background = spaceTexture;

// Moon

const maikotexture = new THREE.TextureLoader().load("./public/maiko.jpeg");

const tal = new THREE.CylinderGeometry(5, 5, 20, 32);
const material1 = new THREE.MeshBasicMaterial({ map: maikotexture });
const cylinder = new THREE.Mesh(tal, material1);
cylinder.scale.set(1, 1, 1);

scene.add(cylinder);

// const loader = new GLTFLoader().setPath("/models/");
// loader.load("bizcochon.glb", function (gltf) {
//   const mesho = gltf.scene;
//   mesho.position.set(5, -20, -3);
//   mesho.scale.set(6, 6, 6);
//   scene.add(mesho);
// });

cylinder.position.z = 1;
cylinder.position.setX(1);
cylinder.scale.set(1, 1, 1);

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
}

document.body.onscroll = moveCamera;
moveCamera();

function onWindowsSize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowsSize, false);

// Animation Loop

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  cylinder.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
