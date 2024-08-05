const express = require("express");
const bodyParser = require("body-parser");
const db = require("./queries");
const app = express();
const port = 3000;
// this is the built in parser middle ware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// listening to aget request on port 3000
app.get("/", (request, response) => {
  response.json({
    info: "node.js, Express and Postgres API",
  });
});

app.get("/users", db.getUsers);
app.get("/users/:id", db.getElementById);
app.post("/users", db.createUser);
app.put("/users/:id", db.updateUser);
app.delete("/users/:id", db.deleteUser);
// Seting the app to listen to port 3000 that i set before
app.listen(port, () => {
  console.log(`app is running on port ${port}.`);
});
