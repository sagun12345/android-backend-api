const ErrorResponse = require("../utils/errorResponse");
const Shoes = require("../model/shoes");
const asyncHandler = require("../middleware/async");
//To get the file name extension line .jpg,.png
const path = require("path");


//--------------------CREATE shoe------------------

exports.addshoe = asyncHandler(async (req, res, next) => {
  const shoe = await Shoes.create(req.body);
    
  if (!shoe) {
    return next(new ErrorResponse("Error adding shoe"), 404);
  }

  res.status(201).json({
    success: true,
    data: shoe,
  });
});

//-------------------Display all shoes

exports.getshoes = asyncHandler(async (req, res, next) => {
  const shoe = await Shoes.find({});

  res.status(201).json({
    success: true,
    count: shoe.length,
    data: shoe,
  });
});

// // -----------------FIND shoe BY Drink-------------------

// exports.getAllDrinks = asyncHandler(async (req, res, next) => {
//   const shoe = await Shoes.find({ shoeType: "Drink" })

//   if (!shoe) {
//     return next(new ErrorResponse("shoe not found"), 404);
//   }

//   res.status(200).json({
//     success: true,
//     data: shoe,
//   });
// });

// // -----------------FIND shoe BY Vege-------------------

// exports.getAllVege = asyncHandler(async (req, res, next) => {
//   const shoe = await Shoes.find({ shoeType: "Vege" })

//   if (!shoe) {
//     return next(new ErrorResponse("shoe not found"), 404);
//   }

//   res.status(200).json({
//     success: true,
//     data: shoe,
//   });
// });

// // -----------------FIND shoe BY Non-vege-------------------

// exports.getAllNonVege = asyncHandler(async (req, res, next) => {
//   const shoe = await Shoes.find({ shoeType: "Non-vege" })

//   if (!shoe) {
//     return next(new ErrorResponse("shoe not found"), 404);
//   }

//   res.status(200).json({
//     success: true,
//     data: shoe,
//   });
// });



// // -----------------DELETE customer------------------------

// exports.deleteCustomer = asyncHandler(async (req, res, next) => {
//   const customer = await Shoes.findById(req.params.id);

//   if (!customer) {
//     return next(new ErrorResponse(`No student found `), 404);
//   }

//   await customer.remove();

//   res.status(200).json({
//     success: true,
//     count: customer.length,
//     data: {},
//   });
// });



// exports.shoeUpdate = asyncHandler(async (req, res, next) => {
//   const { id, shoeName, shoeType, shoeImage, shoePrice, shoeRating } = req.body;

//   if (!shoe) {
//     return next(new ErrorResponse(`No shoe found `), 404);
//   }

//   await Shoes.updateOne({ _id: id }, { shoeName: shoeName, shoeType: shoeType })
//     .then(function (result) {
//       res.status(200).json({ message: "shoe Updated!!" })
//     })
//     .catch(function (e) {
//       res.status(200).json({ error: e })
//     })

// });

// ------------------UPLOAD IMAGE-----------------------

exports.shoePhotoUpload = asyncHandler(async (req, res, next) => {
  const shoe = await Shoes.findById(req.params.id);

  console.log(shoe);
  if (!shoe) {
    return next(new ErrorResponse(`No student found with ${req.params.id}`), 404);
  }


  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // Make sure the image is a photo and accept any extension of an image
  // if (!file.mimetype.startsWith("image")) {
  //   return next(new ErrorResponse(`Please upload an image`, 400));
  // }

  // Check file size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  file.name = `photo_${shoe.id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.err(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    //insert the filename into database
    await Shoes.findByIdAndUpdate(req.params.id, {
      photo: file.name,
    });
  });

  res.status(200).json({
    success: true,
    data: file.name,
  });
});