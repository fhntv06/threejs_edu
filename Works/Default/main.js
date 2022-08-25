const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );	

// куб
// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const materialCube = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, materialCube );
// scene.add( cube );

camera.position.set( 0, 0, 100 );
camera.lookAt( 0, 0, 0 );

// линия
const materialLine = new THREE.LineBasicMaterial( { color: 0x0000ff } );
const points = [];
points.push( new THREE.Vector3( -10, 10, 0 ) );
points.push( new THREE.Vector3( 0, 10, 0 ) );
points.push( new THREE.Vector3( 0, 0, 0 ) );
points.push( new THREE.Vector3( -10, 0, 0 ) );
points.push( new THREE.Vector3( -10, 10, 0 ) );


// renderer.render( scene, camera );
function animate() {
	for (let i = 0; i < points.length; i++) {
		points[i].x = Math.random() * 100;
		points[i].y = Math.random() * 100;
	}
	const geometry = new THREE.BufferGeometry().setFromPoints( points );
	const line = new THREE.Line( geometry, materialLine );
	scene.add( line );

	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();