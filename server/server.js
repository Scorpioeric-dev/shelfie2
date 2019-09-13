require("dotenv/config");
const express = require("express");
const massive = require("massive");
const app = express();
const { port, connection_string } = process.env;

app.use(express.json());

//endpoints
massive(connection_string).then(database => {
  app.set("db", database);
  app.listen(port, () => console.log(`Me and my ${port}`));
});
