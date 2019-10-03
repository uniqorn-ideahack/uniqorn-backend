const express = require("express");
const router = express.Router();

router.use(require("./getUsers"));
router.use(require("./getUser"));

module.exports = router;
