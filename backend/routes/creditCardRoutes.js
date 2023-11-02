const express = require("express");
const creditCardController = require("../controllers/creditCardControllers.js");
const router = express.Router();

//handle routing 
router.route("/").post(creditCardController.postCard);
router.route("/").get(creditCardController.getCards);

module.exports = router;
