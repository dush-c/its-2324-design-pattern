import { Injectable } from "@nestjs/common";
import { AmountService } from "./amount/amount.service";
import { FixedAmountService } from "./amount/fixed-amount.service";
import { TimeEntry } from "./time-entry.schema";
import { DurationSettingsDataSource } from "./duration/duration-settings.ds";
import { DurationStrategySelectorService } from "./duration/duration-strategy-selector.service";
import { AmountSettingsDataSource } from "./amount/amount-settings.ds";
import { TimeEntryResultFactory } from "./result.service";
import { TimeEntryResultDTO } from "./time-entry.dto";

@Injectable()
export class TimeEntryResultCalculatorService {

  constructor(
    private readonly durationSettingsSrv: DurationSettingsDataSource,
    private readonly durationStrategySelector: DurationStrategySelectorService,
    private readonly amountSettingSrv: AmountSettingsDataSource,
    private readonly resultFactoryProvider: TimeEntryResultFactory
   ) { }

  async calcResult(userId: string, record: TimeEntry): Promise<TimeEntryResultDTO> {
    const durationSettings = await this.durationSettingsSrv.getDurationSettings(userId);
    const durationSrv = this.durationStrategySelector.getStrategy(durationSettings.strategy);

    const amountSettings = await this.amountSettingSrv.getAmountSettings(userId);

    let amountSrv: AmountService;
    if (durationSrv.getDuration(record.start, record.end) < amountSettings.minDuration) {
      amountSrv = new FixedAmountService(0);
    } else {
      amountSrv = new FixedAmountService(amountSettings.hourlyRate);
    }
    const resultFactory = this.resultFactoryProvider.getFactory(durationSrv, amountSrv);
    return resultFactory(record);
  }
}