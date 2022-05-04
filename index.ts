const puppeteer = require('puppeteer');

async function robot(){

 const browser = await puppeteer.launch({ headless: false})
//  const browser = await puppeteer.launch()
 const page = await browser.newPage()
 page.setViewport({ width: 1080, height: 720 });

 const urlBase = 'https://daft.ie/sharing'

 let priceTo = 550
 let priceFrom = 300
 let locations = ['dublin-city', 'dublin-24-dublin','dublin-18-dublin','dublin-18-dublin']

 let qsLoc = await genQueryString("location", locations)
 const resource = `/ireland?rentalPrice_from=${priceFrom}&rentalPrice_to=${priceTo}&${qsLoc}`

 await page.goto(urlBase + resource)

 await page.waitForSelector('.cc-modal__btn.cc-modal__btn--daft')
 await page.click('.cc-modal__btn.cc-modal__btn--daft', 'button')

 await page.waitForSelector('.cc-modal__btn.cc-modal__btn--secondary.cc-modal__btn--daft.cc-modal-btn-level-2')
 await page.click('.cc-modal__btn.cc-modal__btn--secondary.cc-modal__btn--daft.cc-modal-btn-level-2', 'button')

 let listUrlRooms = await getListUrlRooms(page)

 await getRoomInformation(page, listUrlRooms)

 //await browser.close();
}

async function getRoomInformation(page, urlRooms){

    for(let urlRoom of urlRooms) {
      // Desenvolver depois uma solução para acomodações estudantis
      if( urlRoom.includes("student-ac") ) continue
            
      await Promise.all([
          page.goto(urlRoom),
          page.waitForNavigation()
      ])

      let roomValue = await page.waitForSelector('.TitleBlock__StyledSpan-sc-1avkvav-5.fKAzIL')
      roomValue = await roomValue.evaluate(el => el.textContent)

      let roomDescription = await page.waitForSelector('.styles__StandardParagraph-sc-15fxapi-8.eMCuSm', el => el.textContent)
      roomDescription = await roomDescription.evaluate(el => el.textContent)

      let propertyAttributes = []
      let propertyOverview = await page.$$('.styles__ListLabel-sc-15fxapi-10.dDvqlf')
      for(let property of propertyOverview) propertyAttributes = [...propertyAttributes, await property.evaluate(el => el.parentNode.outerText)]
          
      let roomOwner = await page.waitForSelector('.styles__BoldText-axh9yj-5.eiBWND')
      roomOwner = await roomOwner.evaluate(el => el.textContent)

      let roomOwnerNumber = await page.$$('.NumberReveal__PhoneNumber-v2noxr-0.cLhApw')
      if(roomOwnerNumber) for(let ownerNumber of roomOwnerNumber) roomOwnerNumber = await ownerNumber.evaluate(el => el.childNodes[0].textContent)
    
      console.log(propertyAttributes)
      console.log(roomOwner)
      console.log(roomOwnerNumber)
      console.log(roomValue)
    }

}

async function getListUrlRooms(page){
    
    await page.waitForSelector('.SearchPage__Result-gg133s-2.djuMQD')
    let listRooms = await page.$$('.SearchPage__Result-gg133s-2.djuMQD')

    let roomsUrl = []
    for(let room of listRooms) roomsUrl = [...roomsUrl, await room.evaluate(el => el.childNodes[0].href)]

    return [roomsUrl[3]]
}

async function genQueryString(field,locations){
    let qs = ""

    await locations.map( loc => {
        if(qs.length > 0) qs += `&${field}=${loc}`
        else qs += `${field}=${loc}`
    })

    return qs
}

robot()
