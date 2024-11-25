import { IsDefined, IsNumber, IsObject, IsString, ValidateNested } from "class-validator";
import { ProjectAmountSettings } from "./project.entity";
import { HourlyRateSettings } from "@modules/amount/amount-settings";
import { Type } from "class-transformer";

class ProjectAmountSettingsDTO implements ProjectAmountSettings{


  userSettings: { userId: string; settings: HourlyRateSettings; }[];
  
  @IsNumber()
  minDuration?: number;

}

class ProjectSettingsDTO{
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => ProjectAmountSettingsDTO)
  amount: ProjectAmountSettingsDTO;
}

export class CreateProjectDTO{
  @IsString()
  name: string;

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => ProjectSettingsDTO)
  settings: ProjectSettingsDTO;
}