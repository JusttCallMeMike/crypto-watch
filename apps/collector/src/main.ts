/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import config from '@config'
import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const globalPrefix = 'api'
  app.setGlobalPrefix(globalPrefix)
  const port = config.collectorPort
  await app.listen(port)
  Logger.log(
    `🚀 Collector Application is running on: http://localhost:${port}/${globalPrefix}`
  )
}

bootstrap()
