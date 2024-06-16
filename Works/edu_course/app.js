import Viewer from "./viewer.js";
import {
    Mesh,
    BoxGeometry,
    MeshStandardMaterial
} from '../../js/libs/three.module.js';

class App {
    constructor() {
        Viewer.init();

        this.createObject();
    }
    createObject = () => {
        const object = new Mesh(
            new BoxGeometry(1,1,1),
            new MeshStandardMaterial({ color: 'green' })
        );

        Viewer.scene.add(object);

        Viewer.setUpdate(
            'rotation_cube',
            () => object.rotation.y += .01
        );
    }
}

window.addEventListener('load', () => new App());
