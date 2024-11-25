import { Injectable } from "@nestjs/common";
import { UserDataSource } from "./user.ds";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../entities/user.schema";
import { Model, Types } from "mongoose";
import { CreateUserDTO } from "../entities/user.dto";

@Injectable()
export class UserMongoDataSource extends UserDataSource{
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>) {
      super();
    }

  async find(): Promise<User[]> {
    const list = await this.userModel.find()
    return list.map(r => r.toObject());
  }

  async get(id: Types.ObjectId | string): Promise<User> {
    return this.userModel.findById(id)
      .then(record => record.toObject());
  }

  async create(data: CreateUserDTO): Promise<User> {
    return this.userModel.create(data)
      .then(record => record.toObject());
  }
}