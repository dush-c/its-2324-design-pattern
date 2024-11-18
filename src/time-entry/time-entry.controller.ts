import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TimeEntry } from './time-entry.schema';
import { CalculatedTimeEntry } from './time-entry.entity';
import { CreateTimeEntryDTO } from './time-entry.dto';
import { TimeEntryDataSource } from './datasource/time-entry.ds';
import { AmountService } from './amount/amount.service';
import { TimeEntryResultFactory } from './result.service';
import { DurationSettingsDataSource } from './duration/duration-settings.ds';
import { DurationStrategySelectorService } from './duration/duration-strategy-selector.service';

@Controller('time-entries')
export class TimeEntryController {
  constructor(
    private readonly timeEntryDs: TimeEntryDataSource,
    private readonly amountSrv: AmountService,
    private readonly resultFactoryProvider: TimeEntryResultFactory,
    private readonly durationSettingsSrv: DurationSettingsDataSource,
    private readonly durationStrategySelector: DurationStrategySelectorService
  ) {}

  @Get()
  async list(): Promise<CalculatedTimeEntry[]> {
    const list: TimeEntry[] = await this.timeEntryDs.find();

    const durationSettings = await this.durationSettingsSrv.getDurationSettings();
    const durationSrv = this.durationStrategySelector.getStrategy(durationSettings.strategy);

    const resultFactory = this.resultFactoryProvider.getFactory(durationSrv, this.amountSrv);
    return list.map((e) => {
      return resultFactory(e);
    });
  }

  @Get(':id')
  async detail(@Param('id') id: string) {
    const record: TimeEntry = await this.timeEntryDs.get(id);
    if (!record) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    const durationSettings = await this.durationSettingsSrv.getDurationSettings();
    const durationSrv = this.durationStrategySelector.getStrategy(durationSettings.strategy);

    const resultFactory = this.resultFactoryProvider.getFactory(durationSrv, this.amountSrv);
    return resultFactory(record);
  }

  @Post()
  @UsePipes(new ValidationPipe({transform: true}))
  async create(@Body() createTimeEntryDTO: CreateTimeEntryDTO) {
    const record: TimeEntry = await this.timeEntryDs.create(createTimeEntryDTO);

    const durationSettings = await this.durationSettingsSrv.getDurationSettings();
    const durationSrv = this.durationStrategySelector.getStrategy(durationSettings.strategy);

    const resultFactory = this.resultFactoryProvider.getFactory(durationSrv, this.amountSrv);
    return resultFactory(record);
  }
}
