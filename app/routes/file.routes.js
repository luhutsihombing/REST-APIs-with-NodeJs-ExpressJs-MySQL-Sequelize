module.exports = app => {

  const auth = require("../middlewares/auth");

  const file = require("../controllers/file.controller.js");

  var router = require("express").Router();

  router.get("/download/:name", file.download);

  router.post("/photo", auth, file.upload);

  app.use("/file/", router);

};