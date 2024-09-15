const puppeteer = require('puppeteer');

const launchBrowser = async () => {
  return await puppeteer.launch({ headless: true });
};

module.exports = { launchBrowser };
