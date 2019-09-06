const https = require("https");
const fs = require("fs");
const { getMoreData } = require("./getMoreData");

function retrieveNorthcoders() {
  const options = {
    hostname: "nc-leaks.herokuapp.com",
    path: "/api/people",
    method: "GET"
  };
  const request = https.request(options, response => {
    let data = "";
    // async packets
    response.on("data", packet => {
      data += packet;
    });
    // once all response received, to parse data and fs.writeFile()
    response.on("end", () => {
      const parsedData = JSON.parse(data);
      const northcodersArr = parsedData.people.filter(
        person => person.job.workplace === "northcoders"
      );
      fs.writeFile(
        "../resultsFolder/northcodersFound.json",
        JSON.stringify(northcodersArr),
        err => {
          if (err) throw err;
          else {
            console.log(
              `All northcoders found have been saved onto northcodersFound.json`
            );
            getMoreData("interests");
            getMoreData("pets");
          }
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

module.exports = { retrieveNorthcoders };
