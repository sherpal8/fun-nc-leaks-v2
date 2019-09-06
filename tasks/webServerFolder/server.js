const http = require("http");
const {
  getGreetingHomepage,
  getNorthcodersController,
  getOneNorthcoderController,
  getNorthcoderPetsController,
  getNorthcoderInterestsController
} = require("./controllers");
const { error404 } = require("./errorFolder");

const server = http.createServer((req, res) => {
  const { url, method } = req;
  console.log(`received a ${method} request on ${url}`);
  if (url === "/api" && method === "GET") {
    getGreetingHomepage(req, res);
  } else if (url === "/api/northcoders" && method === "GET") {
    getNorthcodersController(req, res);
  } else if (url.startsWith("/api/northcoders/") && method === "GET") {
    getOneNorthcoderController(req, res);
  } else if (url.startsWith("/api/interests/") && method === "GET") {
    getNorthcoderInterestsController(req, res);
  } else if (url.startsWith("/api/pets/") && method === "GET") {
    getNorthcoderPetsController(req, res);
  } else error404(req, res);
});

server.listen(9090, err => {
  if (err) console.log(err);
  console.log("server listening on port 9090");
});
