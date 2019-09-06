const fs = require("fs");

const getNorthcodersModel = callback => {
  fs.readFile(
    "../resultsFolder/northcodersFound.json",
    "utf8",
    (err, northcoders) => {
      if (err) cb(err);
      const parsedNorthcoders = JSON.parse(northcoders);
      callback(null, parsedNorthcoders);
    }
  );
};

const getSingleNorthcoderModel = (username, callback) => {
  getNorthcodersModel((err, northcoders) => {
    if (err) callback(err);
    else {
      const singleNorthcoder = northcoders.filter(
        northcoder => northcoder.username === username
      )[0];
      callback(null, singleNorthcoder);
    }
  });
};

const getNorthcoderInterestsModel = (username, callback) => {
  fs.readFile(
    "../resultsFolder/interestsNorthcoders.json",
    "utf8",
    (err, interests) => {
      if (err) callback(err);
      const parsedInterests = JSON.parse(interests);
      const singleNorthcoderInterests = parsedInterests[username];
      callback(null, singleNorthcoderInterests);
    }
  );
};

const getNorthcoderPetsModel = (username, callback) => {
  fs.readFile("../resultsFolder/petsNorthcoders.json", "utf8", (err, pets) => {
    if (err) callback(err);
    const parsedPets = JSON.parse(pets);
    const singleNorthcoderPets = parsedPets[username];
    callback(null, singleNorthcoderPets);
  });
};

module.exports = {
  getNorthcodersModel,
  getSingleNorthcoderModel,
  getNorthcoderInterestsModel,
  getNorthcoderPetsModel
};
