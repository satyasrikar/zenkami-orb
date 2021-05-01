import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

//lOADING
const textureLoader = new THREE.TextureLoader();

const normalTexture = textureLoader.load("/Textures/NormalMap.png");

// Debug
// const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.SphereBufferGeometry(0.5, 64, 64);

// Materials

const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;

material.normalMap = normalTexture;

material.color = new THREE.Color(0x292929);

// Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

//LIGHT ONE

// const lightOne = gui.addFolder("Light 1");

const pointLightOne = new THREE.PointLight(0x87ff, 2);
pointLightOne.position.set(-0.94, 1.31, -0.67);
pointLightOne.intensity = 10;

scene.add(pointLightOne);

// lightOne.add(pointLightOne.position, "x").min(-3).max(3).step(0.01);
// lightOne.add(pointLightOne.position, "y").min(-6).max(6).step(0.01);
// lightOne.add(pointLightOne.position, "z").min(-3).max(3).step(0.01);
// lightOne.add(pointLightOne, "intensity").min(0).max(10).step(0.01);

// const lightOneColor = {
//   color: 0xff0000,
// };

// lightOne.addColor(lightOneColor, "color").onChange(() => {
//   pointLightOne.color.set(lightOneColor.color);
// });

// const pointLightOneHelper = new THREE.PointLightHelper(pointLightOne, 0.8);

// scene.add(pointLightOneHelper);

//LIGHTTWO

// const lightTwo = gui.addFolder("Light 2");

const pointLightTwo = new THREE.PointLight(0xff0000, 2);
pointLightTwo.position.set(1.38, -3, -1.98);
pointLightTwo.intensity = 6.8;

scene.add(pointLightTwo);

// lightTwo.add(pointLightTwo.position, "x").min(-3).max(3).step(0.01);
// lightTwo.add(pointLightTwo.position, "y").min(-6).max(6).step(0.01);
// lightTwo.add(pointLightTwo.position, "z").min(-3).max(3).step(0.01);
// lightTwo.add(pointLightTwo, "intensity").min(0).max(10).step(0.01);

// const pointLightTwoHelper = new THREE.PointLightHelper(pointLightTwo, 1);

// scene.add(pointLightTwoHelper);

//LIGHT BLUE
// const pointLightBlue = new THREE.PointLight(0x0000ff, 2);
// pointLightBlue.position.set(2.64, -2.88, -1);
// pointLightBlue.intensity = 4.74;

// scene.add(pointLightBlue);

// gui.add(pointLightBlue.position, "x").min(-3).max(3).step(0.01);
// gui.add(pointLightBlue.position, "y").min(-6).max(6).step(0.01);
// gui.add(pointLightBlue.position, "z").min(-3).max(3).step(0.01);
// gui.add(pointLightBlue, "intensity").min(0).max(10).step(0.01);

// const pointLightHelperBlue = new THREE.PointLightHelper(pointLightBlue, 0.8);

// scene.add(pointLightHelperBlue);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

document.addEventListener("mousemove", onDocumentMouseMove);

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

console.log(mouseX, mouseY);

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowX;
  mouseY = event.clientY - windowY;
}
const updateSphere = (event) => {
  sphere.position.y = window.scrollY * 0.003;
};

document.addEventListener("scroll", updateSphere);

const clock = new THREE.Clock();

const tick = () => {
  targetX = mouseX * 0.01;
  targetY = mouseY * 0.01;
  const elapsedTime = clock.getElapsedTime();

  // Update objects

  sphere.rotation.y = 0.5 * elapsedTime;

  sphere.rotation.y += 0.009 * (targetX - sphere.rotation.y);
  sphere.rotation.x += 0.012 * (targetY - sphere.rotation.x);
  sphere.position.z += -0.0045 * (targetY - sphere.rotation.x);

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

// window.onscroll = function () {
//   stickSphere();
// };

// var header = document.getElementById("stickySphere");
// var sticky = stickySphere.offsetTop;

// function stickSphere() {
//   if (window.pageYOffset > sticky) {
//     stickySphere.classList.add("sticky");
//   } else {
//     stickySphere.classList.remove("sticky");
//   }
// }
