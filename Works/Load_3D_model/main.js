const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
camera.position.set( 0, 0, 20 );

const scene = new THREE.Scene();
const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );

const geometryCube = new THREE.BoxGeometry( 100, 100, 0.1 );
const materialCube = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometryCube, materialCube );
cube.position.z = -10;
scene.add( cube );

// добавление модели + вращение
const loader = new THREE.GLTFLoader();
console.log(loader)
loader.load(
    './gLB/TR.glb', 
    function ( gltf ) {
        console.log(gltf);
	    scene.add( gltf.scene );
        gltf.asset;
    },
    (xhr) => {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    function ( error ) {
        console.error( error + ' An error happened');
    }
);

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();