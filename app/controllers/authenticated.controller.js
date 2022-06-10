const jwt = require('../helpers/jwt/index');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const db = require("../models");

exports.updatePassword = async (req, res) => {
    try {

        if(!req.body.old_password || !req.body.password) {
            res.status(400).send({
                message: "Old & new password is required."
            });
            return;
        }

        const id = req.user.id;

        const user = await db[req.params.document].findByPk(id);

        if (!user) {
            res.status(404).send({
                message: "No user found."
            });
        } else {
            const match = await bcrypt.compare(req.body.old_password, user.password);
            if (match) {
                bcrypt.hash(req.body.password, saltRounds, async function(error, hash) {
                    db[req.params.document].update(
                        {
                            password: hash
                        },
                        {
                            where : {
                                id : id
                            }
                        }
                        )
                        .then(data => {
                            if (!data) {
                                res.status(404).send({
                                    message: `Cannot update with id=${id}`
                                });
                            } else {
                                res.send({
                                    message : "Updated."
                                })
                            };
                        })
                        .catch(error => {
                            res.status(500).send({
                                message: error.message || "Error updating with id=" + id
                            });
                        });
                });
            } else {
                res.status(400).send({
                    message: `Incorrect old password.`
                });
            }
        }

    } catch (error) {
        res
            .status(500)
            .send({
                message: error.message
            });
    }
};