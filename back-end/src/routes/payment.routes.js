const express = require("express");
const {
  getPaymentUrl,
  checkSumPayment,
} = require("../controllers/payment.controller");
const paymentRoutes = express.Router();

paymentRoutes.post("/get-payment-url", getPaymentUrl);
paymentRoutes.post("/checksum-payment", checkSumPayment);

module.exports = paymentRoutes;
