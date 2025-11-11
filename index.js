import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import { EffectComposer } from "jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "jsm/postprocessing/RenderPass.js";
import { GTAOPass } from 'jsm/postprocessing/GTAOPass.js';
import { OutputPass } from 'jsm/postprocessing/OutputPass.js';

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
scene.add(camera);
camera.position.z = 6;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

new OrbitControls(camera, renderer.domElement);

const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);
const gtaoPass = new GTAOPass(scene, camera, w, h);
composer.addPass(gtaoPass);
const outputPass = new OutputPass();
composer.addPass(outputPass);

const boxGroup = new THREE.Group();
boxGroup.update = (t) => {
  boxGroup.rotation.z = t;
};
scene.add(boxGroup);
const startPos = {
  x: -2,
  y: -2,
  z: 0,
};
const geometry = new THREE.BoxGeometry();
const spacing = 1.1;
const palette = [0x780000, 0xc1121f, 0xfdf0d5, 0x003049, 0x669bbc];
// const palette =["#ffbe0b","#fb5607","#ff006e","#8338ec","#3a86ff"];
// const palette = ["#386641","#6a994e","#a7c957","#f2e8cf","#bc4749"];
function getBox({
  color = 0x00ff00,
  index = 0,
  x = 0,
  y = 0,
  z = 0,
  scale = 1,
}) {
  // color.offsetHSL(0, Math.random() * 1  - 0.5, 0);
  const material = new THREE.MeshStandardMaterial({
    color,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = startPos.x + x * spacing;
  mesh.position.y = startPos.y + y * spacing;
  mesh.position.z = z + (Math.floor(Math.random() * 3) + 1) * 0.2;
  mesh.rotation.z = Math.PI * 0.25;

  mesh.scale.setScalar(scale);
  return mesh;
}

const gridSize = 5;
for (let x = 0; x < gridSize; x += 1) {
  for (let y = 0; y < gridSize; y += 1) {
    const hex = palette[Math.floor(Math.random() * palette.length)];
    const color = new THREE.Color(hex);
    const scale = 1.6;
    const z = -1 + Math.random() * 0.1;
    const box = getBox({ color, index: x + y, x, y, z, scale });
    boxGroup.add(box);
  }
}

for (let x = 0; x < gridSize; x += 1) {
  for (let y = 0; y < gridSize; y += 1) {
    const hex = palette[Math.floor(Math.random() * palette.length)];
    const color = new THREE.Color(hex);
    const scale = (Math.floor(Math.random() * 8) + 1) * 0.2;
    const z = 0;
    const box = getBox({ color, index: x + y, x, y, z, scale });
    boxGroup.add(box);
  }
}

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 2);
scene.add(hemiLight);

const pointlight = new THREE.PointLight(0xffffff, 3);

pointlight.position.x = 1;
pointlight.position.z = 2;
scene.add(pointlight);

function animate() {
  requestAnimationFrame(animate);
  composer.render(scene, camera);
}
animate();

function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", handleWindowResize, false);
