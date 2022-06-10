const uploadFile = require("../middlewares/upload");
const fs = require('fs');

exports.upload = async (req, res) => {
    try {
        if(!fs.existsSync(__basedir + "/app/storage/files/")) {
            fs.mkdirSync(__basedir + "/app/storage/files/");
        }

        await uploadFile(req, res);

        if (req.file == undefined) {
            return res.status(400).send({
                message: "Please upload a file!"
            });
        }

        res.status(200).send({
            message: "File has been uploaded.",
            name: req.file.originalname
        });
    } catch (error) {
        if (error.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "File size cannot be larger than 2MB!",
            });
        }

        res.status(500).send({
            message: error,
        });
    }
};

exports.download = async (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/app/storage/files/";

    res.download(directoryPath + fileName, fileName, (error) => {
        if (error) {
            res.status(500).send({
                message: error,
            });
        }
    });
};