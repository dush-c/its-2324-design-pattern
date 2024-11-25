import { Types } from "mongoose";
import { Company } from "../entities/company.schema";
import { CreateCompanyDTO } from "../entities/company.dto";

export abstract class CompanyDataSource {
  abstract find(): Promise<Company[]>

  abstract get(id: Types.ObjectId | string): Promise<Company>

  abstract create (data: CreateCompanyDTO): Promise<Company>
}