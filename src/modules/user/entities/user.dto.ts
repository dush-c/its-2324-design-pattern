import { IsDefined, IsNumber, IsObject, IsString, ValidateNested } from "class-validator";
import { UserAmountSettings } from "./user.entity";
import { Type } from "class-transformer";

class UserAmountSettingsDTO implements UserAmountSettings{
  @IsNumber()
  minDuration: number;

  @IsNumber()
  hourlyRate: number;
}

class UserSettingsDTO{
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => UserAmountSettingsDTO)
  amount: UserAmountSettingsDTO;
}

export class CreateUserDTO {
  @IsString()
  name: string;

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => UserSettingsDTO)
  settings: UserSettingsDTO;
}