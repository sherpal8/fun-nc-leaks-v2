const {
  getNorthcodersModel,
  getSingleNorthcoderModel,
  getNorthcoderInterestsModel,
  getNorthcoderPetsModel
} = require("../models");

const getGreetingHomepage = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  // convention: response.write invoked with *stringifed* *{object}*
  res.write(JSON.stringify({ msg: "hello" }));
  res.end();
};

const getNorthcodersController = (req, res) => {
  getNorthcodersModel((err, northcoders) => {
    if (err) console.log(err);
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.write(JSON.stringify({ northcoders }));
    res.end();
  });
};

const getSingleNorthcoderController = (req, res) => {
  const username = req.url.split("/").pop();
  getSingleNorthcoderModel(username, (err, northcoder) => {
    if (err) console.log(err);
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.write(JSON.stringify({ northcoder }));
    res.end();
  });
};

const getNorthcoderInterestsController = (req, res) => {
  const username = req.url.split("/").pop();
  getNorthcoderInterestsModel(username, (err, interests) => {
    if (err) console.log(err);
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    const interestObject = {};
    interestObject[username] = interests;
    res.write(JSON.stringify({ interestObject }));
    res.end();
  });
};

const getNorthcoderPetsController = (req, res) => {
  const username = req.url.split("/").pop();
  getNorthcoderPetsModel(username, (err, pets) => {
    if (err) console.log(err);
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    const petsObject = {};
    petsObject[username] = pets;
    res.write(JSON.stringify({ petsObject }));
    res.end();
  });
};

module.exports = {
  getGreetingHomepage,
  getNorthcodersController,
  getSingleNorthcoderController,
  getNorthcoderInterestsController,
  getNorthcoderPetsController
};
