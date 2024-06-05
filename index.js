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
    const screen = {
      width: 1920,
      height: 1080
    };

    chromeOptions.addArguments("--headless")
    chromeOptions.addArguments("--start-maximized");
    chromeOptions.excludeSwitches("enable-automation");
    chromeOptions.addArguments("--enable-javascript");
    chromeOptions.addArguments("--disable-gpu");
    chromeOptions.addArguments("--no-sandbox");

    chromeOptions.windowSize(screen);

    driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();

    const url = "https://x.com/i/flow/login"
    await driver.get(url);

    const username = await driver.wait(until.elementLocated(By.css('input[autocomplete="username"]')), 20000);
    await username.sendKeys(`${process.env.TWITTER_NAME}`, Key.ENTER);

    const password = await driver.wait(until.elementLocated(By.css('input[name="password"]')), 10000);
    await password.sendKeys(`${process.env.TWITTER_PASSWORD}`, Key.ENTER);

    // Check if the email input field is present
    await driver.manage().setTimeouts({ implicit: 10000 });
    const emailInputField = await driver.findElements(By.css('input[autocomplete="email"]'),10000);
    console.log(emailInputField,"check point")
    if (emailInputField.length > 0) {
      const email = await driver.findElement(By.css('input[autocomplete="email"]'));
      await email.sendKeys(`${process.env.TWITTER_EMAIL}`, Key.ENTER);
    }
    const telInputField = await driver.findElements(By.css('input[autocomplete="tel"]'),10000);

    if (telInputField.length > 0) {
      const email = await driver.findElement(By.css('input[autocomplete="tel"]'));
      await email.sendKeys(`${process.env.TWITTER_PHONE}`, Key.ENTER);
    }

    await driver.wait(until.elementLocated(By.css('div[data-testid="trend"]')), 100000);
    
    const trendDivs = await driver.findElements(By.css('div[data-testid="trend"]'), 100000);
    const trendTexts = [];
    for (let div of trendDivs) {
      const hashtagElement = await div.findElement(By.xpath('./div/div[2]/span'));
      const hashtagText = await hashtagElement.getText();
      trendTexts.push(hashtagText);
      console.log(hashtagText);
    }
    return trendTexts;
  } catch (error) {
    console.error('Error:', error);
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
}


async function getTitkle() {
  let driver;
  try {
    const chromeOptions = new chrome.Options();
    const screen = {
      width: 1920,
      height: 1080
    };
    

    chromeOptions.addArguments("--headless")
        chromeOptions.addArguments("--start-maximized");
    chromeOptions.excludeSwitches("enable-automation");
    chromeOptions.addArguments("--enable-javascript");
    chromeOptions.addArguments("--disable-gpu");
    chromeOptions.addArguments("--no-sandbox");
    chromeOptions.addArguments("--remote-debugging-port=9222")

    // chromeOptions.windowSize(screen);

    driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();

    const url = "https://x.com/i/flow/login"
    await driver.get(url);

    await driver.getTitle();
      return driver.getTitle();;// Using sleep in place of time.sleep
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
app.get('/checm', async (req, res) => {
  try {
    const trendTexts = await getTitkle();
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
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
