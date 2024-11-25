import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ProjectAmountSettings } from "./project.entity";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";
import { HourlyRateSettings } from "@modules/amount/amount-settings";

export type ProjectDocument = HydratedDocument<Project>;

@Schema({_id: false})
class PAmountSettings implements ProjectAmountSettings{
  @Prop()
  userSettings: { userId: string; settings: HourlyRateSettings; }[];
  
  @Prop()
  minDuration?: number;
}
const ProjectAmountSettingsSchema = SchemaFactory.createForClass(PAmountSettings);

@Schema({toObject: {virtuals: true}, toJSON: {virtuals: true}})
export class Project{
  id: string; 

  @Prop()
  name: string;

  @Prop({
    type: {
      amount: ProjectAmountSettingsSchema
    }
  })
  settings: {
    amount: ProjectAmountSettings,
  } ;

  @Prop({type: MongooseSchema.Types.ObjectId, ref: 'Company'})
  company: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);