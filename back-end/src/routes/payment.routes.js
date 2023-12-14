const express = require("express");
const {
  getPaymentUrl,
} = require("../controllers/payment.controller");
const paymentRoutes = express.Router();

paymentRoutes.post("/get-payment-url", getPaymentUrl);

module.exports = paymentRoutes;
