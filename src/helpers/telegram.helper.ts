import { Injectable } from '@nestjs/common';

@Injectable()
export class TelegramHelper {

    formatMessage(obj: any): string{
        return `
            Link: ${obj.url}
            Owner: ${obj.owner}
            Price: ${obj.price}
        `
    }

}
