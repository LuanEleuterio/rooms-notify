import { Injectable } from '@nestjs/common';
const puppeteer = require('puppeteer');

@Injectable()
export class RoomsService {

    async start(): Promise<void> {
       await this.getRooms()
    }

    async getRooms(): Promise<void>{

        // const browser = await puppeteer.launch({ headless: false})
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        page.setViewport({ width: 1080, height: 720 });
    
        const urlBase = 'https://daft.ie/sharing'
    
        let priceTo = 550
        let priceFrom = 300
        let locations = ['dublin-city', 'dublin-24-dublin','dublin-18-dublin','dublin-18-dublin']
    
        let qsLoc = await this.genQueryString("location", locations)
        const resource = `/ireland?rentalPrice_from=${priceFrom}&rentalPrice_to=${priceTo}&${qsLoc}`
    
        await page.goto(urlBase + resource)
    
        await page.waitForSelector('.cc-modal__btn.cc-modal__btn--daft')
        await page.click('.cc-modal__btn.cc-modal__btn--daft', 'button')
    
        await page.waitForSelector('.cc-modal__btn.cc-modal__btn--secondary.cc-modal__btn--daft.cc-modal-btn-level-2')
        await page.click('.cc-modal__btn.cc-modal__btn--secondary.cc-modal__btn--daft.cc-modal-btn-level-2', 'button')
    
        let listUrlRooms = await this.getListUrlRooms(page)
    
        await this.getRoomInformation(page, listUrlRooms)
    
        // let totalRoomsDublin = await page.waitForSelector('.styles__SearchH1-sc-1t5gb6v-3.guZHZl')
        // totalRoomsDublin = await totalRoomsDublin.evaluate(el => el.textContent)
        // console.log(totalRoomsDublin)
    
        await browser.close();
    }

    async getRoomInformation(page: any, urlRooms: Array<string> ): Promise<void> {
        for(let urlRoom of urlRooms) {
            // Desenvolver depois uma solução para acomodações estudantis
            if( urlRoom.includes("student-ac") ) continue
            
            await Promise.all([
                page.goto(urlRoom),
                page.waitForNavigation()
            ])
    
            let roomValue = await page.waitForSelector('.TitleBlock__StyledSpan-sc-1avkvav-5.fKAzIL')
            roomValue = await roomValue.evaluate(el => el.textContent)
        
            console.log(roomValue)
        }
    }

    async getListUrlRooms(page: any): Promise<Array<string>> {
        await page.waitForSelector('.SearchPage__Result-gg133s-2.djuMQD')
        let listRooms = await page.$$('.SearchPage__Result-gg133s-2.djuMQD')

        let roomsUrl = []
        for(let room of listRooms) roomsUrl = [...roomsUrl, await room.evaluate(el => el.childNodes[0].href)]

        return roomsUrl
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

