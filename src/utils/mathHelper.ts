import * as THREE from "three";
import { Config } from "../config/config";

export class MathHelper {
  public static distance3dVector3(
    vector1: THREE.Vector3,
    vector2: THREE.Vector3
  ): number {
    return Math.sqrt(
      Math.pow(vector1.x - vector2.x, 2) +
        Math.pow(vector1.y - vector2.y, 2) +
        Math.pow(vector1.z - vector2.z, 2)
    );
  }

  public static pointOnVector3WithDistance(
    vector1: THREE.Vector3,
    vector2: THREE.Vector3,
    distance: number
  ): THREE.Vector3 {
    let vector = new THREE.Vector3();
    vector.subVectors(vector2, vector1);
    vector.normalize();
    vector.multiplyScalar(distance);
    vector.add(vector1);
    return vector;
  }

  public static pointOnVector3WithDistanceAfterEnd(
    vector1: THREE.Vector3,
    vector2: THREE.Vector3,
    distance: number
  ): THREE.Vector3 {
    let vectorDistance = MathHelper.distance3dVector3(vector1, vector2);

    let vector = new THREE.Vector3();
    vector.subVectors(vector2, vector1);
    vector.normalize();
    vector.multiplyScalar(vectorDistance + distance);
    vector.add(vector1);
    return vector;
  }

  // getPointAtDistance
  // Returns a point at a given distance along a line
  public static getPointAtDistance(
    p1: THREE.Vector3,
    p2: THREE.Vector3,
    distance: number
  ): THREE.Vector3 {
    let dx = p2.x - p1.x;
    let dy = p2.y - p1.y;
    let dz = p2.z - p1.z;
    let len = Math.sqrt(dx * dx + dy * dy + dz * dz);
    dx /= len;
    dy /= len;
    dz /= len;
    return new THREE.Vector3(
      p1.x + dx * distance,
      p1.y + dy * distance,
      p1.z + dz * distance
    );
  }

  public static getPointAtDistanceProjectedOnPlaneY(
    p1: THREE.Vector3,
    p2: THREE.Vector3,
    distance: number
  ): THREE.Vector3 {
    const projY = new THREE.Vector3(0, p1.y, 0);
    const p1B = p1.clone();
    p1B.projectOnPlane(projY);
    const p2B = p2.clone();
    p2B.projectOnPlane(projY);

    let point = MathHelper.getPointAtDistance(p1B, p2B, distance);

    point.y = p1.y;

    return point;
  }

  public static getTwoPointsWithDistance(
    point1: THREE.Vector3,
    point2: THREE.Vector3,
    distance: number
  ): THREE.Vector3[] {
    let vector = new THREE.Vector3();
    vector.subVectors(point2, point1);
    vector.normalize();
    vector.multiplyScalar(distance);
    let point3 = new THREE.Vector3();
    point3.addVectors(point1, vector);
    let point4 = new THREE.Vector3();
    point4.subVectors(point2, vector);
    return [point3, point4];
  }

  public static LongitudeToVectorPosition(
    long: number,
    longMin: number,
    longMax: number
  ): number {
    return (((Config.long.max - Config.long.min) / (longMax - longMin)) *
      (long - longMin) +
      Config.long.min) as number;
  }

  public static AltitudeToVectorPosition(
    alt: number,
    altMin: number,
    altMax: number
  ): number {
    return (((Config.alt.max - Config.alt.min) / (altMax - altMin)) *
      (alt - altMin) +
      Config.alt.min) as number;
  }

  public static LatitudeToVectorPosition(
    lat: number,
    latMin: number,
    latMax: number
  ): number {
    return (((Config.lat.max - Config.lat.min) / (latMax - latMin)) *
      (lat - latMin) +
      Config.lat.min) as number;
  }

  public static orderClockwise(
    center: THREE.Vector3,
    points: THREE.Vector3[]
  ): THREE.Vector3[] {
    const angles = points.map(({ x, y, z }) => {
      let pt = new THREE.Vector3(x, y, z);

      return {
        pt,
        angle: (Math.atan2(z - center.z, x - center.x) * 180) / Math.PI,
      };
    });

    // Sort your points by angle
    const pointsSorted = angles.sort((a, b) => a.angle - b.angle);

    return pointsSorted.map(({ pt }) => pt);
  }

  public static orderVectors3ByAngle(
    vectors: THREE.Vector3[]
  ): THREE.Vector3[] {
    let anglesToZero = vectors.map((v) => Math.atan2(v.x, v.z));

    // order vectors by angle to zero
    let orderedVectors = vectors.map((v, i) => {
      return {
        vector: v,
        angle: anglesToZero[i],
      };
    });

    orderedVectors.sort((a, b) => {
      return a.angle - b.angle;
    });

    return orderedVectors.map((v) => v.vector);
  }
}
