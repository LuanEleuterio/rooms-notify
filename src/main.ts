import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RoomsService } from './services/puppeteer/vendor/daft.vendor';
import { PuppeteerService } from './services/puppeteer/interface';
const cron = require('node-cron')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  cron.schedule('* * * * *', async () => {
    console.log(`CRON INICIADO ${new Date().toLocaleString("en-US", {timeZone: "America/Sao_Paulo"})}`)

    let roomInterface = new PuppeteerService()

    await roomInterface.start('daft')

    // let daft = new DaftService()
    // await daft.start()
    
    console.log(`CRON FINALIZADO ${new Date().toLocaleString("en-US", {timeZone: "America/Sao_Paulo"})}`)
  })

}
bootstrap();
