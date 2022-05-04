import { NestFactory } from '@nestjs/core';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AppModule } from './app.module';
import { PuppeteerService } from './services/puppeteer/interface.service';
const TelegramBot = require('node-telegram-bot-api');

require('dotenv').config({ path: `../${process.env.NODE_ENV}.env` });
const cron = require('node-cron')


// @Cron(CronExpression.EVERY_MINUTE)
// export class CronHandler {

//   @Cron(CronExpression.EVERY_MINUTE)
//   async start(vendor: string): Promise<void>{
//     console.log(`CRON INICIADO ${new Date().toLocaleString("en-US", {timeZone: "America/Sao_Paulo"})}`)

//     let puppeteerService = new PuppeteerService()
  
 
//     await puppeteerService.start('daft')
  
//     console.log(`CRON FINALIZADO ${new Date().toLocaleString("en-US", {timeZone: "America/Sao_Paulo"})}`)
//   }

// }



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  const apiKey = process.env.TELEGRAM_API_KEY
  const bot = new TelegramBot(apiKey, {polling: true});
     
  bot.on('message', async (msg) => {
    const chatId = msg.chat.id;

    console.log(msg)

    bot.sendMessage(chatId, 'Recebemos sua mensagem e vamos mandar os quartos');

    let puppeteerService = new PuppeteerService()

    await puppeteerService.start(msg.text)
  });


  cron.schedule('*/2 * * * *', async () => {
    console.log(`CRON INICIADO ${new Date().toLocaleString("en-US", {timeZone: "America/Sao_Paulo"})}`)

    let puppeteerService = new PuppeteerService()

    await puppeteerService.start('daft')

    console.log(`CRON FINALIZADO ${new Date().toLocaleString("en-US", {timeZone: "America/Sao_Paulo"})}`)
  })

}

bootstrap()



