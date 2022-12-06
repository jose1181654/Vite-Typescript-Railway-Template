import * as THREE from "three";
import { Config } from "../config/config";

export class Ground {
  /**
   * generate the ground and export it, so we can use it in the main.ts file
   * @returns {THREE.Mesh} the ground mesh
   */
  public static generateGround(): THREE.Mesh {
    const width = Config.ground.width * Config.scale * 1.4;
    const height = Config.ground.height * Config.scale * 1.4;

    let geometry = new THREE.PlaneGeometry(width, height, 10, 10);

    const plane = new THREE.Mesh(
      geometry,
      new THREE.MeshStandardMaterial({ color: Config.color.ground })
    );

    plane.position.set(0, -Config.InfinityNumber, 0);
    plane.rotation.x = -Math.PI / 2;
    plane.receiveShadow = true;

    return plane;
  }

  public static generateSea(): THREE.Mesh {
    const width = Config.skyboxSize * Config.scale;
    const height = Config.skyboxSize * Config.scale;

    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(width, height, 10, 10),
      new THREE.MeshToonMaterial({ color: Config.color.sea })
    );

    plane.position.set(0, -Config.InfinityNumber * 2, 0);
    plane.rotation.x = -Math.PI / 2;

    return plane;
  }
}
