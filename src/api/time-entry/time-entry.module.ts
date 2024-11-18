import { Module } from "@nestjs/common";
import { TimeEntryController } from "./time-entry.controller";
import { AmountService } from "./amount/amount.service";
import { FixedAmountService } from "./amount/fixed-amount.service";
import { TimeEntryResultFactory } from "./result.service";
import { TimeEntryResultCalculatorService } from './result-calculator.service';
import { DurationSettingsModule } from "@modules/duration/duration-settings";
import { DurationStrategyModule } from "@modules/duration/duration-strategy";
import { AmountSettingsModule, DEFAULT_HOURLY_RATE, DEFAULT_MIN_BILLABLE } from "@modules/amount/amount-settings";
import { TimeEntryModule } from "@modules/time-entry";

@Module({
  imports: [
    DurationSettingsModule,
    DurationStrategyModule,
    AmountSettingsModule,
    TimeEntryModule
  ],
  controllers: [TimeEntryController],
  providers: [
  {
    provide: AmountService,
    useClass: FixedAmountService
  },
  TimeEntryResultFactory,
  { provide: DEFAULT_HOURLY_RATE, useValue: 30 },
  { provide: DEFAULT_MIN_BILLABLE, useValue: 15 },
  TimeEntryResultCalculatorService
]
})

export class TimeEntryApiModule {}