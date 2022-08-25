// позиция мыши
let deltaPositionMouseY = 0, lastDeltaPositionMouseY, deltaPositionMouseX = 0, lastDeltaPositionMouseX, deltaPositionMouseZ = 0.01, lastDeltaPositionMouseZ;
defaultZoom = 5, stopMove = false, stopAllTransform = false;

// размеры окна
const windowInnerWidth = window.innerWidth, windowInnerHeight = window.innerHeight,
halfWindowInnerWidth = windowInnerWidth / 2, halfWindowInnerHeight = windowInnerHeight / 2,

// пременные для сцены
viewDegrees = 75, // оптимальное значение
scene = new THREE.Scene(), 
camera = new THREE.PerspectiveCamera( viewDegrees, windowInnerWidth / windowInnerHeight, 0.1, 1000 ),
renderer = new THREE.WebGLRenderer();

renderer.setSize( windowInnerWidth, windowInnerHeight );

document.body.appendChild( renderer.domElement );	

// создание объекта
const geometry = new THREE.BoxGeometry( 1, 1, 1. );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube1 = new THREE.Mesh( geometry, material );
const cube2 = new THREE.Mesh( geometry, material );
const cube3 = new THREE.Mesh( geometry, material );
const cube4 = new THREE.Mesh( geometry, material );
cube1.position.x = -2;
cube1.position.y = 0;
cube1.position.z = 0;

cube2.position.x = -2;
cube2.position.y = 0;
cube2.position.z = 2;

cube3.position.x = 2;
cube3.position.y = 0;
cube3.position.z = 2;

cube4.position.x = 2;
cube4.position.y = 0;
cube4.position.z = 0;
scene.add( cube1 );
scene.add( cube2 );
scene.add( cube3 );
scene.add( cube4 );

// работа с камерой 	
camera.position.z = defaultZoom;
function setMousePosition (event) {
	// приводим к нулю
	deltaPositionMouseY = ( event.clientX - halfWindowInnerWidth ) / 90 / 1000;
	deltaPositionMouseX = ( event.clientY - halfWindowInnerHeight ) / 90 / 1000;
}
function RotateCamera (deltaPositionMouseX, deltaPositionMouseY) {
	// меняем местами radianRotate, чтобы убрать инверсию мыши 
	camera.rotation.x -= deltaPositionMouseX;
	camera.rotation.y -= deltaPositionMouseY;
}

function MoveCamera (deltaPositionMouseX , deltaPositionMouseY) {
	// "-" - инверсия по X
	camera.position.x += deltaPositionMouseY;
	camera.position.y -= deltaPositionMouseX;
	camera.position.z -= deltaPositionMouseZ;
}

function setZoom (event) {
	let delta = Math.sign(event.deltaY);
	camera.position.z += delta;
}
// отвечает за разрешение движения
function setStopMove () {
	stopMove = !stopMove;
}
// отвечает за оставку всего движения
function setStopAllTransform () {
	stopAllTransform = true;
}
function setRigthAllTransform () {
	stopAllTransform = false;
}
// метод собирает все измения transform  
function transform () {
	if (!stopAllTransform) {
		RotateCamera(deltaPositionMouseX, deltaPositionMouseY)
		if (!stopMove) {
			MoveCamera(deltaPositionMouseX, deltaPositionMouseY);
		}
	}
}
// рендер
function animate() {
	transform();
	
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();

// считываем позицию мыши
document.addEventListener('mousemove', setMousePosition);
// регулирование зума
document.addEventListener('wheel', setZoom);
// остановка / возобновления движения
document.addEventListener('click', setStopMove);
document.addEventListener('mouseout', setStopAllTransform);
document.addEventListener('mouseover', setRigthAllTransform);