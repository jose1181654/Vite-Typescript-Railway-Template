import * as THREE from "three";

import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { Config } from "../config/config";
import { scene } from "./renderer";

export class TextLoader {
  /**
   * Load font and generate text geometry
   * @param position
   * @param lookat
   * @param text
   * @param size
   * @param height
   */
  public text(
    position: THREE.Vector3,
    lookat: THREE.Vector3,
    text: string,
    size: number = 6,
    height: number = 2
  ) {
    const fontLoader = new FontLoader();
    fontLoader.load(
      "node_modules/three/examples/fonts/droid/droid_serif_regular.typeface.json",
      (droidFont) => {
        const textGeometry = new TextGeometry(text, {
          size: size,
          height: height,
          font: droidFont,
        });

        textGeometry.center();

        const textMaterial = new THREE.MeshStandardMaterial();
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.x = position.x;
        textMesh.position.y = position.y + Config.warehouse.height;
        textMesh.position.z = position.z;

        // rotate the text to face the point that the building is looking at
        if (position) {
          textMesh.rotateY(
            Math.atan2(position.x - lookat.x, position.z - lookat.z) + Math.PI
          );
        }

        scene.add(textMesh);
      }
    );
  }
}
