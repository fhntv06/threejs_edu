import {
    WebGLRenderer,
    PerspectiveCamera,
    Scene,
    Mesh,
    BoxGeometry,
    MeshStandardMaterial,
    DirectionalLight,
} from '../../js/libs/three.module.js';

class Viewer {
    wrapperCanvas = document.body;
    widthWrapperCanvas = document.body.offsetWidth;
    heightWrapperCanvas = document.body.offsetHeight;
    aspectRatio = this.widthWrapperCanvas / this.heightWrapperCanvas;
    methodsCreate = []
    updatePoolMethods = {};

    init = () => {
        this.methodsCreate = [
            this.createRenderer,
            this.createScene,
            this.createCamera,
            this.createLigth,
        ];

        this.methodsCreate.forEach((method) => method());

        this.update();
    }
    createRenderer = () => {
        const renderer = new WebGLRenderer();
        const canvas = renderer.domElement;

        this.renderer = renderer;
        this.canvas = canvas;

        this.wrapperCanvas.insertAdjacentElement('beforeend', canvas);

        renderer.setSize(this.widthWrapperCanvas, this.heightWrapperCanvas);
    }
    createCamera = () => {
        const camera = new PerspectiveCamera(
            75,
            this.aspectRatio,
            1,
            100
        );

        camera.position.z = 5;

        this.camera = camera;
    }
    createScene = () => {
        const scene = new Scene();

        console
        this.scene = scene;
    }
    createLigth = () => {
        const directionLigth = new DirectionalLight(0xffffff, 1);
        this.scene.add(directionLigth);
        directionLigth.position.set(1,5,1);
    }
    setUpdate = (name , func) => {
        // TODO: тут вообще использоваться должны ключи
        this.updatePoolMethods[name] = func;
    }
    removeUpdate = (name) => {
        // TODO: тут вообще использоваться должны ключи
        delete this.updatePoolMethods[name];
    }
    update = () => {
        this.renderer.render(this.scene, this.camera);

        requestAnimationFrame(this.update);

        for (const nameMethod in this.updatePoolMethods) {
            this.updatePoolMethods[nameMethod]();            
        }
    }
}

export default Viewer = new Viewer();

