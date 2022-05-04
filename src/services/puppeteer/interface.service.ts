import { Injectable } from '@nestjs/common';


@Injectable()
export class PuppeteerService {

    async start(vendor: string): Promise<void>{
        let Service = await import(`./vendor/${vendor}.vendor`)

        
        let rooms = new Service.RoomsService()

        await rooms.start()
    }

}
