const express = require("express");
const router = express.Router();

router.use(require("./finishChallenge"));
router.use(require("./getChallenges"));

module.exports = router;
