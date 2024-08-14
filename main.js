import './style.css';
import * as THREE from '/three';
import Camcontrol from './Camcontrol.js';
import Door from './Door.js';
import DoorUI from './DoorUI.js';
import Scenelight from './Light.js';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

let camera, scene, renderer,
/** @type {OrbitControls} */
cam_control;

init();

function init() {

	const ASPECT_RATIO = window.innerWidth / window.innerHeight;

	camera = new THREE.PerspectiveCamera( 70, ASPECT_RATIO, 0.01, 100 );

	scene = new THREE.Scene();

	const geometryBackground = new THREE.PlaneGeometry( 100, 100 );
	const materialBackground = new THREE.MeshPhongMaterial( { color: 0x000066 } );

	const background = new THREE.Mesh( geometryBackground, materialBackground );
	background.receiveShadow = true;
	background.rotation.set( - Math.PI/2, 0, 0 );
	scene.add( background );


	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setAnimationLoop( animate );
	renderer.shadowMap.enabled = true;
	const app = document.getElementById('canvas-window')
	app.appendChild( renderer.domElement );

	cam_control = new Camcontrol(camera, renderer);
	const door = new Door(scene);
	new DoorUI(door);
	new Scenelight(scene);

	window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {
	const ASPECT_RATIO = window.innerWidth / window.innerHeight;

	camera.aspect = ASPECT_RATIO;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
	renderer.render( scene, camera );
	cam_control.update();
}

window.camera = camera;
