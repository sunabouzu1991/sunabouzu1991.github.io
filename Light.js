import { AmbientLight, DirectionalLight } from "three";


export default class Scenelight {
    /** @type {AmbientLight} */
    ambient;

    /** @type {DirectionalLight} */
    directional;

    constructor(scene) {
        this.ambient = new AmbientLight( 0x999999 );
        scene.add( this.ambient );

        this.directional = new DirectionalLight( 0xffffff, 3 );
        this.directional.position.set( 1, 1, 2 );
        this.directional.castShadow = true;
        this.directional.shadow.camera.zoom = 4; // tighter shadow map
        scene.add( this.directional );
    }
}