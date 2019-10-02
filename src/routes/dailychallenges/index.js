const express = require("express");
const router = express.Router();

router.use(require("./addTrait"));
router.use(require("./getTraits"));

module.exports = router;
