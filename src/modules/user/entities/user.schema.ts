import { AmountSettings } from "@modules/amount/amount-settings";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UserAmountSettings } from "./user.entity";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";

export type UserDocument = HydratedDocument<User>;


@Schema({_id:false})
class UAmountSetting implements UserAmountSettings{
  @Prop()
  hourlyRate: number;

  @Prop()
  minDuration: number;
}
const AmountSettingsSchema = SchemaFactory.createForClass(UAmountSetting);

@Schema({toObject: {virtuals: true}, toJSON: {virtuals: true}})
export class User{
  id: string;

  @Prop()
  name: string;

  @Prop({
    type:{
      amount: AmountSettingsSchema,
    }
  })
  settings: {
    amount: AmountSettings;
  };

  @Prop({type: MongooseSchema.Types.ObjectId, ref: 'Company'})
  company: string;
}

export const UserSchema = SchemaFactory.createForClass(User);