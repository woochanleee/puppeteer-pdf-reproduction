const express = require("express");
const puppeteer = require("puppeteer");

const app = express();

const content = `
<html lang="ko">
    <style>
        * {
            padding: 0;
            margin: 0;
        }
    </style>
    <body>
        <div style="background-color:red;height:21cm">
        </div>
    </body>
</html>
`;

app.get("/", async (_, res) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(content);

  res.send(
    await page.pdf({
      printBackground: true,
      format: "a4",
      landscape: true,
      margin: {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
      },
    })
  );
});

app.listen(3000, () => {
  console.log("Example app listening at http://localhost:3000");
});
