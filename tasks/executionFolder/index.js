const { getInstructions } = require("./getInstructions");
const { retrieveNorthcoders } = require("./retrieveNorthcoders");

getInstructions();
// note: getMoreData('interests') && getMoreData('pets') inserted inside async chain of retrieveNorthcoders.js
retrieveNorthcoders();
