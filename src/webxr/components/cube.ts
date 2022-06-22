import * as THREE from 'three'

export class Cube extends THREE.Mesh<THREE.IcosahedronGeometry, THREE.MeshPhongMaterial> {
    constructor() {
        super();
        const geometry = new THREE.IcosahedronBufferGeometry();
        const material = new THREE.MeshPhongMaterial({
            color: 0x00ff00,
            specular: 0x444444,
            shininess: 60
        })

        return new THREE.Mesh(geometry, material)
    }
}