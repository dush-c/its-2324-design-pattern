import { AmountSettings, HourlyRateSettings, MinBillableSettings } from "@modules/amount/amount-settings";

export interface ProjectAmountSettings extends Partial<MinBillableSettings>{

  userSettings: {
    userId: string,
    settings: HourlyRateSettings
  }[];

}