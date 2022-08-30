const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );	

// куб
const geometryCube = new THREE.BoxGeometry( 1, 1, 1 );
const materialCube = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometryCube, materialCube );
cube.position.x = 5;
scene.add( cube );

// сфера
const geometrySphere = new THREE.SphereGeometry( 1, 32, 16 );
const materialSphere = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const sphere = new THREE.Mesh( geometrySphere, materialSphere );
sphere.position.x = -5;
scene.add( sphere );


camera.position.z = 20;
camera.position.x = -3;
camera.position.y = 5;
camera.rotation.x = -0.2;
camera.rotation.y = -0.1;

const kRotation = 0.01;
function transform () {
	sphere.rotation.x += kRotation;
	sphere.rotation.y += kRotation;

	cube.rotation.x += kRotation;
	cube.rotation.y += kRotation;
}

function animate() {
	transform();
	
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();