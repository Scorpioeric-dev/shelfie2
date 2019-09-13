require("dotenv").config();
const express = require("express");
const massive = require("massive");
const app = express();
const { server_port, connection_string } = process.env;
const ctrl = require('./controller')

app.use(express.json());

//endpoints
app.post('api/products',ctrl.create)
app.get('api/products',ctrl.getProducts)
app.delete('api/product/:id',ctrl.delete)



massive(connection_string).then(database => {
  app.set("db", database);
  app.listen(server_port, () => console.log(`Me and my ${server_port}`));
});
