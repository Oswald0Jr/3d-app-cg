import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const space = new THREE.TextureLoader().load(
  "textures/as-belas-estrelas-brilhando-no-ceu-noturno.jpg"
);

scene.background = space;

// Sol
const sunGeometry = new THREE.SphereGeometry(1, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Terra
const earthGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load(
  "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg"
);
const earthMaterial = new THREE.MeshStandardMaterial({ map: earthTexture });
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earth);

// Lua
const moonGeometry = new THREE.SphereGeometry(0.2, 32, 32);
const moonTexture = textureLoader.load(
  "https://threejs.org/examples/textures/planets/moon_1024.jpg"
);

const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTexture });
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
scene.add(moon);

//Marte
const marsGeometry = new THREE.SphereGeometry(0.4, 32, 32);
const marsTexture = textureLoader.load("textures/mars.jpeg");
const marsMaterial = new THREE.MeshStandardMaterial({ map: marsTexture });
const mars = new THREE.Mesh(marsGeometry, marsMaterial);
scene.add(mars);

// Planeta Cubo
const cubeGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
const cubeTexture = textureLoader.load("textures/cube.jpeg");
const cubeMaterial = new THREE.MeshStandardMaterial({ map: cubeTexture });
const cubePlanet = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cubePlanet);

const icosahedronGeometry = new THREE.IcosahedronGeometry(0.4, 0);
const icosahedronTexture = textureLoader.load("textures/blueplanet.jpg");
const icosahedronMaterial = new THREE.MeshStandardMaterial({
  map: icosahedronTexture,
});
const icosahedronPlanet = new THREE.Mesh(
  icosahedronGeometry,
  icosahedronMaterial
);
scene.add(icosahedronPlanet);

const loader = new GLTFLoader();
loader.load(
  "textures/fw190_airplanecar.glb",
  function (gltf) {
    const model = gltf.scene;
    model.scale.set(0.003, 0.003, 0.003);
    model.position.set(4, -1, 0);
    scene.add(model);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// Iluminacao
const ambientLight = new THREE.AmbientLight(0x404040, 6); // Increased intensity
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 2, 100); // Increased intensity
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

// Set initial positions
earth.position.set(5, 0, 0);
moon.position.set(5.5, 0, 0);

// Loop de animacao
function animate() {
  requestAnimationFrame(animate);

  // Rotaciona o sol
  sun.rotation.y += 0.005;

  earth.position.x = 5 * Math.cos(Date.now() * 0.001);
  earth.position.z = 5 * Math.sin(Date.now() * 0.001);

  moon.position.x = earth.position.x + 0.9 * Math.cos(Date.now() * 0.002);
  moon.position.z = earth.position.z + 0.9 * Math.sin(Date.now() * 0.002);

  mars.position.x = 9 * Math.cos(Date.now() * 0.0005);
  mars.position.z = 9 * Math.sin(Date.now() * 0.0005);

  cubePlanet.position.x = 3 * Math.cos(Date.now() * 0.001);
  cubePlanet.position.z = 3 * Math.sin(Date.now() * 0.001);

  icosahedronPlanet.position.x =
    earth.position.x + 1.5 * Math.cos(Date.now() * 0.001);
  icosahedronPlanet.position.z =
    earth.position.z + 1.5 * Math.sin(Date.now() * 0.001);

  controls.update();
  renderer.render(scene, camera);
}

// Posicao da camera
camera.position.set(5, 5, 8);
camera.lookAt(0, 0, 0);

animate();
