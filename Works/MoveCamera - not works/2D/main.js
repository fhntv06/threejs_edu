// позиция мыши
let positionMouseY = 0, positionMouseX = 0, deltaPositionMouseY = 0, deltaPositionMouseX = 0, degreeZ = 0, defaultZoom = 10, deltaZoom = 0, stopMove = false, stopAllTransform = false, kDxSpeedX = 0, kDxSpeedY = 0;

// размеры окна
windowInnerWidth = window.innerWidth, windowInnerHeight = window.innerHeight,
halfWindowInnerWidth = windowInnerWidth / 2, halfWindowInnerHeight = windowInnerHeight / 2,


// пременные для сцены
viewDegrees = 75, // оптимальное значение
scene = new THREE.Scene(), 
camera = new THREE.PerspectiveCamera( viewDegrees, windowInnerWidth / windowInnerHeight, 0.1, 1000 ),
renderer = new THREE.WebGLRenderer();

// приводим к координате (0, 0)	
camera.position.z = defaultZoom;
// camera.position.x = defaultZoom - 5;
// camera.position.y = defaultZoom - 3;
// camera.rotation.x = -0.55;
// camera.rotation.y = 0.33;

renderer.setSize( windowInnerWidth, windowInnerHeight );

document.body.appendChild( renderer.domElement );	

// создание куба
const geometry = new THREE.BoxGeometry( .5, .5, .5 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
cube.position.x = 0;
cube.position.y = 0;
cube.position.z = 0;
scene.add( cube );

// создание линий
// линия по оси X
const materialLineAxisX = new THREE.LineBasicMaterial( { color: 'red' } );
const pointsLineAxisX = [];
pointsLineAxisX.push( new THREE.Vector3( 0, 0, 0 ) );
pointsLineAxisX.push( new THREE.Vector3( 20, 0, 0 ) );
const geometryLineAxisX = new THREE.BufferGeometry().setFromPoints( pointsLineAxisX );
const lineAxisX = new THREE.Line( geometryLineAxisX, materialLineAxisX );
scene.add( lineAxisX );

// линия по оси Y
const materialLineAxisY = new THREE.LineBasicMaterial( { color: 'green' } );
const pointsLineAxisY = [];
pointsLineAxisY.push( new THREE.Vector3( 0, 0, 0 ) );
pointsLineAxisY.push( new THREE.Vector3( 0, 20, 0 ) );
const geometryLineAxisY = new THREE.BufferGeometry().setFromPoints( pointsLineAxisY );
const lineAxisY = new THREE.Line( geometryLineAxisY, materialLineAxisY );
scene.add( lineAxisY );

// линия по оси Z
const materialLineAxisZ = new THREE.LineBasicMaterial( { color: 'blue' } );
const pointsLineAxisZ = [];
pointsLineAxisZ.push( new THREE.Vector3( 0, 0, 0 ) );
pointsLineAxisZ.push( new THREE.Vector3( 0, 0, 20 ) );
const geometryLineAxisZ = new THREE.BufferGeometry().setFromPoints( pointsLineAxisZ );
const lineAxisZ = new THREE.Line( geometryLineAxisZ, materialLineAxisZ );
scene.add( lineAxisZ );

function setMousePosition (event) {
	positionMouseX = event.clientX - halfWindowInnerWidth;
	positionMouseY = event.clientY - halfWindowInnerHeight;
	
	deltaPositionMouseY = positionMouseY / 10000;
	deltaPositionMouseX = positionMouseX / 10000;
}
function RotateCube (deltaPositionMouseX, deltaPositionMouseY) {
	// меняем местами radianRotate, чтобы убрать инверсию мыши 
	degreeZ = cube.rotation.z / Math.PI * 180;

	cube.rotation.z = degreeZ;

	// console.log('deltaPositionMouseX ', deltaPositionMouseX)
	// console.log('deltaPositionMouseY ', deltaPositionMouseY)
}

function MoveCube (deltaPositionMouseX , deltaPositionMouseY) {
	// два коэффициента на 1 на увеличение и 1 на уменьшение скорости по вектору в зависимости от градуса поворота
	
	// находим % от "длины вектора направления движения": max = 1, min = 0;
	// kDxSpeedZ = degreeZ / 90;
	console.log('deltaPositionMouseX ', deltaPositionMouseX)
	
	if ( deltaPositionMouseX >= cube.position.x ) {
		cube.position.x += deltaPositionMouseX;
		console.log('cube.position.x ', cube.position.x)
		console.log('deltaPositionMouseX ', deltaPositionMouseX)
	}
	// cube.position.y -= kDxSpeedY;
}

function setZoom (event) {
	deltaZoom = Math.sign(event.deltaY); // +1 или -1
	camera.position.z += deltaZoom;
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
		RotateCube(deltaPositionMouseX, deltaPositionMouseY)
		if (!stopMove) {
			MoveCube(deltaPositionMouseX, deltaPositionMouseY);
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