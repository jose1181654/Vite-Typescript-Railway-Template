import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { camera } from "./camera";
import { renderer } from "./renderer";

export const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = true;
controls.enableZoom = true;
controls.enableRotate = true;
controls.rotateSpeed = 0.5;
controls.zoomSpeed = 0.5;
controls.panSpeed = 0.5;
