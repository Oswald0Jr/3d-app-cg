# Sistema Solar com Three.js
Este projeto é uma visualização de um sistema solar simples criado com a biblioteca Three.js. Ele inclui vários planetas orbitando ao redor do Sol, com diferentes tipos de geometrias e texturas. O projeto também utiliza iluminação básica e um modelo 3D externo.

# Requisitos
Node.js (para servir o projeto localmente)
Three.js
GLTFLoader (para carregar o modelo 3D)
Instalação
Clone o repositório:

bash
Copy code
git clone https://github.com/username/repository.git
cd repository
Instale as dependências:

Se você estiver usando npm, execute:

bash
Copy code
npm install
Se você estiver apenas servindo arquivos estáticos, você pode pular esta etapa.

Configure o ambiente:

Crie um arquivo index.html e cole o código abaixo:

html
Copy code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema Solar com Three.js</title>
    <style>
        body { margin: 0; }
        canvas { display: block; }
    </style>
</head>
<body>
    <script src="https://cdn.jsdelivr.net/npm/three@0.146.0/build/three.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.146.0/examples/jsm/controls/OrbitControls.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.146.0/examples/jsm/loaders/GLTFLoader.js"></script>
    <script src="app.js"></script>
</body>
</html>
Crie o arquivo app.js e cole o código abaixo:

javascript
Copy code
// Cena, câmera e renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controles de órbita
const controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.set(10, 5, 10);
controls.update();

// Sol
const sunGeometry = new THREE.SphereGeometry(1, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Terra
const earthGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg');
const earthMaterial = new THREE.MeshStandardMaterial({ map: earthTexture });
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earth);

// Lua
const moonGeometry = new THREE.SphereGeometry(0.2, 32, 32);
const moonTexture = textureLoader.load('https://threejs.org/examples/textures/planets/moon_1024.jpg');
const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTexture });
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
scene.add(moon);

// Marte
const marsGeometry = new THREE.SphereGeometry(0.4, 32, 32);
const marsTexture = textureLoader.load('https://threejs.org/examples/textures/planets/mars_1024.jpg');
const marsMaterial = new THREE.MeshStandardMaterial({ map: marsTexture });
const mars = new THREE.Mesh(marsGeometry, marsMaterial);
scene.add(mars);

// Planeta Cubo com Textura
const cubeGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
const cubeTexture = textureLoader.load('https://threejs.org/examples/textures/cube/Bridge2/Bridge2.jpg');
const cubeMaterial = new THREE.MeshStandardMaterial({ map: cubeTexture });
const cubePlanet = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cubePlanet);

// Planeta Icosaedro com Textura
const icosahedronGeometry = new THREE.IcosahedronGeometry(0.4, 0);
const icosahedronTexture = textureLoader.load('https://threejs.org/examples/textures/planets/jupiter.jpg');
const icosahedronMaterial = new THREE.MeshStandardMaterial({ map: icosahedronTexture });
const icosahedronPlanet = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
scene.add(icosahedronPlanet);

// Grupo para o modelo externo
const modelGroup = new THREE.Group();
scene.add(modelGroup);

// Carregar modelo externo (exemplo de bóia)
const loader = new GLTFLoader();
loader.load('src/models/fw190_airplanecar.glb', function (gltf) {
    const model = gltf.scene;
    model.scale.set(0.1, 0.1, 0.1);
    model.position.set(2, 0, 0); // Posição inicial relativa ao centro do grupo
    modelGroup.add(model);
}, undefined, function (error) {
    console.error('Erro ao carregar modelo:', error);
});

// Iluminação
const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 2, 100);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

// Posicionamento Inicial
earth.position.set(5, 0, 0);
moon.position.set(5.5, 0, 0);
mars.position.set(7, 0, 0); // Posição inicial de Marte
cubePlanet.position.set(5.7, 0, 0);
icosahedronPlanet.position.set(6.5, 0, 0); // Posição inicial do Icosaedro

// Loop de Animação
function animate() {
    requestAnimationFrame(animate);

    // Rotação do Sol
    sun.rotation.y += 0.005;

    // Órbita da Terra ao Redor do Sol
    earth.position.x = 5 * Math.cos(Date.now() * 0.001);
    earth.position.z = 5 * Math.sin(Date.now() * 0.001);

    // Órbita da Lua ao Redor da Terra
    moon.position.x = earth.position.x + 0.7 * Math.cos(Date.now() * 0.01);
    moon.position.z = earth.position.z + 0.7 * Math.sin(Date.now() * 0.01);

    // Órbita de Marte ao Redor do Sol
    mars.position.x = 7 * Math.cos(Date.now() * 0.0005);
    mars.position.z = 7 * Math.sin(Date.now() * 0.0005);

    // Órbita do Planeta Cubo ao Redor da Terra
    cubePlanet.position.x = earth.position.x + 1 * Math.cos(Date.now() * 0.01);
    cubePlanet.position.z = earth.position.z + 1 * Math.sin(Date.now() * 0.01);

    // Órbita do Planeta Icosaedro ao Redor da Terra
    icosahedronPlanet.position.x = earth.position.x + 1.5 * Math.cos(Date.now() * 0.008);
    icosahedronPlanet.position.z = earth.position.z + 1.5 * Math.sin(Date.now() * 0.008);

    // Órbita do Grupo (Modelo Externo) ao Redor do Sol
    modelGroup.position.x = 5 * Math.cos(Date.now() * 0.002);
    modelGroup.position.z = 5 * Math.sin(Date.now() * 0.002);

    controls.update();
    renderer.render(scene, camera);
}

// Redimensionamento da Janela
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Iniciar Animação
animate();
Estrutura do Projeto
index.html: Arquivo HTML que configura a página e inclui o script do Three.js e outros recursos.
app.js: Script principal que cria e anima a cena 3D.
`src/models/fw190_airplanec
