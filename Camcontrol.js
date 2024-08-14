import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@v0.167.1/examples/jsm/Addons.js';

export default class Camcontrol {
    /** @type {OrbitControls} */
    control;

    constructor (camera, renderer) {
        // controls
        this.control = new OrbitControls( camera, renderer.domElement );

        this.control.minDistance = 0;
        this.control.maxDistance = 50;

        camera.position.set( 0, 2, 3 );
    }

    update () {
        this.control.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
    }
}
