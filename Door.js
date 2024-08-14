import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { LoadingManager, Mesh, MeshPhongMaterial, Scene, TextureLoader, Vector3 } from 'three';
import fbxDoor from './public/door/Door.fbx?url';
import imgDoor from './public/door/Door.png';

export default class Door {
    /** базовый размер двери @type {Vector3} */
    #size;
    /** ручка 1 @type {Vector3} */
    #handle1_pos;
    /** ручка 2 @type {Vector3} */
    #handle2_pos;
    /** замок @type {Vector3} */
    #lock_pos;
    /** @type {Mesh} */
    #door;
    /** @type {Mesh} */
    #handle1;
    /** @type {Mesh} */
    #handle2;
    /** @type {Mesh} */
    #lock;
    /** @type {Scene} */
    scene;

    constructor(scene) {
        this.scene = scene;
        this.#door = null;
        this.#handle1 = null;
        this.#handle2 = null;
        this.#lock = null;
        this.#size = new Vector3;
        this.#handle1_pos = new Vector3;
        this.#handle2_pos = new Vector3
        this.#lock_pos = new Vector3;

        const manager = new LoadingManager();
        const loader = new FBXLoader( manager );

        loader.load( fbxDoor, this.#load.bind(this) );
    }

    /** @param {Mesh} object */
    #load (object) {
		const loaderTexture = new TextureLoader();
        const texture = loaderTexture.load(imgDoor);
        const door_material1 = new MeshPhongMaterial({
            map: texture,
        });
        const door_material2 = new MeshPhongMaterial({
            map: texture,
        });
        const door_material3 = new MeshPhongMaterial({
            map: texture,
        });

        object.traverse(
            /** @param {Mesh} model */
            model => {
                model.castShadow = true;
                model.receiveShadow = true;
                model.scale.set(1, 1, 1);
                
                switch (model.name) {
                    case "Door":
                        this.#door = model;
                        model.rotation.set(0,0,0);
                        model.geometry.rotateX(-Math.PI/2);
                        model.geometry.computeBoundingBox();
                        model.material = door_material1;
                        model.geometry.boundingBox.getSize(this.#size);
                        break;
                    
                    case "Handle1":
                        this.#handle1 = model;
                        model.material = door_material2;
                        model.position.divideScalar(100);
                        this.#handle1_pos.copy(model.position);
                        break;
                    
                    case "Handle2":
                        this.#handle2 = model;
                        model.material = door_material2;
                        model.position.divideScalar(100);
                        this.#handle2_pos.copy(model.position);
                        break;

                    case "Lock":
                        this.#lock = model;
                        model.material = door_material3;
                        model.position.divideScalar(100);
                        this.#lock_pos.copy(model.position);
                        break;
                
                    default:
                        break;
                }
            }
        );

        this.scene.add( object );
    }

    get size () {
        return this.#size;
    }

    /** высота y @param {Number} value */
    set height (value) {
        if (this.#size.y !== value) {
            const scale = value/this.#size.y;
            this.#door.scale.setY(scale);

            const offset = (this.#size.y*scale - this.#size.y)/2;
            this.#handle1.position.setY(this.#handle1_pos.y + offset);
            this.#handle2.position.setY(this.#handle2_pos.y + offset);
            this.#lock.position.setY(this.#lock_pos.y + offset);
        }
    }

    /** ширина x @param {Number} value */
    set width (value) {
        if (this.#size.x !== value) {
            const scale = value/this.#size.x;
            this.#door.scale.setX(scale);

            const offset = (this.#size.x*scale - this.#size.x)/2;
            this.#handle1.position.setX(this.#handle1_pos.x + offset);
            this.#handle2.position.setX(this.#handle2_pos.x + offset);
            this.#lock.position.setX(this.#lock_pos.x + offset);
        }
    }

    /** толщина z @param {Number} value */
    set thickness (value) {
        if (this.#size.z !== value) {
            const scale = value/this.#size.z;
            this.#door.scale.setZ(scale);

            const offset = (this.#size.z*scale - this.#size.z)/2;
            this.#handle1.position.setZ(this.#handle1_pos.z - offset);
            this.#handle2.position.setZ(this.#handle2_pos.z + offset);
        }
    }
}