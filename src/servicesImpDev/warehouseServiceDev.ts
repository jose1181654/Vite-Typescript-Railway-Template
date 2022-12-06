import { injectable } from "inversify";
import { WarehouseDto } from "../dtos/warehouse";
import { IWarehouseService } from "../services/IWarehouseService";

@injectable()
export class WarehouseServiceDev implements IWarehouseService {
  getAll(): Promise<Array<WarehouseDto>> {
    return Promise.resolve([
      {
        id: "FakeId1",
        locality: "Arouca",
        latitude: 40.9321,
        longitude: 8.2451,
        altitude: 250,
      },
      {
        id: "FakeId2",
        locality: "Espinho",
        latitude: 41.0072,
        longitude: 8.641,
        altitude: 550,
      },
      {
        id: "FakeId3",
        locality: "Gondomar",
        latitude: 42.1115,
        longitude: 8.7613,
        altitude: 200,
      },
      {
        id: "FakeId4",
        locality: "Matosinhos",
        latitude: 41.3517,
        longitude: 8.7479,
        altitude: 150,
      },
      {
        id: "FakeId5",
        locality: "Oliveira de Azeméis",
        latitude: 42.1187,
        longitude: 8.277,
        altitude: 400,
      },
      {
        id: "FakeId6",
        locality: "Paredes",
        latitude: 41.4387,
        longitude: 8.477,
        altitude: 100,
      },
    ] as WarehouseDto[]);
  }
}
