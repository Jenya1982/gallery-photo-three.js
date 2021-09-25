function random(min, max) {
    return min + Math.random() * (max - min);
}

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: 'high-performance'
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
document.body.appendChild(renderer.domElement); 

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.minPolarAngle = Math.PI / 2 - 0.6;
controls.maxPolarAngle = Math.PI / 2 + 0.1;
controls.target.y = 2;

const ambientLight = new THREE.AmbientLight(0x202020);
scene.add(ambientLight);
const hemiLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
hemiLight.color.setHSL(0.6, 1, 0.1);
hemiLight.groundColor.setHSL(0.1, 0.2, 0.1);
scene.add(hemiLight);
const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(0, 10, 5);
scene.add(pointLight);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('img/ground/wood.jpg');
const bgTexture = textureLoader.load('img/background/sky.jpg');
scene.background = bgTexture;

const groundGeo = new THREE.PlaneBufferGeometry(105, 105);
const groundMat = new THREE.MeshBasicMaterial( { color: 0xffffff, map: texture } );
groundMat.color.setHSL(0.095, 1, 0.75);
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

function addBox(imageUrl) {
    const texture = textureLoader.load(imageUrl);
    const geometry = new THREE.BoxGeometry(5, 5, 0.2);
    const material = new THREE.MeshLambertMaterial({ color: 0xffffff, map: texture });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.setFromCylindricalCoords(random(10, 20), random(-Math.PI * 2, Math.PI * 2), 2.5);
    cube.lookAt(0, 0, 0);
    scene.add(cube);
    const lookAtPosition = new THREE.Vector3(0, 2, 0);
    lookAtPosition.lerp(cube.position, 0.3);
    controls.target.copy(lookAtPosition);}

for (let i = 0; i < 10; i++) {
     addBox('img/images/strange_'+i+'.jpg')
}

camera.position.z = 5;
const animate = function () {
    requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );
};
animate(); 
