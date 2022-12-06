import { Vector3 } from "three";
import { Config } from "../config/config";
import { WarehouseDto } from "../dtos/warehouse";
import { MathHelper } from "../utils/mathHelper";
import { Path } from "./path";

export class Warehouse {
  public id: string;
  public city: string;
  public position: THREE.Vector3;
  public rotundaPosition: THREE.Vector3 | undefined;
  public paths: Path[];
  public displacedPosition: THREE.Vector3 | undefined;
  public numConnected: number | undefined;

  constructor(
    id: string,
    city: string,
    position: THREE.Vector3,
    paths: Path[] = []
  ) {
    this.id = id;
    this.city = city;
    this.position = position;
    this.paths = paths;
  }

  /**
   * return an array of Warehouse objects from warehouses data
   * @param warehouseData
   * @returns
   */
  public static dataToWarehouseList(warehouseData: WarehouseDto[]) {
    let warehouseList: Warehouse[] = [];

    //Math.max.apply(Math,warehouseData.map(function(o:WarehouseDto){return o.latitude;}))
    var MinLat = Math.min(...warehouseData.map((o) => o.latitude));
    var MaxLat = Math.max(...warehouseData.map((o) => o.latitude));

    var MinLong = Math.min(...warehouseData.map((o) => o.longitude));
    var MaxLong = Math.max(...warehouseData.map((o) => o.longitude));

    var MinAlt = Math.min(...warehouseData.map((o) => o.altitude));
    var MaxAlt = Math.max(...warehouseData.map((o) => o.altitude));

    warehouseData.forEach((warehouseItem: WarehouseDto) => {
      let warehouse = new Warehouse(
        warehouseItem.id,
        warehouseItem.locality,
        //to do change this to funct lat long to vector3
        new Vector3(
          MathHelper.LatitudeToVectorPosition(
            warehouseItem.latitude,
            MinLat,
            MaxLat
          ),
          MathHelper.AltitudeToVectorPosition(
            warehouseItem.altitude,
            MinAlt,
            MaxAlt
          ),
          MathHelper.LongitudeToVectorPosition(
            warehouseItem.longitude,
            MinLong,
            MaxLong
          )
        ).multiplyScalar(Config.scale),
        [] //Empty paths
      );

      warehouseList.push(warehouse);
    });

    return warehouseList;
  }

  public setDisplacedPosition() {
    let secondPoints: THREE.Vector3[] = [];
    let dispPoint;
    let meanPoint;

    // edge case warehouse with no paths
    if (this.paths.length <= 0) {
      this.displacedPosition = this.position;
    }

    this.paths.forEach((path) => {
      secondPoints.push(path.getSecondPoint());
    });

    secondPoints = MathHelper.orderClockwise(this.position, secondPoints);

    let twoPoints: Vector3[] = [];
    let totalAngle = 0;
    // if warehouse has more than two paths
    if (secondPoints.length > 1) {
      secondPoints.push(secondPoints[0]);

      let currentAngle = 0;

      // get the set of points with largest angle between
      for (let i = 0; i < secondPoints.length - 1; i++) {
        let angle;
        let pointB;
        let pointA;

        pointA = secondPoints[i].clone().projectOnPlane(new Vector3(0, 1, 0));

        pointB = secondPoints[i + 1]
          .clone()
          .projectOnPlane(new Vector3(0, 1, 0));

        angle = pointB.angleTo(pointA);

        if (angle > currentAngle) {
          currentAngle = angle;
          twoPoints = [pointA, pointB];
        }

        totalAngle = angle + totalAngle;
      }

      meanPoint = new Vector3(
        (twoPoints[0].x + twoPoints[1].x) / 2,
        0,
        (twoPoints[0].z + twoPoints[1].z) / 2
      );

      let invertedVector = [meanPoint, this.position];

      dispPoint = MathHelper.pointOnVector3WithDistanceAfterEnd(
        invertedVector[0],
        invertedVector[1],
        Config.displaceDistance
      );
      dispPoint.y = this.position.y;
    } else {
      dispPoint = secondPoints[0];
    }

    this.displacedPosition = dispPoint;
  }
}
