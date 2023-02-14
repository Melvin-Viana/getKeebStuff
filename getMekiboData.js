const { Builder, By, Key } = require('selenium-webdriver')


function getDriver() {

  const chrome = require('selenium-webdriver/chrome')
  const options = new chrome.Options()

  options.addArguments('--headless')
  options.addArguments('--disable-dev-shm-usage')
  options.addArguments('--no-sandbox')

  const driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build()
  // await driver.get('https://mekibo.com/collections/all')

  return driver;
}

async function getPages(driver) {
  await driver.get(`https://mekibo.com/collections/in-stock`)
  await driver.sleep(1000);
  const pages = await driver.findElement(By.xpath('/html/body/main/div[1]/div[1]/div[3]/nav[2]/ul/li[5]/a'))
    .getText()
    .then(Number)
  return pages
}

async function getProductData(driver, link) {
  const data = []
  const price = await driver.findElement(By.css('.price__current span.money')).getText();
  const imageLink = await driver.findElement(By.css('figure[data-gallery-selected="true"] img')).getAttribute('src');
  const availability = await driver.findElement(By.css('.product-form--atc-button')).getText() === 'Add to cart';
  data.push(price, link, imageLink, availability && 'Available' || 'Sold Out');
  return data;
}

async function getMekiboData(driver, page) {

  await driver.get(`https://mekibo.com/collections/in-stock?page=${page}`)
  const links =  await driver.findElements(By.css('.productgrid--items h2.productitem--title a')).then((elements) => {
    const links = Promise.all(elements.map(async element => element.getAttribute('href')))
    return links;
  });
  let i = 0;
  const data = new Array(links.length)
  for (let link of links) {
    // data[i] = [];
    await driver.get(link);
    const options = await driver.findElements(By.css('.options-selection__option-value-label'));
    if(options.length === 0) {
      data[i++] = await getProductData(driver, link);
      continue;
    }
    data[i] = []

    for (let option of options) {
      //Code for multi-option
      await option.click();
      const currLink = await driver.executeScript('return document.URL');
      const d = await getProductData(driver, currLink)
      data[i].push(d)
    }
    i++;
  }
  return data;
}

const populateCSVs = () => {}
const getData = async () => {
  const driver = await getDriver()
  const pages = await getPages(driver);
  for (let i = 1; i <= pages; i++) {
    const data = await getMekiboData(driver, i);
    console.log(data.length);
  }
  driver.quit();
}
getData()
