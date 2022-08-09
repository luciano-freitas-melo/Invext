const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const userControler = require('../src/controller/UserController.js');
const acaoControler = require('../src/controller/AcaoController.js')
app.use(express.json());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors())

app.get("/", (req, res) => {
    res.status(200).json({
        message: "GFour Invext"
    });
});

app.use('/usuario', userControler);
app.use('/acao', acaoControler);

module.exports = app;