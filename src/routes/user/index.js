const express = require("express");
const router = express.Router();

router.use(require("./getUsers"));

module.exports = router;
