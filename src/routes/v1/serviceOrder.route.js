const express = require("express");
const validate = require("../../middlewares/validate");
const { serviceOrderValidation } = require("../../validations");
const { serviceOrderController } = require("../../controllers");

const router = express.Router();

router
  .route("/buy")
  .post(
    validate(serviceOrderValidation.buyCoin),
    serviceOrderController.buyCoin
  )

module.exports = router;