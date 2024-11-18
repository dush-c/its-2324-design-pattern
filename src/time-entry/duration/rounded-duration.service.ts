import { Inject, Injectable } from "@nestjs/common";
import { DurationService } from "./duration.service";

export const DEFAULT_DURATION_ROUND_VALUE = 'DEFAULT_DURATION_ROUND_VALUE';

@Injectable()
export class RoundedDurationService extends DurationService {
  constructor(@Inject(DEFAULT_DURATION_ROUND_VALUE) private roundValue: number) {
    super();
  }

  getDuration(start: Date, end: Date): number {
    const millis = end.getTime() - start.getTime();
    const minutes = millis / (60 * 1000);
    const rounded = Math.round(minutes / this.roundValue) * this.roundValue;
    return rounded / 60;
  }
}