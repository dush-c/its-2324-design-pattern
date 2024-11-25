import { AmountSettings } from "./amount-settings.entity";

export abstract class AmountSettingsDataSource {
  abstract getAmountSettings(entityId: string): Promise<AmountSettings>;
}