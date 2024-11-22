"use strict";

// Import stylesheet
import "./style.css";

// Import libraries
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RGBELoader } from "three/examples/jsm/Addons.js";
import { gsap } from "gsap";
import * as dat from 'dat.gui';


// Create a renderer
const renderer = new THREE.WebGLRenderer( { antialias: true } );
// Set the output color space
renderer.outputColorSpace = THREE.SRGBColorSpace;
// Set the size of the renderer
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0x000000 );
renderer.setPixelRatio( window.devicePixelRatio );
// Add the renderer to the DOM
renderer.setAnimationLoop( animate );
// Enable shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// Add the renderer to the DOM
document.body.appendChild( renderer.domElement );

// GUI
const gui = new dat.GUI();

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.set( 4, 5, 11 );
camera.lookAt( 0, 0, 0 );

// Add a plane
// const planeGeometry = new THREE.PlaneGeometry( 20, 20, 32, 32 );
// const planeMaterial = new THREE.MeshStandardMaterial( { color: 0x555555, side: THREE.DoubleSide } );
// const plane = new THREE.Mesh( planeGeometry, planeMaterial );

// // Rotate plane
// plane.rotation.x = - Math.PI / 2;

// // Add shadow
// plane.castShadow = false;
// plane.receiveShadow = true;

// Add the plane to the scene
// scene.add( plane );

// Load environment map
new RGBELoader().load( './canary_wharf_4k.hdr', (environmentMap) => {
  environmentMap.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = environmentMap;
})

// Add directional light
const directionalLight = new THREE.DirectionalLight( 0xffffff, 3, 100, .2, .5 );
directionalLight.position.set( 0, 25, 0 );

// Allow light to cast shadows
directionalLight.castShadow = true;

// Add directional light to scene
scene.add( directionalLight );

// dat GUI controls for directional light
const directionalLightFolder = gui.addFolder('Directional Light');
directionalLightFolder.add( directionalLight, 'intensity' ).min( 0 ).max( 10 ).step( 0.1 );
directionalLightFolder.add( directionalLight.position, 'x' ).min( - 20 ).max( 20 ).step( 0.1 );
directionalLightFolder.add( directionalLight.position, 'y' ).min( - 20 ).max( 20 ).step( 0.1 );
directionalLightFolder.add( directionalLight.position, 'z' ).min( - 20 ).max( 20 ).step( 0.1 );


// Add ambient light
const ambientLight = new THREE.AmbientLight( 0xffffff, .5 );
scene.add( ambientLight );

// Instantiate a loader
const loader = new GLTFLoader().setPath( './' );

// Load a glTF resource
loader.load( './scene.gltf', (gltf) => {

  const model = gltf.scene;

  // Add dat GUI controls for model position
  const modelPositionFolder = gui.addFolder('Model Position');
  modelPositionFolder.add(model.position, 'x').min(-10).max(10).step(0.1);
  modelPositionFolder.add(model.position, 'y').min(-10).max(10).step(0.1);
  modelPositionFolder.add(model.position, 'z').min(-10).max(10).step(0.1);

  const modelRotationFolder = gui.addFolder('Model Rotation');
  modelRotationFolder.add(model.rotation, 'x').min(-10).max(10).step(0.1);
  modelRotationFolder.add(model.rotation, 'y').min(-10).max(10).step(0.1);
  modelRotationFolder.add(model.rotation, 'z').min(-10).max(10).step(0.1);

  model.traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  model.position.set(0, 1.05, -1);
  model.scale.set(0.003, 0.003, 0.003);
  scene.add(model);

	}
);

// Set the position of the camera
camera.position.z = 5;

// Add controls
const controls = new OrbitControls( camera, renderer.domElement );
controls.update();

// Add axes
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  renderer.render( scene, camera );
}

animate();