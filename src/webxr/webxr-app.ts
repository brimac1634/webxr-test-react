import * as THREE from 'three'
import { DirectionalLight } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
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

        this.initScene();
        this.addLighting();
        this.setupXR();
        
        
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

    private async initScene(): Promise<void> {
        try {
            this.room.geometry.translate(0,3,0);
            this.scene.add(this.room);

            // const gltf = await this.loadGLTF(terminal);

            // if (gltf) {
            //     const computer = gltf.scene;
            //     computer.scale.set(0.15,0.15,0.15);
            //     computer.position.set(0, 1, -1);
            //     computer.rotateY(-90 * (Math.PI/180))
            //     this.room.add(computer)
            //     this.renderer.setAnimationLoop(this.render.bind(this));
            // }

            const radius = 0.08;
            const geometry = new THREE.IcosahedronBufferGeometry(radius, 4);

            for (let i = 0; i < 100; i++) {
                const object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: Math.random() * 0xFFFFFF }));
                object.position.x = this.random(-2, 2);
                object.position.y = this.random(-2, 2);
                object.position.z = this.random(-2, 2);

                this.room.add(object)
            }
        } catch(err) {
            console.log('unable to load scene');
        }

        
    }

    private setupXR() {
        this.renderer.xr.enabled = true;
        document.body.appendChild(VRButton.createButton(this.renderer));
    }


    // private animate() {
    //     requestAnimationFrame(() => this.animate())
    
    //     if (this.computer) {
    //         this.computer.rotation.y += 0.01
    //     }
    
    //     this.controls.update()
    
    //     this.render()
    // }

}


