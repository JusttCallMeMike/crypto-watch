import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  Logger,
} from '@nestjs/common';
import { PairService } from '../pair.service';
import { Pair } from '../schemas/pair.schema';

//FIXME: I would love to return Pair instead of promise... can I do thot?
@Injectable()
export class ParsePairPipe implements PipeTransform<string, Promise<Pair>> {
  constructor(private readonly pairService: PairService) {}

  private readonly logger = new Logger(ParsePairPipe.name);

  // FIXME: now i get value of string "{pair}" WTF??????
  async transform(value: string, metadata: ArgumentMetadata): Promise<Pair> {
    const pair = await this.pairService.getByName(value);
    this.logger.debug(pair);
    return pair;
  }
}
