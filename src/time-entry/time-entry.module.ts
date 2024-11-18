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
import { RoundedDurationService } from "./duration/rounded-duration.service";

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
  RoundedDurationService
]
})

export class TimeEntryModule {}