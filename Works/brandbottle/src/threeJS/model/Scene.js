// ссылка на источник: https://highload.today/blogs/react-v-3d-kak-ispolzovat-react-three-fiber/

import {extend, useThree} from '@react-three/fiber';
import React, {Suspense, useEffect} from "react";
import Trans from "./Trans";
import Floor from "./Floor";

import * as THREE from '../three.module.js';
import { OrbitControls } from "https://cdn.skypack.dev/three@0.133.1/examples/jsm/controls/OrbitControls.js";

extend({OrbitControls})

export default function Scene ( {newMaterialOpt} ) {
    const {
        scene, camera,
        gl: {domElement, shadowMap}
    } = useThree();

    // Scene configuration;
    useEffect(() => {
        const directionalLight = scene.children[1];
        scene.background = new THREE.Color(0xf1f1f1);
        scene.fog = new THREE.Fog(0xf1f1f1, 20, 100);
        camera.fov = 50;
        directionalLight.shadow.mapSize = new THREE.Vector2(1024, 1024)
        shadowMap.enabled = true;
        console.log(scene);
    })

    return (
        <>
            <orbitControls args={[camera, domElement]}/>
            <hemisphereLight
                skycolor={new THREE.Color(0xffffff)}
                groundColor={new THREE.Color(0xffffff)}
                intensity={0.61}
                position={[0, 50, 0]}
            />
            <directionalLight
                color={new THREE.Color(0xffffff)}
                intensity={0.54}
                position={[-8, 12, 8]}
                castShadow
            />
            <Suspense fallback={null}>
                <Trans newMaterialOpt={newMaterialOpt}/>
                <Floor/>
            </Suspense>
        </>
    )
}
// export default class Model extends React.Component {
//     constructor(props) {
//         super(props)
//         this.refModel = React.createRef();
//       }

//       loaderHandler () {
//         const renderer = new THREE.WebGLRenderer();
//         renderer.setSize( window.innerWidth, window.innerHeight );
        
//         const canvas = renderer.domElement;
        
//         const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 500 );
//         camera.position.set( 0, 0, 20 );
        
//         const scene = new THREE.Scene();
//         const loader = new GLTFLoader();

//         const light = new THREE.DirectionalLight( 'red', 0.5);
//         const helper = new THREE.DirectionalLightHelper( light, 5 );
//         helper.position.set( 0, 3, 0 ).normalize();
//         scene.add( helper );

//         const geometry = new THREE.BoxGeometry( 1, 1, 1 );
//         const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
//         const cube = new THREE.Mesh( geometry, material );
//         scene.add( cube );

//         camera.position.z = 5;

//         // добавление модели
//         loader.load(
//             './TR_final.gltf', 
//             function ( gltf ) {
//                 scene.add( gltf.scene );
//             },
//             (xhr) => {
//                 console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
//             },
//             function ( error ) {
//                 console.error( error + ' An error happened');
//             }
//         );
    
//         function animate() {
//             requestAnimationFrame( animate );
//             renderer.render( scene, camera );
//         }
//         animate();

//         new OrbitControls(camera, canvas);

//         this.refModel.current.appendChild(canvas);
//     }

//     componentDidMount () {
//        this.loaderHandler ();
//     }
    
//     render () {
//         return (
//             <div id="model" ref={this.refModel} className='container container__model'></div>
//         )
//     }
// }
