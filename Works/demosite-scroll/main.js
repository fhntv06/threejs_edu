import * as THREE from './node_modules/three/build/three.module.js';
// import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader';

// import { OrbitControls } from "https://cdn.skypack.dev/three@0.133.1/examples/jsm/controls/OrbitControls.js";


let trueForward = false, k, destroy = false;

const Scene = new THREE.Scene();
const spaceTexture = new THREE.TextureLoader().load('./images/space.jpg')

const Camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
const renderer = new THREE.WebGLRenderer();

const ambientLight = new THREE.AmbientLight(0xffffff);
const earthTexture = new THREE.TextureLoader().load('./images/earth.jpg');
const earthDestroyTexture = new THREE.TextureLoader().load('./images/destroy.jpg');
const sunTexture = new THREE.TextureLoader().load('./images/destroy.jpg');
const earth = new THREE.Mesh(
    new THREE.SphereGeometry(60, 64, 64),
    new THREE.MeshStandardMaterial({
        map: earthTexture
    })
);
const earthDestroy = new THREE.Mesh(
    new THREE.SphereGeometry(10, 64, 64),
    new THREE.MeshStandardMaterial({
        map: earthDestroyTexture
    })
);

const sun = new THREE.Mesh(
    new THREE.SphereGeometry(100, 64, 64),
    new THREE.MeshStandardMaterial({
        map: sunTexture
    })
);

const meteoritTexture = new THREE.TextureLoader().load('./images/meteorit.jpg');
const meteoritGeometry = new THREE.SphereGeometry(1, 32, 32);
const meteoritMaterial = new THREE.MeshStandardMaterial({ map: meteoritTexture});
const meteorit = new THREE.Mesh(meteoritGeometry, meteoritMaterial);

// добавление модели + вращение
// const loader = new THREE.GLTFLoader();
// loader.load(
//     './models/meteorit/scene.gltf', 
//     function ( gltf ) {
//         const root = gltf.scene;
// 	    Scene.add( root );
//     },
//     (xhr) => {
//         console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
//     },
//     function ( error ) {
//         console.error( error + ' An error happened');
//     }
// );

function sceneAdd() {
    Scene.add(ambientLight);
    Scene.add(meteorit);
    Scene.add(earth);
    Scene.add(earthDestroy);
    Scene.add(sun);
}

// Создание звезд в рандомных местах
function addStar() {
    const geometry = new THREE.SphereGeometry(0.1, 16, 16);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff});
    const star = new THREE.Mesh(geometry, material);

    const x = THREE.MathUtils.randFloatSpread(500);
    const y = THREE.MathUtils.randFloatSpread(90);
    const z = THREE.MathUtils.randFloatSpread(1000);
    // randFloatSpread - встроенный метод ThreeJS

    star.position.set(x, y, z);
    Scene.add(star);
}
Array(1000).fill().forEach(addStar); // создание массива на 200 звезд -> заполняем массив -> запуск addStar столько раз сколько элементов
function animationeEarth() {
    earth.rotation.x += 0.0008;
    earth.rotation.y += 0.0008;
    earth.rotation.z += 0.0008;
}

function animationeMeteorit() {
    meteorit.rotation.x += 0.0011;
    meteorit.rotation.y += 0.0011;
    meteorit.rotation.z += 0.0011;
}

function animation() {
    requestAnimationFrame(animation);

    animationeEarth();
    animationeMeteorit();

    renderer.render(Scene, Camera);
}

// этап со скроллом
document.body.onscroll = scrollHandler;
function scrollHandler() {
    const topPositionInBody = document.body.getBoundingClientRect().top;

    console.log(topPositionInBody);
    
    if (topPositionInBody > -2500) {
        Camera.position.z = topPositionInBody * 0.1;
        Camera.position.x = (-10 * (window.innerWidth / 100)) - (topPositionInBody / 10);
    } 

    if (Math.abs(topPositionInBody) < 3800 || trueForward) {
        if (trueForward) {
            if (destroy) {
                meteorit.position.z = (topPositionInBody + 1000) * 0.09;
            } else {
                if (Math.abs(topPositionInBody) > 5400) {
                    document.querySelector('.brus').classList.add('active');
                    document.querySelector('.protect').classList.add(".active");
                }
                if (Math.abs(topPositionInBody) > 7800) {
                    document.querySelector('.brus').classList.remove('active');
                }
            }
        } else {
            meteorit.position.z = topPositionInBody * 0.09;
        }
    }

    if (Math.abs(topPositionInBody) > 4900 && !trueForward) {
        document.body.style.overflow = 'hidden';
        document.querySelector('#modal').classList.add('active');
    } else {
        document.querySelector('#modal').classList.remove('active');
    }

    if (Math.abs(topPositionInBody) > window.innerHeight * 0.1) {
        document.querySelector('.header__inner').classList.add('active');
        document.querySelector('.header__inner').classList.remove('de--active');
    } else {
        document.querySelector('.header__inner').classList.remove('active');
        document.querySelector('.header__inner').classList.add('de--active');
    }

    if (Math.abs(topPositionInBody) > 5850) {
        if (destroy) {
            Scene.remove(earth);
            earthDestroy.scale.x = -1 * (topPositionInBody / 1000);
            earthDestroy.scale.y = -1 * (topPositionInBody / 1000);
            earthDestroy.scale.z = -1 * (topPositionInBody / 1000);
        } 

        Scene.remove(meteorit);
    }

    console.log(earthDestroy.position.x);
    console.log(earthDestroy.position.y);
    console.log(earthDestroy.position.z);

    console.log(earthDestroy.scale.x);
    console.log(earthDestroy.scale.y);
    console.log(earthDestroy.scale.z);
}

function init() {
    Scene.background = spaceTexture;
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 0);
    document.body.appendChild(renderer.domElement);
    
    meteorit.position.z = -10;
    meteorit.scale.x = 15;
    meteorit.scale.y = 7;
    meteorit.scale.z = 7;

    earth.position.z = -500;
    earthDestroy.position.z = -500;

    sun.position.z = -4900;

    Camera.position.x = -10 * (window.innerWidth / 100);
    Camera.position.y = -15;

    sceneAdd();
    animation();
}

init();

function button(event) {
    trueForward = true;
    document.body.style.overflow = 'auto';
    document.querySelector('#modal').classList.remove('active');

    if (event.target.getAttribute('id') === 'yes') {
        document.querySelector('.huston').insertAdjacentHTML('beforeend', '<p>- Хъюстон, Брюс выехал!</p>');
        destroy = false;
    }
    if (event.target.getAttribute('id') === 'no') {
        document.querySelector('.huston').insertAdjacentHTML('beforeend', '<p>- Хъюстон, нам ******!</p>');
        destroy = true;
    }
}
document.querySelector('#yes').addEventListener('click', button);
document.querySelector('#no').addEventListener('click', button);

