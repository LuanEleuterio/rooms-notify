import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DaftService } from './services/puppeteer/vendor/daft/daft.vendor';
const cron = require('node-cron')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  cron.schedule('* * * * *', async () => {
    console.log(`CRON INICIADO ${new Date().toLocaleString("en-US", {timeZone: "America/Sao_Paulo"})}`)

    let daft = new DaftService()
    await daft.start()
    
    console.log(`CRON FINALIZADO ${new Date().toLocaleString("en-US", {timeZone: "America/Sao_Paulo"})}`)
  })

}
bootstrap();
