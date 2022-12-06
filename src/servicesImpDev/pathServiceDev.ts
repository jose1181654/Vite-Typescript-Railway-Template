import { injectable } from "inversify";
import { PathDto } from "../dtos/Path";
import { IPathService } from "../services/IPathService";

@injectable()
export class PathServiceDev implements IPathService {
  getAll(): Promise<Array<PathDto>> {
    return Promise.resolve([
      {
        startWarehouse: "FakeId1",
        endWarehouse: "FakeId2",
        distance: 10,
      },
      {
        startWarehouse: "FakeId1",
        endWarehouse: "FakeId5",
        distance: 10,
      },
      {
        startWarehouse: "FakeId2",
        endWarehouse: "FakeId1",
        distance: 10,
      },
      {
        startWarehouse: "FakeId2",
        endWarehouse: "FakeId4",
        distance: 10,
      },
      {
        startWarehouse: "FakeId3",
        endWarehouse: "FakeId5",
        distance: 10,
      },
      {
        startWarehouse: "FakeId3",
        endWarehouse: "FakeId4",
        distance: 10,
      },
      {
        startWarehouse: "FakeId4",
        endWarehouse: "FakeId2",
        distance: 10,
      },
      {
        startWarehouse: "FakeId4",
        endWarehouse: "FakeId3",
        distance: 10,
      },
      {
        startWarehouse: "FakeId4",
        endWarehouse: "FakeId6",
        distance: 10,
      },
      {
        startWarehouse: "FakeId5",
        endWarehouse: "FakeId1",
        distance: 10,
      },
      {
        startWarehouse: "FakeId5",
        endWarehouse: "FakeId3",
        distance: 10,
      },
      {
        startWarehouse: "FakeId6",
        endWarehouse: "FakeId1",
        distance: 10,
      },
      {
        startWarehouse: "FakeId6",
        endWarehouse: "FakeId4",
        distance: 10,
      },
      {
        startWarehouse: "FakeId5",
        endWarehouse: "FakeId6",
        distance: 10,
      },
    ] as PathDto[]);
  }
}
