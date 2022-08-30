// позиция мыши
let positionMouseY = 0, positionMouseX = 0, deltaPositionMouseY = 0, deltaPositionMouseX = 0, deltaPositionMouseZ = 0.01, degreeY = 0, degreeX = 0, defaultZoom = 200, deltaZoom = 0, stopMove = false, stopAllTransform = false, kDxSpeedX, kDxSpeedY, kDxSpeedZ, setRotateObject = false,

myObj = null;

// размеры окна
const volumeCubes = 1,
windowInnerWidth = window.innerWidth, windowInnerHeight = window.innerHeight,
halfWindowInnerWidth = windowInnerWidth / 2, halfWindowInnerHeight = windowInnerHeight / 2,

arrayPositionsCubes = [
	{
		x: -71,
		y: 0,
		z: 25
	},
	{
		x: -71,
		y: 115,
		z: 30
	},
	{
		x: 62,
		y: 115,
		z: 30
	},
	{
		x: 62,
		y: 0,
		z: 30
	}
],

// пременные для сцены
viewDegrees = 75, // оптимальное значение
scene = new THREE.Scene(), 
camera = new THREE.PerspectiveCamera( viewDegrees, windowInnerWidth / windowInnerHeight, 0.1, 20000 ),
renderer = new THREE.WebGLRenderer();

renderer.setSize( windowInnerWidth, windowInnerHeight );

document.body.appendChild( renderer.domElement );	

// создание объектов
function renderCubes (cubePosition) {
	const geometry = new THREE.BoxGeometry( 1, 1, 1);
	const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	const cube = new THREE.Mesh( geometry, material );
	cube.position.x = cubePosition.x;
	cube.position.y = cubePosition.y;
	cube.position.z = cubePosition.z;
	scene.add( cube );
}
arrayPositionsCubes.forEach((cubePosition, index) => {renderCubes(cubePosition)})

// фон
const geometryFon = new THREE.BoxGeometry( 2000, 2000, 0.1);
const materialFon = new THREE.MeshBasicMaterial( { color: 0xffffff } );
const cubeFon = new THREE.Mesh( geometryFon, materialFon );
cubeFon.position.x = 0;
cubeFon.position.y = 0;
cubeFon.position.z = -150;
scene.add( cubeFon );

// работа с камерой 	
camera.position.z = defaultZoom;

function setMousePosition (event) {
	// приводим к координате (0, 0)
	positionMouseX = event.clientX - halfWindowInnerWidth;
	positionMouseY = event.clientY - halfWindowInnerHeight;
	
	deltaPositionMouseY = positionMouseY / 10000;
	deltaPositionMouseX = positionMouseX / 10000;
}
function RotateCamera (deltaPositionMouseX, deltaPositionMouseY) {
	// меняем местами radianRotate, чтобы убрать инверсию мыши 
	degreeY = camera.rotation.y / Math.PI * 180;
	degreeX = camera.rotation.x / Math.PI * 180;

	camera.rotation.x = deltaPositionMouseY;
	camera.rotation.y = deltaPositionMouseX;
	


	// на прямую передавать значения положения мыши в position нельзя
	// нужно придумать чтобы была сумма предыдущего состояния (направления) и следующего
	// нужно сохранять предыдущее состояние до его изменения
	
	// console.log('degreeY ', degreeY);
	// console.log('degreeX ', degreeX);

	// сброс градусов
	if ( Math.abs(degreeY) > 360) {
		camera.rotation.y = 0;
	}
	if(  Math.abs(degreeX) > 360) {
		camera.rotation.x = 0;
	}
}

function MoveCamera (deltaPositionMouseX , deltaPositionMouseY) {
	// два коэффициента на 1 на увеличение и 1 на уменьшение скорости по вектору в зависимости от градуса поворота
	
	// находим % от "длины вектора направления движения": max = 1, min = 0;
	kDxSpeedX = degreeX / 90;
	kDxSpeedY = degreeY / 90;
	kDxSpeedZ = 1 - kDxSpeedX - kDxSpeedY;
	
	// работает не так
	
	camera.position.x = deltaPositionMouseX;
	camera.position.y = deltaPositionMouseY;
	// camera.position.z -= deltaPositionMouseZ * kDxSpeedZ;
}

// центр координате
function renderCenterCoordinate () {
	let geometry = null;
	let material = null;
	let line = null;

	const pointsX = [];
	pointsX.push( new THREE.Vector3( -100, 0, -20 ) );
	pointsX.push( new THREE.Vector3( 0, 0, 0 ) );

	const pointsY = [];
	pointsY.push( new THREE.Vector3( 0, 150, -20 ) );
	pointsY.push( new THREE.Vector3( 0, 0, 0 ) );

	const pointsZ = [];
	pointsZ.push( new THREE.Vector3( 0, 0, 50 ) );
	pointsZ.push( new THREE.Vector3( 0, 0, -20 ) );

	const pointsArrowLeft = [];
	pointsArrowLeft.push( new THREE.Vector3( -110, 25, 0 ) );
	pointsArrowLeft.push( new THREE.Vector3( -90, 0, 0 ) );
	pointsArrowLeft.push( new THREE.Vector3( -110, -25, 0 ) );

	const pointsArrowRight = [];
	pointsArrowRight.push( new THREE.Vector3( 110, 25, 0 ) );
	pointsArrowRight.push( new THREE.Vector3( 90, 0, 0 ) );
	pointsArrowRight.push( new THREE.Vector3( 110, -25, 0 ) );

	const points = [
		{
			points: pointsX,
			color: {color: 'red'}
		},
		{
			points: pointsY,
			color: {color: 'green'}
		},
		{
			points: pointsZ,
			color: {color: 'blue'}
		},
		{
			points: pointsArrowLeft,
			color: {color: 'orange'}
		},
		{
			points: pointsArrowRight,
			color: {color: 'orange'}
		}
	]

	points.forEach(pointsAxis => {
		geometry = new THREE.BufferGeometry().setFromPoints( pointsAxis.points );
		material = new THREE.LineBasicMaterial( pointsAxis.color );
		line = new THREE.Line( geometry, material );
		scene.add( line );
	});

}
renderCenterCoordinate();

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

function permissionRotateObject () {
	setRotateObject = !setRotateObject;
}
// метод собирает все измения transform  
function transform () {
	if (!stopAllTransform) {
		RotateCamera(deltaPositionMouseX, deltaPositionMouseY)
		if (!stopMove) {
			MoveCamera(deltaPositionMouseX, deltaPositionMouseY);
		}
	}

	if (setRotateObject) {
		if (myObj) {
			myObj.rotation.y += deltaPositionMouseX;
			// myObj.rotation.x += deltaPositionMouseY;
		}
	}
}

// свет
const colorLight = '0xFFFFFF';
const lightTopLeftBack = new THREE.DirectionalLight( colorLight, 0.5);
const lightTopRightBack = new THREE.DirectionalLight( colorLight, 0.5);
const lightTopLeftForward = new THREE.DirectionalLight( colorLight, 0.3);
const lightTopRightForward = new THREE.DirectionalLight( colorLight, 0.3);

// const helper = new THREE.DirectionalLightHelper( light, 50 );
lightTopRightBack.position.set( 1, 1, -1 ).normalize();
lightTopRightForward.position.set( 1, 1, 1 ).normalize();
lightTopLeftForward.position.set( -1, 1, 1 ).normalize();
scene.add( lightTopLeftBack );
scene.add( lightTopLeftForward );
scene.add( lightTopRightBack );
scene.add( lightTopRightForward );

const GLTFLoader = new THREE.GLTFLoader();
GLTFLoader.load(
    './gltf/TR_final.gltf', 
	// './fbx/head-optimized.fbx', только с загрузчиком fbx
    function ( gltf ) {
		myObj = gltf.scene;
	    scene.add( gltf.scene );
		myObj.position.y = -30;
	},
    (xhr) => {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    function ( error ) {
        console.error( error + ' An error happened');
    }
);

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

document.addEventListener('mousedown', permissionRotateObject)
document.addEventListener('mouseup', permissionRotateObject)