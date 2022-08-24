const volumeObject = 4;

const arColor = [
	{
		color: 'plum'
	},
	{
		color: 'lime'
	},
	{
		color: 'thistle'
	},
	{
		color: 'tomato'
	}
]

const objectPositionOnAxis = [{
		x: -3,
		y: 1
	},
	{
		x: -3,
		y: -1
	},
	{
		x: 3,
		y: -1
	},
	{
		x: 3,
		y: 1
	},
]

let objectsOnScene = [];

const objectTransformParameters = {
	rotation: 'rotation',
	position: 'position'
};
const objectAxis = {
	x: 'x',
	y: 'y',
	z: 'z',
};

function setObjectParams(index) {
	let objectParams = {
		transform: {
			parameter: objectTransformParameters.rotation,
			axis: [objectAxis.y, objectAxis.x],
		},
		size: {
			width: Math.random(2),
			height: Math.random(2),
			depth: Math.random(2)
		},
		color: arColor[index],
		speed: Math.random()
	}

	return objectParams;
}

function renderObject(index) {
	// добавление свойств в объект
	let objectParams = setObjectParams(index);
	// геометрия
	const geometry = new THREE.BoxGeometry(objectParams.size.width, objectParams.size.height, objectParams.size.depth);
	// материал
	const material = new THREE.MeshBasicMaterial(objectParams.color);
	object = new THREE.Mesh(geometry, material);
	object.objectParams = objectParams;
	// изменение позиции
	object.position.x = objectPositionOnAxis[index].x;
	object.position.y = objectPositionOnAxis[index].y;

	objectsOnScene.push(object);
	// добавление объекта на сцену
	scene.add(object);
}

function animate() {
	for (let i = 0; i < objectsOnScene.length; i++) {
		transform(objectsOnScene[i]);
	}

	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}

// метод изменения положения
function transform(object) {
	// вращение
	let transform = object.objectParams.transform;
	let speed = object.objectParams.speed;
	for (let i = 0; i < transform.axis.length; i++) {
		object[transform.parameter][transform.axis[i]] += 0.1;
	}
}

// создание сцены
const scene = new THREE.Scene();
// создание камеры:  
// PerspectiveCamera - одна из 4х видов камер
// Параметры: ( [угол обзора], [соотношение сторон], [мин. расстояние для отображения], [макс. расстояние для отображения])
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// создание средства визуализации
const renderer = new THREE.WebGLRenderer();
// установка размера отображения
renderer.setSize(window.innerWidth, window.innerHeight);

for (let i = 0; i < volumeObject; i++) {
	renderObject(i);
}

// нужно отодвинуть камеру, потому что объекты создаются в одной точке
camera.position.z = 5;

// добавление canvas для рендера
document.body.appendChild(renderer.domElement);

// создание рендера объектов по средством метода requestAnimationFrame - бесконечный цикл с перерендером кадров
animate();