import React, {useRef, useEffect} from "react";
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";
import {useLoader} from "https://esm.sh/@react-three/fiber";

const INITIAL_MTL = new THREE.MeshPhongMaterial({
    color: new THREE.Color(0xf1f1f1),
    shininess: 10
});

const INITIAL_MAP = [
    {childID: "back", mtl: INITIAL_MTL},
    {childID: "base", mtl: INITIAL_MTL},
    {childID: "cushions", mtl: INITIAL_MTL},
    {childID: "legs", mtl: INITIAL_MTL},
    {childID: "supports", mtl: INITIAL_MTL}
    ];

const initColor = (parent, type, mtl) => {
    parent.traverse(o => {
        if (o.isMesh && o.name.includes(type)) {
            o.castShadow = true;
            o.receiveShadow = true;
            o.material = mtl;
            o.nameID = type;
        }
    });
}

const Trans = ({newMaterialOpt}) => {
    const {scene: theModel} = useLoader(GLTFLoader, "./TR_final.gltf");
    const chair = useRef(theModel)

    useEffect(() =>
            void setMaterial(newMaterialOpt.activeOption, newMaterialOpt.newMTL)
        , [newMaterialOpt.newMTL])

    useEffect(() => {
        if (theModel) {
            for (let object of INITIAL_MAP) {
                initColor(theModel, object.childID, object.mtl);
            }
        }
    }, [theModel])

    const setMaterial = (type, mtl) => {
        theModel.traverse(o => {
            if (o.isMesh && o.nameID != null) {
                if (o.nameID === type) {
                    o.material = mtl;
                }
            }
        });
    }


    return <primitive
        ref={chair}
        object={theModel}
        scale={[2, 2, 2]}
        rotation={[0, Math.PI, 0]}
        position={[0, -1, 0]}
        receiveShadow
        castShadow
    >
    </primitive>

}

export default Trans;
