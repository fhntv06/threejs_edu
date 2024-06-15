// ссылка на источник: https://highload.today/blogs/react-v-3d-kak-ispolzovat-react-three-fiber/

import React from "react";
import { GLTFLoader } from '../../libs/GLTFLoader.js';
import Stats from '../../../node_modules/three/examples/jsm/libs/stats.module.js';
import {
    WebGLRenderer,
    PerspectiveCamera,
    Scene,
    DirectionalLight,
    DirectionalLightHelper,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
    AxesHelper,
    AmbientLight,
} from '../../libs/three.module.js';
import { OrbitControls } from "https://cdn.skypack.dev/three@0.133.1/examples/jsm/controls/OrbitControls.js";

export default class Model extends React.Component {
    constructor(props) {
        super(props)
      }

      loaderHandler () {
        const modelWrapper = document.getElementById('model');
        const renderer = new WebGLRenderer();
        const scene = new Scene();
        const loader = new GLTFLoader();
        const axesHelper = new AxesHelper(25);
        const directionalLight = new DirectionalLight( 'red', 0.5);
        const ambientLight = new AmbientLight('gray', 0.5); 
        const helper = new DirectionalLightHelper( directionalLight, 5 );
        const cube = new Mesh(
            new BoxGeometry( 1, 1, 1 ),
            new MeshBasicMaterial( { color: 'white' } )
        );
        const canvas = renderer.domElement;
        const camera = new PerspectiveCamera(
            75,
            modelWrapper.offsetWidth / modelWrapper.offsetHeight,
            1,
            500
        );
        const stats = new Stats()

        camera.position.set(0, 10, 20);
        camera.rotation.x = -20;
        
        helper.position.set(0, 3, 0).normalize();

        renderer.setSize(modelWrapper.offsetWidth, modelWrapper.offsetHeight);

        scene.add(helper);
        scene.add(cube);
        scene.add(axesHelper);
        scene.add(ambientLight);

        const animate = () => {
            requestAnimationFrame( animate );
            renderer.render( scene, camera );
        }
        animate();

        new OrbitControls(camera, canvas);

        modelWrapper.appendChild(canvas);
        modelWrapper.appendChild(stats.dom)

        // добавление модели
        loader.load(
            './scene.gltf', 
            function ( gltf ) {
                scene.add( gltf.scene );
            },
            (xhr) => {
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            },
            function ( error ) {
                console.error( error + ' An error happened');
            }
        );
    }

    componentDidMount () {
       this.loaderHandler();
    }
    
    render () {
        return (
            <div id="model"></div>
        )
    }
}
