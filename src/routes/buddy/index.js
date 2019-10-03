const express = require("express");
const router = express.Router();

router.use(require("./newBuddy"));
router.use(require("./getAllBuddies"));

module.exports = router;
