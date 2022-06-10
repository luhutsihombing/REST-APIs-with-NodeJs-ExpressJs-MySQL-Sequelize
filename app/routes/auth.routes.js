module.exports = app => {
  const auth = require("../controllers/auth.controller");

  var router = require("express").Router();

  router.post("/:document", auth.loginAuth);

  router.post("/register/:document", auth.createAuth);
  
  router.post("/access-token/:document", auth.accessToken);

  router.post("/refresh-token/:document", auth.refreshToken);

  app.use("/auth", router);
};