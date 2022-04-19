import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PuppeteerService } from './services/puppeteer/interface.service';
import { TelegramService } from'./services/telegram/telegram.service'

require('dotenv').config({ path: `../${process.env.NODE_ENV}.env` });
const cron = require('node-cron')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  cron.schedule('* * * * *', async () => {
    console.log(`CRON INICIADO ${new Date().toLocaleString("en-US", {timeZone: "America/Sao_Paulo"})}`)

    // let telegram = new TelegramService()

    // await telegram.sendMessage("Ola Luan")

    let puppeteerService = new PuppeteerService()

    await puppeteerService.start('daft')


    console.log(`CRON FINALIZADO ${new Date().toLocaleString("en-US", {timeZone: "America/Sao_Paulo"})}`)
  })

}
bootstrap();
