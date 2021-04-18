const express = require("express");
const  router = express.Router();
const { protect } = require("../middleware/auth");

const {
   addshoe,
   // shoeUpdate,
   getshoes,
   // getAllDrinks,
   // getAllVege,
   // getAllNonVege,
   shoePhotoUpload
  } = require("../controllers/shoes");

  router.post("/shoes", protect, addshoe);
  router.get("/shoes/all", getshoes)
//   router.get("/shoe/drink",getAllDrinks)
//   router.get("/shoe/vege",getAllVege)
//   router.get("/shoe/non-vege",getAllNonVege)
//   router.put("/shoe/update", protect, shoeUpdate)
  router.put("/shoes/:id/photo",protect, shoePhotoUpload);
  
  

  module.exports = router