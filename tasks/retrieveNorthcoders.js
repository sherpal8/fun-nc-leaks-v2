const https = require("https");
const fs = require("fs");

https
  .get("https://nc-leaks.herokuapp.com/api/people", response => {
    let data = "";
    // chunks of data streaming in asynchronously
    response.on("data", chunk => {
      data += chunk;
    });
    // once all response received, to parse data and fs.writeFile()
    response.on("end", () => {
      const parsedData = JSON.parse(data);
      const northcodersArr = parsedData.people.filter(
        person => person.job.workplace === "northcoders"
      );
      fs.writeFile(
        "northcodersFound.json",
        JSON.stringify(northcodersArr),
        err => {
          if (err) throw err;
          console.log(
            "All northcoders found have been saved onto intructions.md"
          );
        }
      );
    });
  })
  .on("error", err => {
    console.log("Error: " + err.message);
  });
