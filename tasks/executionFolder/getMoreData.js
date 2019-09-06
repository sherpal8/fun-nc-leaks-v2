const https = require("https");
const fs = require("fs");

function getMoreData(endpointString) {
  fs.readFile("../resultsFolder/northcodersFound.json", (err, data) => {
    let northcodersObject = {};
    if (err) console.log(err);
    else {
      const arrayOfNorthcoders = JSON.parse(data);
      const arrayWithUsername = arrayOfNorthcoders.filter(
        northcoder => northcoder.username.length > 0
      );
      arrayWithUsername.forEach(northcoder => {
        const options = {
          hostname: "nc-leaks.herokuapp.com",
          path: `/api/people/${northcoder.username}/${endpointString}`,
          method: "GET"
        };
        const request = https.request(options, response => {
          let data = "";
          response.on("data", chunk => {
            data += chunk;
          });
          response.on("end", () => {
            const parsedData = JSON.parse(data);
            if (parsedData.person) {
              northcodersObject[parsedData.person.username] =
                parsedData.person[endpointString];
              fs.writeFile(
                `../resultsFolder/${endpointString}Northcoders.json`,
                JSON.stringify(northcodersObject),
                err => {
                  if (err) throw err;
                  console.log(
                    `Northcoders' ${endpointString} have been saved onto ${endpointString}Northcoders.json`
                  );
                }
              );
            }
          });
        });

        // error handling
        request.on("error", err => {
          console.log(err);
        });

        // end request
        request.end();
      });
    }
  });
}

module.exports = { getMoreData };
