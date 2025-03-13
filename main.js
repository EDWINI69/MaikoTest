import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  100,
  window.innerWidth / window.innerHeight,
  1,
  1000
);

const canvas = document.createElement("canvas");
const gl =
  canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
if (!gl) {
  console.error("WebGL no está soportado en este navegador.");
}

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

renderer.render(scene, camera);

// Iluminacion

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 0, 5);
scene.add(directionalLight);

// Torus

const spaceTexture = new THREE.TextureLoader().load("./public/museum-tal.jpg");
scene.background = spaceTexture;

// scene.add(cylinder);

const button = document.getElementById("botono");
let modeloActivo = null; // Ahora está vacío

// MAIKO-FEO
let maikomodel = null;
const loader1 = new GLTFLoader().setPath("./public/models/");
loader1.load("maiko-krilin.glb", function (gltf) {
  maikomodel = gltf.scene;
  maikomodel.position.set(0, -8, 0);
  maikomodel.scale.set(20, 20, 20);
  scene.add(maikomodel);

  if (!modeloActivo) {
    modeloActivo = maikomodel;
  }
});

// SILENT BIZCOCHO HILL
let mesho = null;
const loader2 = new GLTFLoader().setPath("./public/models/");
loader2.load("Bizcochito-cover.glb", function (gltf) {
  mesho = gltf.scene;
  mesho.position.set(0, -18, 0);
  mesho.scale.set(6, 6, 6);
  mesho.visible = false;
  scene.add(mesho);
});

// SILENT BIZCOCHO HILL
let peramodel = null;
const loader3 = new GLTFLoader().setPath("./public/models/");
loader3.load("braylinPERA3.0.glb", function (gltf) {
  peramodel = gltf.scene;
  peramodel.position.set(0, -11, 0);
  peramodel.scale.set(9, 9, 9);
  peramodel.visible = false;
  scene.add(peramodel);
});

// Botón de cambio
button.addEventListener("click", function () {
  // Desactivar el modelo actual
  modeloActivo.visible = false;

  // Cambiar el modelo activo
  if (modeloActivo === maikomodel) {
    modeloActivo = mesho;
  } else if (modeloActivo === mesho) {
    modeloActivo = peramodel;
  } else {
    modeloActivo = maikomodel;
  }

  // Activar el nuevo modelo
  modeloActivo.visible = true;
});

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

  if (modeloActivo) {
    modeloActivo.rotation.y += 0.02; // Rotate only the active model
  }

  renderer.render(scene, camera);
}

animate();
