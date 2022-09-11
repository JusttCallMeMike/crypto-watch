import { PairService } from '@crypto-watch/shared';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly pairService: PairService) {}
  getData(): { message: string } {
    return { message: 'Welcome to backend!' };
  }
}
