const https = require("https");
const fs = require("fs");

https
  .get("https://nc-leaks.herokuapp.com/api/confidential", response => {
    let data = "";
    // chunks of data streaming in asynchronously
    response.on("data", chunk => {
      data += chunk;
    });
    // once all response received, to parse data and fs.writeFile
    response.on("end", () => {
      const parsedData = JSON.parse(data);
      fs.writeFile("instructions.md", parsedData.crypticString, err => {
        if (err) throw err;
        console.log("Instructions have been saved onto intructions.md");
      });
    });
  })
  .on("error", err => {
    console.log("Error: " + err.message);
  });
