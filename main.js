"use strict";

// Import stylesheet
import "./style.css";

// Import libraries
import * as THREE from 'three';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set( 4, 5, 11 );
camera.lookAt( 0, 0, 0 );

// Create a renderer
const renderer = new THREE.WebGLRenderer( { antialias: true } );

// Set the output color space
renderer.outputColorSpace = THREE.SRGBColorSpace;

// Set the size of the renderer
renderer.setSize( window.innerWidth, window.innerHeight );

// Add the renderer to the DOM
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

// Create a light
const light = new THREE.DirectionalLight( 0xffffff, 1 );
light.position.set( 0, 0, 1 );
scene.add( light );

// Create a cube
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// Create a material
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// Create a mesh
const cube = new THREE.Mesh( geometry, material );
// Add the mesh to the scene
scene.add( cube );

// Add a plane
const planeGeometry = new THREE.PlaneGeometry( 10, 10 );
const planeMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, side: THREE.DoubleSide } );
const plane = new THREE.Mesh( planeGeometry, planeMaterial );

// Rotate plane
plane.rotation.x = - Math.PI / 2;
plane.position.y = - 0.5;

// Add the plane to the scene
scene.add( plane );

// Set the position of the camera
camera.position.z = 5;


// Render the scene
function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render( scene, camera );
}