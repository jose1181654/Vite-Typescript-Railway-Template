import { PathDto } from "../dtos/Path";

export interface IPathService {
  getAll(): Promise<Array<PathDto>>;
}
