import { Injectable } from '@nestjs/common';
import { AmountSettingsDataSource } from '../amount-settings.ds';
import { AmountSettings } from '../amount-settings.entity';
import { UserDataSource } from '@modules/user';
import { CompanyAmountSettings } from './company-amount-setting.ds';

@Injectable()
export class UserAmountSettings extends AmountSettingsDataSource {
  constructor(protected dt: UserDataSource,
    protected companyDt: CompanyAmountSettings
  ) {
    super();
  }
  async getAmountSettings(entityId: string): Promise<AmountSettings> {
    const entity = await this.dt.get(entityId);
    const company = await this.companyDt.getAmountSettings(entity.company);
    const merged = Object.assign(company, entity.settings.amount);
    return merged;
  }
}
