const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();

global.__basedir = __dirname;

// var corsOptions = {
//   origin: "http://localhost:4200",
// };

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({ extended: true })
); /* bodyParser.urlencoded() is deprecated */

const db = require("./app/models");

async function testConnection() {
  try {
    await db.sequelize.authenticate();

    await db.sequelize.sync();
    
    // // drop the table if it already exists
    // db.sequelize.sync({ force: true }).then(() => {
    //   console.log("Drop and re-sync db.");
    // });

    console.log("Connected to Database.");

  } catch (e) {
    console.log(e.message);
  }
}

testConnection();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

require("./app/routes/auth.routes")(app);
require("./app/routes/authenticated.routes")(app);
require("./app/routes/crud.routes")(app);
require("./app/routes/file.routes")(app);

// set port, listen for requests
const PORT = 1616;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
