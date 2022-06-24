import * as THREE from 'three'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export abstract class BaseWebXRApp {
    protected scene: THREE.Scene;
    protected camera: THREE.PerspectiveCamera;
    protected renderer: THREE.WebGLRenderer;

    constructor() {
        const container = document.createElement( 'div' );
		document.body.appendChild( container );

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
        this.camera.position.set(0, 1.6, 2);

        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        container.appendChild( this.renderer.domElement );

        this.handleWindowResize();
    }

    private handleWindowResize() {
        const onWindowResize = () => {
            this.camera.aspect = window.innerWidth / window.innerHeight
            this.camera.updateProjectionMatrix()
            this.renderer.setSize(window.innerWidth, window.innerHeight)
            this.render()
        }
        window.addEventListener('resize', onWindowResize, false)
    }

    protected render() {
        this.renderer.render(this.scene, this.camera)
    }

    protected async loadGLTF(gltf: any): Promise<GLTF | undefined> {
        return new Promise((resolve, reject) => {
            const loader = new GLTFLoader();
            loader.load(gltf, (gltf: GLTF) => {
                resolve(gltf);
            }, (xhr: ProgressEvent<EventTarget>) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
            }, (error: ErrorEvent) => {
                console.log(`Error: ${error.message}`);
                resolve(undefined);
            })
        })
    }

    // protected loadFBX() {
    //     const self = this;
    //     const loader = new FBXLoader().setPath('../assets/');
    //     loader.load('InteriorTest.fbx', (object: THREE.Group) => {
    //         self.computer = object;
    //         self.scene.add(object);
    //         self.renderer.setAnimationLoop(self.render.bind(self));
    //     }, (xhr: ProgressEvent<EventTarget>) => {
    //         console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    //     }, (error: ErrorEvent) => {
    //         console.log(`Error: ${error.message}`);
    //     })
    // }
}