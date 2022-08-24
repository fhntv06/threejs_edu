const setVolumeObject = document.querySelector('#setVolumeObject'),
onSin = document.querySelector('#onSin'),
arrayELements = document.querySelectorAll('.container section div'), 
degree360 = 360, 
arrayObjectOnScene = [], 
degreeYStart = -90, degreeYEnd = 90,
degreeXStart = 0, degreeXEnd = 180,
arrayColorsSomething = [
    {color: '#f44336'},
    {color: '#e91e63'},
    {color: '#673ab7'},
    {color: '#3f51b5'},
    {color: '#2196f3'},
    {color: '#03a9f4'},
    {color: '#4caf50'},
    {color: '#cddc39'},
    {color: '#ff9800'}
],
arrayColorsRainbow = [
    {color: '#f44336'},
    {color: '#ff9800'},
    {color: '#ffeb3b'},
    {color: '#4caf50'},
    {color: '#03a9f4'},
    {color: '#10568d'},
    {color: '#673ab7'},
];

let stepX, 
stepDegreeY = ( Math.abs(degreeYStart) + degreeYEnd ) / degreeYEnd, 
stepDegreeX = ( degreeXStart + degreeXEnd ) / degreeXEnd, 
degreeY = 0,
degreeX = 0,  
object, 
arrayPositions = [], 
setting = {};

// при запуске
localStorageSettings();

for (let i = 0; i < arrayELements.length; i++) {
    for (let k = 0; k < arrayELements[i].children.length; k++) {
        if ( arrayELements[i].children[k].getAttribute('type') === 'text' ) {
            arrayELements[i].children[k].addEventListener('change', (e) => {
                setting[arrayELements[i].children[k].parentElement.className] = +e.target.value;
                arrayELements[i].children[0].value = +e.target.value;
                updateScene();
            });
        }
    
        if ( arrayELements[i].children[k].getAttribute('type') === 'range' ) {
            arrayELements[i].children[k].addEventListener('input', (e) => {
                setting[arrayELements[i].children[k].parentElement.className] = +e.target.value;
                arrayELements[i].children[1].value = +e.target.value;
                updateScene();
            });
        }
    }
}

onSin.addEventListener('click', () => {

})

// запись данных в localStorage
setVolumeObject.addEventListener('click', () => {
    if (localStorage.setting) {
        delete localStorage.setting;
    }
    localStorage.setItem('setting', JSON.stringify(setting));
})

// измение переметров
function updateScene() {
    // пересчет начальных значений
    stepX = ( Math.abs(setting.leftBorderX) +  Math.abs(setting.rigthBorderX) ) / setting.volumeObject;

    // очистка объектов
    if (arrayObjectOnScene.length !== 0) {
        for(let i = 0; i < arrayObjectOnScene.length; i++ ) {
            removeObject(arrayObjectOnScene[i]);
        }
    }
    
    // рендер объектов
    for (let i = 0; i < setting.volumeObject; i++) {
        renderObject(i);
    }
}

function localStorageSettings() {
    if (localStorage.setting) {
        setting = JSON.parse(localStorage.getItem('setting'))

        // перезапись значений
        for (let i = 0; i < arrayELements.length; i++) {
            for (let k = 0; k < arrayELements[i].children.length; k++) {
                arrayELements[i].children[0].value = +setting[arrayELements[i].children[k].parentElement.className];
                arrayELements[i].children[1].value = +setting[arrayELements[i].children[k].parentElement.className];
            }
        }
    } else {
        setting = {
            changeCoordsAxisY: 0,
            changeCoordsAxisX: 0,
            heightGraph: 1,
            rigthBorderX: 2,
            leftBorderX: -2,
            volumeObject: 351,
            sizeObject: 5
        }
    }
}
function removeObject (object) {
    scene.remove(object);
}

function calculatePosition (degreeY, degreeX) {
    return [Math.sin(degreeY * Math.PI / 180), Math.cos(degreeX * Math.PI / 180)]
}

function transform (object, indexObject) {
    
    degreeY += stepDegreeY;
    degreeX += stepDegreeX;
    
    const arrayPositions =  calculatePosition(degreeY, degreeX);
    object.position.y = arrayPositions[0] * setting.heightGraph + setting.changeCoordsAxisY;
}

function setParametersObject(indexObject) {
    return [
        new THREE.BoxGeometry(setting.sizeObject / 2, setting.sizeObject / 2, setting.sizeObject / 2),
        new THREE.MeshBasicMaterial( arrayColorsRainbow[indexObject])
    ]
}

function renderObject(indexObject) {
    let arrayParametersObject = setParametersObject(indexObject % 7)
    object = new THREE.Mesh(arrayParametersObject[0], arrayParametersObject[1]);
    object.position.x = ( stepX * indexObject ) + setting.leftBorderX + setting.changeCoordsAxisX;

    // для синусоиды
    // object.position.x = (stepX * indexObject) + setting.leftBorderX + setting.changeCoordsAxisX;
    // для круга
    // object.position.y = arrayPositions[0];
    // object.position.x = arrayPositions[1];
    
    arrayObjectOnScene.push(object)
    
    scene.add(object);
}
function animate() {
    for(let i = 0; i < arrayObjectOnScene.length; i++ ) {
        transform(arrayObjectOnScene[i], i);
    }
	
    requestAnimationFrame(animate);
	renderer.render(scene, camera);
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.domElement.canvas = window.innerWidth;
renderer.domElement.offsetHeight = window.innerHeight;

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

for (let i = 0; i < setting.volumeObject; i++) {
	renderObject(i);
}

camera.position.z = 10;


animate();