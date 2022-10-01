/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import config from '@config'

import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const appConfig = new DocumentBuilder()
    .setTitle('crypto-watch backend')
    .setDescription('The crypto-watch API description')
    .setVersion('1.0')
    .addTag('crypto-watch')
    .build()
  const document = SwaggerModule.createDocument(app, appConfig)

  const globalPrefix = 'api'
  SwaggerModule.setup(globalPrefix, app, document)

  const port = config.backendPort

  await app.listen(port)
  Logger.log(
    `🚀 Backend Application is running on: http://localhost:${port}/graphql`
  )
}

bootstrap()
