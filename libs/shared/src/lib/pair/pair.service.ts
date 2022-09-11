import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pair } from './schemas/pair.schema';
import { PairDto } from './dto/pair.dto';

@Injectable()
export class PairService {
  constructor(
    @InjectModel(Pair.name) private readonly pairModel: Model<Pair>
  ) {}

  private readonly logger = new Logger(PairService.name);
  async create(pair: Pair): Promise<Pair> {
    const createdPair = new this.pairModel(pair);
    return createdPair.save();
  }
  //  TODO: is there a reason to use separate dto as validation for case like that?
  // is it using schema wrong somehow?
  async createDto(createPairDto: PairDto): Promise<Pair> {
    const createdPair = new this.pairModel(createPairDto);
    return createdPair.save();
  }
  async findAll(): Promise<Pair[]> {
    return this.pairModel.find().exec();
  }
  async getByName(name: string) {
    this.logger.log({ name });
    return this.pairModel.findOne({ name }).exec();
  }
}
