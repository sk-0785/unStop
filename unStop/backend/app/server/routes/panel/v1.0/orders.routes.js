"use strict";

const express = require("express");
const OrderManagementRoute = express.Router();
const {
  bookSeats,
  getSeatsBooked
} = require("../../../controllers/panel/orderManager");

OrderManagementRoute.post("/bookTicket", bookSeats);
OrderManagementRoute.get("/getTickets", getSeatsBooked);

// OrderManagementRoute.delete("/deleteOrder/orderId/:id", deleteOrder);
// OrderManagementRoute.delete("/deleteOrder/userId/:id", deleteOrder);
// OrderManagementRoute.get("/getOrders/orderId/:id", getOrders);



module.exports = OrderManagementRoute;