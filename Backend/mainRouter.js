const express = require('express');
const router = express.Router();

const GPT_Router = require('./Routers/GPT_Router');

router.use("/", GPT_Router);

module.exports = router;