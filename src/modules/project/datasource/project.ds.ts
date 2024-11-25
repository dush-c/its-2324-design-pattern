import { Types } from "mongoose";
import { CreateProjectDTO } from "../entities/project.dto";
import { Project } from "../entities/project.schema";

export abstract class ProjectDataSource{
  abstract find(): Promise<Project[]>

  abstract get(id: Types.ObjectId | string): Promise<Project>

  abstract create(data: CreateProjectDTO): Promise<Project>
}