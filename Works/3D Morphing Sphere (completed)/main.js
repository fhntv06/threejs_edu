import { Scene, PerspectiveCamera, WebGLRenderer, Vector3, MeshNormalMaterial, Mesh, SphereGeometry, BoxGeometry, CylinderGeometry, Clock } from 'three/src/Three.js'
import openSimplexNoise from 'https://cdn.skypack.dev/open-simplex-noise';
import { OrbitControls } from "https://cdn.skypack.dev/three@0.133.1/examples/jsm/controls/OrbitControls.js";

// Scene
let scene = new Scene();
// Camera
let camera = new PerspectiveCamera( 75, innerWidth / innerHeight, 0.1, 1000 );
camera.position.set(1.5, -0.5, 6);
// Renderer
let renderer = new WebGLRenderer({antialias: true, alpha: true});
renderer.setSize( innerWidth, innerHeight );
const canvas = renderer.domElement;
// Append our renderer to the webpage. Basically, this appends the `canvas` to our webpage.
document.body.appendChild( canvas );

// Create our geometry
let sphereGeometry = new SphereGeometry(2, 100, 100);
// This section is about accessing our geometry vertices and their locations
// забираем все точки фигуры в массив
sphereGeometry.positionData = [];
let v3 = new Vector3();
// пушим в цикле все точки
for (let i = 0; i < sphereGeometry.attributes.position.count; i++){
    v3.fromBufferAttribute(sphereGeometry.attributes.position, i);
    sphereGeometry.positionData.push(v3.clone());
}

// A `normal` material uses the coordinates of an object to calculate its color
// вычисления цвета каждой вершины
let sphereMesh = new MeshNormalMaterial(
    {
        uniforms: {      
            colorA: {
                type: 'vec3', 
                value: new Vector3(0.5, 0.5, 0.5)
            },
        },
        vertexShader: document.getElementById('vertex').textContent,
        // fragmentShader: document.getElementById('fragment').textContent
    }
);

// Combine both, and add it to the scene.
let sphere = new Mesh(sphereGeometry, sphereMesh);
scene.add(sphere);

// создание шума - просто шум
let noise = openSimplexNoise.makeNoise4D(5);

// часы
let clock = new Clock();

// ресайз
window.addEventListener("resize", () => { 
    camera.aspect = innerWidth / innerHeight; 
    camera.updateProjectionMatrix(); 
    renderer.setSize(innerWidth, innerHeight)
});

// создания цикла анимации
renderer.setAnimationLoop( () => {
    // Get the time
	let t = clock.getElapsedTime();
    sphereGeometry.positionData.forEach((p, idx) => {
        // Create noise for each point in our sphere
        let setNoise = noise(p.x / 2, p.y / 2, p.z / 2, t * .5);
        // Using our Vector3 function, copy the point data, and multiply it by the noise
        // this looks confusing - but it's just multiplying noise by the position at each vertice
        v3.copy(p).addScaledVector(p, setNoise);
        // Update the positions
        // установка координат
        sphereGeometry.attributes.position.setXY(idx, v3.x, v3.y, v3.z);
    })
    // Some housekeeping so that the sphere looks "right"
    sphereGeometry.computeVertexNormals();
    sphereGeometry.attributes.position.needsUpdate = true;
    // Render the sphere onto the page again.
    // рисования сцены
	renderer.render(scene, camera);
})


new OrbitControls(camera, canvas);

// сброс стилей и атрибутов
canvas.classList.add('canvas');
canvas.style = null;
canvas.removeAttribute('width');
canvas.removeAttribute('height');