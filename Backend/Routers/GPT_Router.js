const GPT_Controller = require('../Contollers/GPT_Controller');
const express = require('express');

const router = express.Router();

router.get("/getinfo/:compound", (req, res) => {
    GPT_Controller(req, res);
})

module.exports = router;