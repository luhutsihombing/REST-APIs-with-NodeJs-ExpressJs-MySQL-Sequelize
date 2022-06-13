const express = require("express");
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
app.use(express.json());
app.use(
  express.urlencoded({ extended: true })
);
const db = require("./app/models");
app.get("/", (req, res) => {
  res.json({ message: "REST APIs with NodeJs + ExpressJs + MySQL + Sequelize" });
});
require("./app/routes/auth.routes")(app);
require("./app/routes/authenticated.routes")(app);
require("./app/routes/crud.routes")(app);
require("./app/routes/file.routes")(app);
const PORT = 1616;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
