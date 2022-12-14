import React from "react";
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";

const Floor = () => {
    return(
        <mesh
            position={[0,-1,0]}
            receiveShadow
            rotation={[-0.5 * Math.PI, 0, 0]}
        >
            <planeGeometry args={[5000,5000,1,1]} />
            <meshPhongMaterial
                color={new THREE.Color(0xeeeeee)}
                shininess={0}
            />
        </mesh>
    )
}

export default Floor;