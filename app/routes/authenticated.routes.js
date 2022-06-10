module.exports = app => {

  const auth = require("../middlewares/auth");

  const authenticated = require("../controllers/authenticated.controller.js");

  var router = require("express").Router();

  router.put("/:document/password", authenticated.updatePassword);

  app.use("/authenticated/",auth, router);

};