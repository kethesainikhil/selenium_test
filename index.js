const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const express = require('express')
const app = express();

require('dotenv').config();

async function loginToTwitter() {
  let driver;
  try {
    const chromeOptions = new chrome.Options();
    chromeOptions.addArguments("--start-maximized");
    chromeOptions.excludeSwitches("enable-automation");

    driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();

    const url = "https://x.com/i/flow/login"
    await driver.get(url);

    const username = await driver.wait(until.elementLocated(By.css('input[autocomplete="username"]')));
    await username.sendKeys(`${process.env.TWITTER_NAME}`, Key.ENTER);

    const password = await driver.wait(until.elementLocated(By.css('input[name="password"]')));
    await password.sendKeys(`${process.env.TWITTER_PASSWORD}`, Key.ENTER);

    await driver.wait(until.elementLocated(By.css('div[data-testid="trend"]')));
    
      const trendDivs = await driver.findElements(By.css('div[data-testid="trend"]'));
      const trendTexts = [];
      for (let div of trendDivs) {
        const hashtagElement = await div.findElement(By.xpath('./div/div[2]/span'));
        
        const hashtagText = await hashtagElement.getText();
      
        trendTexts.push(hashtagText);
        console.log(hashtagText);
      }
      return trendTexts;// Using sleep in place of time.sleep
  } catch (error) {
    console.error('Error:', error);
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
}

app.get('/get-hashtags', async (req, res) => {
  try {
    const trendTexts = await loginToTwitter();
    res.send(trendTexts);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});
app.get("/get",async(req,res)=>{
  console.log(process.env.TWITTER_NAME)
  console.log(process.env.TWITTER_PASSWORD)
})
app.listen(3000, () => {
  console.log('Server started on port 3000');
});