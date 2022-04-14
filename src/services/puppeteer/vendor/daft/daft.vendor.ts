import { Injectable } from '@nestjs/common';
const puppeteer = require('puppeteer');

@Injectable()
export class DaftService {

    async start(): Promise<void> {
       await this.getRooms()
    }

    async getRooms(): Promise<void>{

        const browser = await puppeteer.launch({ headless: false})
        // const browser = await puppeteer.launch()
        const page = await browser.newPage()
        page.setViewport({ width: 1080, height: 720 });

        const urlBase = 'https://daft.ie/sharing'

        let priceTo = 550
        let priceFrom = 300
        let locations = ['dublin-city', 'dublin-24-dublin','dublin-18-dublin','dublin-18-dublin']

        let qsLoc = this.genQueryString("location", locations)
        const resource = `/ireland?rentalPrice_from=${priceFrom}&rentalPrice_to=${priceTo}&${qsLoc}`

        await page.goto(urlBase + resource)

        let listRooms = page.waitForSelector('.SearchPage__SearchResults-gg133s-3.jGQNan')

        await page.waitForSelector('.cc-modal__btn.cc-modal__btn--daft')
        await page.click('.cc-modal__btn.cc-modal__btn--daft', 'button')

        await page.waitForSelector('.cc-modal__btn.cc-modal__btn--secondary.cc-modal__btn--daft.cc-modal-btn-level-2')
        await page.click('.cc-modal__btn.cc-modal__btn--secondary.cc-modal__btn--daft.cc-modal-btn-level-2', 'button')

        // let totalRoomsDublin = await page.waitForSelector('.styles__SearchH1-sc-1t5gb6v-3.guZHZl')
        // totalRoomsDublin = await totalRoomsDublin.evaluate(el => el.textContent)
        // console.log(totalRoomsDublin)

        // await browser.close();
    }

    async getRoomInformation(): Promise<void> {

    }

    genQueryString(field: string, locations: Array<string> ): string{
        let qs = ""
    
        locations.map( loc => {
            if(qs.length > 0) qs += `&${field}=${loc}`
            else qs += `${field}=${loc}`
        })
    
        return qs
    }


}

