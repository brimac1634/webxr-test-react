import * as THREE from 'three'
import { DirectionalLight } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { BaseWebXRApp } from './base-webxr-app';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry';
import { VRButton } from 'three/examples/jsm/webxr/VRButton';
import terminal from './assets/terminal.glb';
// import { Cube } from './components/cube';

export class WebXRApp extends BaseWebXRApp {
    private controls: OrbitControls;
    private room: THREE.LineSegments;
    private computer: THREE.Group | undefined;

    constructor() {
        super();
        
        this.room = new THREE.LineSegments(new BoxLineGeometry(6,6,6,10,10,10), new THREE.LineBasicMaterial({ color: 0x808080 }))
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.controls.target.set(0, 1.6, 0);
        this.controls.update();

        // this.initScene();
        this.addLighting();
        this.setupXR();
        
        this.loadGLTF();
        // this.loadFBX();
        // this.cube = new Cube();
        // this.scene.add(this.cube);

        // this.animate()
    }

    private addLighting() {
        this.scene.background = new THREE.Color(0xaaaaaa);
        this.scene.add(new THREE.HemisphereLight( 0x606060, 0x404040 ));

        const light = new DirectionalLight(0xffffff);
        light.position.set(1, 1, 1).normalize();
        this.scene.add(light);
    }

    private random(min: number, max: number){
        return Math.random() * (max-min) + min;
    }

    private initScene() {
        const radius = 0.08;
        
        this.room.geometry.translate(0,3,0);
        this.scene.add(this.room);

        const geometry = new THREE.IcosahedronBufferGeometry(radius, 2);

        for (let i = 0; i < 200; i++) {
            const object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: Math.random() * 0xFFFFFF }));
            object.position.x = this.random(-2, 2);
            object.position.y = this.random(-2, 2);
            object.position.z = this.random(-2, 2);

            this.room.add(object)
        }
    }

    private setupXR() {
        this.renderer.xr.enabled = true;
        document.body.appendChild(VRButton.createButton(this.renderer));
    }


    private animate() {
        requestAnimationFrame(() => this.animate())
    
        if (this.computer) {
            this.computer.rotation.y += 0.01
        }
    
        this.controls.update()
    
        this.render()
    }

    private loadGLTF() {
        const self = this;
        const loader = new GLTFLoader();
        loader.load(terminal, (gltf: GLTF) => {
            self.computer = gltf.scene;
            self.computer.position.set(0, 1, -3);
            self.computer.rotateY(-90 * (Math.PI/180))
            self.scene.add(gltf.scene);
            self.renderer.setAnimationLoop(self.render.bind(self));
        }, (xhr: ProgressEvent<EventTarget>) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        }, (error: ErrorEvent) => {
            console.log(`Error: ${error.message}`);
        })
    }

    // private loadFBX() {
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


