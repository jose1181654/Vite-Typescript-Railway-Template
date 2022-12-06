import * as dat from "dat.gui";
import { renderer, scene } from "./core/renderer";
import camera from "./core/camera";
import { controls } from "./core/orbit-control";

import "./style.css";
import * as Light from "./core/lighting";
import { Ground } from "./objects/ground";
import { WarehousesObj } from "./objects/warehouses";
import { Rotunda } from "./objects/roads/rotunda";
import { PathBuilder } from "./classes/pathBuilder";
import { Warehouse } from "./classes/warehouse";
import { Path } from "./classes/path";
import { RoadDrawer } from "./classes/roadDrawer";
import { IPathService } from "./services/IPathService";
import { SERVICE_KEYS } from "./service-keys-const";
import { IWarehouseService } from "./services/IWarehouseService";
import { container } from "./container";
import { Skybox } from "./core/skybox";
import { ModelLoader } from "./core/modelLoader";
import { CookieHelper } from "./utils/cookieHelper";
import { WarehouseDto } from "./dtos/warehouse";
import { PathDto } from "./dtos/path";

function init() {
  //* ##################################################################### //
  //* ##################### add all parts to the scene #################### //
  //* ##################################################################### //

  let ambientLight = Light.ambient();
  scene.add(ambientLight); // add lighting

  let directionalLight = Light.directional();
  scene.add(directionalLight); // add lighting

  let sea = Ground.generateSea();
  scene.add(sea); // add the ground

  let skybox = Skybox.generateSkybox();
  scene.add(skybox);

  let ground = Ground.generateGround();
  scene.add(ground); // add the ground

  // if there are no warehouses or paths loaded, do not try to draw them
  if (warehouseData && pathData) {
    let warehouseList = Warehouse.dataToWarehouseList(warehouseData);

    let pathList = Path.dataToPathList(pathData, warehouseList);

    let processedWarehouseList = PathBuilder.buildPathsForWarehouses(
      warehouseList,
      pathList
    );

    let rotundas = Rotunda.generateRotundasFromWarehouseList(
      processedWarehouseList
    );
    scene.add(...rotundas);

    const loader = new ModelLoader();
    processedWarehouseList.forEach((warehouse) => {
      loader.tree(warehouse.position);
    });

    WarehousesObj.loadWarehousesObj(processedWarehouseList);

    WarehousesObj.loadWarehousesName(processedWarehouseList);

    let roadObjList = RoadDrawer.generateRoads(processedWarehouseList);
    scene.add(...roadObjList);

    let riseList = WarehousesObj.genRises(processedWarehouseList);
    scene.add(...riseList);
  }

  //* ##################################################################### //
  //* ############################## add gui ############################## //
  //* ##################################################################### //

  const gui = new dat.GUI();

  gui
    .add(skybox as any, "visible")
    .name("Skybox")
    .setValue(true);

  // add a source data toggle on the gui between the dev and prod data
  let developmentCookie = CookieHelper.getCookie("development") ?? "true";
  let guiSourceName =
    developmentCookie === "true" ? "development" : "production";

  gui
    .add(
      { development: () => CookieHelper.toggleCookieAndReload("development") },
      "development"
    )
    .name("Source: " + guiSourceName);

  // Axes Helper
  // const axesHelper = new THREE.AxesHelper(10);
  // axesHelper.setColors("#ff0000", "#00ff00", "#0000ff");
  // scene.add(axesHelper);
  // gui.add(axesHelper, "visible").name("Axes Helper").setValue(true);

  //* Call animate function

  animate();
}

//* ##################################################################### //
//* ################## Prepare Warehouse and Path Data ################## //
//* ##################################################################### //

let warehouseData: Array<WarehouseDto>;
let pathData: Array<PathDto>;

Promise.all([
  container.get<IWarehouseService>(SERVICE_KEYS.WAREHOUSE_SERVICE).getAll(),
  container.get<IPathService>(SERVICE_KEYS.PATH_SERVICE).getAll(),
]).then((data) => {
  warehouseData = data[0];
  pathData = data[1];
  init();
});

//* ##################################################################### //
//* ########################## Animate function ######################### //
//* ##################################################################### //

const animate = () => {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};
