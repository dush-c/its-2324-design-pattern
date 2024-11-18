import { DurationStrategySelectorService } from './duration/duration-strategy-selector.service';
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TimeEntry, TimeEntrySchema } from "./time-entry.schema";
import { TimeEntryController } from "./time-entry.controller";
import { TimeEntryDataSource } from "./datasource/time-entry.ds";
import { TimeEntryMongoDataSource } from "./datasource/time-entry.ds.mongo.service";
import { DurationService } from "./duration/duration.service";
import { ExactDurationService } from "./duration/exact-duration.service";
import { AmountService } from "./amount/amount.service";
import { FixedAmountService } from "./amount/fixed-amount.service";
import { TimeEntryResultFactory } from "./result.service";
import { DurationSettingsDataSource } from "./duration/duration-settings.ds";
import { DurationSettingsStaticDataSource } from "./duration/duration-settings.ds.static";
import { DEFAULT_DURATION_ROUND_VALUE, RoundedDurationService } from "./duration/rounded-duration.service";
import { AmountSettingsStaticDataSource, DEFAULT_HOURLY_RATE, DEFAULT_MIN_BILLABLE } from './amount/amount-settings.ds.static';
import { AmountSettingsDataSource } from './amount/amount-settings.ds';
import { TimeEntryResultCalculatorService } from './result-calculator.service';

@Module({
  imports: [MongooseModule.forFeature([{name: TimeEntry.name, schema: TimeEntrySchema}])],
  controllers: [TimeEntryController],
  providers: [{
    provide: TimeEntryDataSource,
    useClass: TimeEntryMongoDataSource
  },
  {
    provide: DurationService,
    useClass: ExactDurationService
  },
  {
    provide: AmountService,
    useClass: FixedAmountService
  },
  TimeEntryResultFactory,
  {
    provide: DurationSettingsDataSource,
    useClass: DurationSettingsStaticDataSource
  },
  ExactDurationService,
  {
    provide: DEFAULT_DURATION_ROUND_VALUE,
    useValue: 30
  },
  RoundedDurationService,
  {
    provide: DurationStrategySelectorService,
    useFactory: (exact, rounded) => {
      const srv = new DurationStrategySelectorService();
      srv.addStrategy('exact', exact);
      srv.addStrategy('rounded', rounded);
      return srv;
    },
    inject: [ExactDurationService, RoundedDurationService]
  },
  { provide: DEFAULT_HOURLY_RATE, useValue: 30 },
  { provide: DEFAULT_MIN_BILLABLE, useValue: 15 },
  { provide: AmountSettingsDataSource, useClass: AmountSettingsStaticDataSource },
  TimeEntryResultCalculatorService
]
})

export class TimeEntryModule {}