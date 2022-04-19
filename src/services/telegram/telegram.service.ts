import { Injectable } from '@nestjs/common';
import axios from 'axios'

@Injectable()
export class TelegramService {

    private apiKey = process.env.TELEGRAM_API_KEY
    private telegramUrl = process.env.TELEGRAM_BASE_URL

    async sendMessage(message: string): Promise<void>{
        await axios.post(`${this.telegramUrl}/bot${this.apiKey}/sendMessage`, {
            "chat_id": process.env.TELEGRAM_USER_CHAT_ID,
            "text": message
        })
    }

}
