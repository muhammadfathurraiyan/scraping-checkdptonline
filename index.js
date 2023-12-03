const express = require("express");
const { default: puppeteer } = require("puppeteer");
const app = express();
const port = 3000;

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  page.setDefaultNavigationTimeout(0);

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
  );

  await page.goto("https://cekdptonline.kpu.go.id/");

  await page.type("input#__BVID__19", "NomorNik");

  await page.click("button.btn:nth-child(2)");

  await new Promise((r) => setTimeout(r, 1000));

  const finalResponse = await page.waitForResponse(
    "https://cekdptonline.kpu.go.id/apilhp"
  );
  let responseJson = await finalResponse.json();
  console.log(responseJson);


  await browser.close();
})();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
