const error404 = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 404;
  res.write(JSON.stringify({ msg: "Page not found" }));
  res.end();
};

module.exports = { error404 };
