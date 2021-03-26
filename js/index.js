function random(min, max) {
    return min + Math.random() * (max - min);
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: 'high-performance'
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMapEnabled = true;
document.body.appendChild(renderer.domElement);

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.minPolarAngle = Math.PI / 2 - 0.6;
controls.maxPolarAngle = Math.PI / 2 + 0.1;
// controls.enableZoom = false;
controls.target.y = 2;

const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(0, 10, 5);
pointLight.castShadow = true;
pointLight.shadow.bias = 0.01;
scene.add(pointLight);

const textureLoader = new THREE.TextureLoader();

function addBox(imageUrl, index) {
    const texture = textureLoader.load(imageUrl);
    const geometry = new THREE.BoxGeometry(5, 5, 0.2);
    const material = new THREE.MeshLambertMaterial({ color: 0xffffff, map: texture });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.setFromCylindricalCoords(8, -Math.PI * 2 + index * .75, 2.5);
    cube.lookAt(0, 2, 0);
    cube.castShadow = true;
    cube.recieveShadow = true;
    scene.add(cube);

    const lookAtPosition = new THREE.Vector3(0, 2, 0);
    lookAtPosition.lerp(cube.position, 0.3);
    controls.target.copy(lookAtPosition);
}

var photos = ['copenhagen', 'hana', 'creek', 'kamaole', 'utah', 'yosemite', 'italia', 'london', 'snow']

for (let i = 0; i < 10; i++) {
    addBox(`img/${photos[i]}.jpg`, i)
}

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

