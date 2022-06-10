const jwt = require('../helpers/jwt/index');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const db = require("../models");
const Op = db.Sequelize.Op;


exports.loginAuth = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      res.status(400).send({
        message: "Email & Password required."
      });
      return;
    }

    var condition = {
      where :{
        [Op.or]: [{
          email: req.body.email
        }]
      }
    };

    const data = await db[req.params.document].findOne(condition);

    if (!data) {
      res.status(400).send({
        message: "Email not found."
      });
    } else {
      const match = await bcrypt.compare(req.body.password, data.password);
      if (match) {
        res.send({
          access_token: jwt.accessTokenEncode(data.id),
          refresh_token: jwt.refreshTokenEncode(data.id),
          user: data
        });
      } else {
        res.status(400).send({
          message: "Incorrect password"
        });
      }
    }
  } catch (error) {
    res
      .status(500)
      .send(
        {
          message: error.message
        }
      );
  }
};

exports.createAuth = async (req, res) => {
  try {

    var condition = {
      where :{
        [Op.or]: [{
          email: req.body.email
        }]
      }
    };

    const user = await db[req.params.document].findOne(condition);

    if (user) {
      res.status(400).send({
        message: "Email already in use."
      });
    } else {
      bcrypt.hash(req.body.password, saltRounds, async function (error, hash) {
        req.body.password = hash;
        const users = new db[req.params.document](req.body);
        const data = await users.save(users);

        res.send({
          access_token: jwt.accessTokenEncode(data.id),
          refresh_token: jwt.refreshTokenEncode(data.id),
          user: data
        });
      });
    }
  } catch (error) {
    res
      .status(500)
      .send(
        {
          message: error.message
        }
      );
  }
};

exports.accessToken = async (req, res) => {
  if (!req.body.access_token) {
    res.status(400).send({
      message: "Access token is required."
    });
    return;
  }

  jwt.accessTokenDecode(async function (e) {
    if (e.status) {

      try {
        const user = await db[req.params.document].findByPk(e.data.id);
        if (!user) {
          res.status(404).send({
            message: "No user found."
          });
        } else {
          res.send(user);
        }
      } catch (error) {
        res.status(500).send({
          message: error.message || "Something went wrong."
        });
      }

    } else {
      res.status(e.code).send({
        message: e.message
      });
    }
  }, req.body.access_token);
};

exports.refreshToken = async (req, res) => {
  if (!req.body.refresh_token) {
    res.status(400).send({
      message: "Refresh token is required."
    });
    return;
  }

  jwt.refreshTokenDecode(function (e) {
    if (e.status) {
      res.send({
        access_token: jwt.accessTokenEncode(e.data.id),
        refresh_token: jwt.refreshTokenEncode(e.data.id)
      });
    } else {
      res.status(e.code).send({
        message: e.message
      });
    }
  }, req.body.refresh_token);
};