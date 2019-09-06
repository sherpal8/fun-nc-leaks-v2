const https = require("https");
const fs = require("fs");

function getInstructions() {
  const options = {
    hostname: "nc-leaks.herokuapp.com",
    path: "/api/confidential",
    method: "GET"
  };
  const request = https.request(options, response => {
    // console.log("status", response.statusCode);
    let data = "";
    // async packets
    response.on("data", packet => {
      data += packet;
    });
    // completion - parse data and fs.writeFile
    response.on("end", () => {
      const parsedData = JSON.parse(data);
      fs.writeFile(
        "../resultsFolder/instructions.md",
        parsedData.crypticString,
        err => {
          if (err) throw err;
          console.log("Instructions have been saved onto intructions.md");
        }
      );
    });
  });

  // error handling
  request.on("error", err => {
    console.log(err);
  });

  // end request
  request.end();
}

module.exports = { getInstructions };
