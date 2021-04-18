const express = require("express");
const  router = express.Router();
const { protect } = require("../middleware/auth");

const {
   addCart,
   getCartItems,
   deleteCartItems
  } = require("../controllers/cart");

  router.post("/add/cart", addCart);
  router.get("/cart/all", getCartItems)
  router.delete("/delete/:id", deleteCartItems);
  
  
  module.exports = router