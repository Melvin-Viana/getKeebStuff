# Get Keeb Stuff
- Scripts to generate csv data w/ Keyboard Products from various keyboard vendor websites
- Gets the following data:
  1. price
  1. image
  1. product link
  1. availbility
  1. product name

## My Environment
  - WSL
  - Ubuntu v20.04
  - Node v18.13.0
  - Runs on a headless browser (google-chrome-stable) v. 110.0.5481.77
  - Runs on chromedriver v. 110.5481.30

## Prequisites
- Node.js
- Chrome and Firefox webdrivers https://www.npmjs.com/package/selenium-webdriver
- WSL setup:
  1. Enable WSL
  2. Install distro
- Google-Chrome-Stable `sudo apt-get install google-chrome-stable`
- Check for version of google chrome `google-chrome-stable --version`
- Install the correct chromedriver from: https://chromedriver.chromium.org/downloads
  - Make sure the first three numbers match i.e. 110.0.5481(chrome-stable) === 110.0.5481
  - Install through bash:
  `wget ${chrome_driverlink}`
  For my case it was `wget https://chromedriver.storage.googleapis.com/110.0.5481.77/chromedriver_linux64.zip`
  - Unzip: `unzip chromedriver_linux64.zip`
  - Place into linux applications folder `sudo ln -s chromedriver /usr/bin/chromedriver`
  - Confirm version: `chromedriver --version`

## Usage:
- Start chromedriver: `chromedriver`
- Start a Linux display [this is needed because linux won't be able to open chrome](https://medium.com/@muhammetenginar/selenium-nodejs-on-ubuntu-vm-18-04-chrome-78-x-bbbcb30d674e): `npm run start-xrsv`
- Run the data you want: `node getMekiboData.js` => gets the Mekibo in stock products and places them in a csv file

## Websites:
- Mekibo


## Notes:

- Setting up selenium doesn't work well on WSL.
- The scripts run on headless browser and extracts data from the websites
- Potential issues with structure, may need to create driver in the same scope. Passing driver as a parameter sometimes works, sometimes doesn't.