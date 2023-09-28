import express from "express";
import {
  addFood,
  getFoods,
  updateVendorProfile,
  updateVendorService,
  vendorLogin,
  vendorProfile,
} from "../../controller/index.js";
import { authentication } from "../../middleware/auth.js";
import multer from "multer";
// import { uploadImage } from "../../middleware/foodImage.js";


const router = express.Router();


// image upload with multer
const multerStorage = multer.diskStorage({
  destination:function (req,file,cb){
   return cb(null,'./images')
  },
  filename:function (req,file,cb){
    console.log(file)
  return  cb(null,Date.now()+ file.originalname)
  }
})

const uploadImage =  multer({storage:multerStorage}).array('images', 5);
//login
router.post("/", vendorLogin);
//profile
router.use(authentication);
router.get("/profile", vendorProfile);
router.patch("/profile", updateVendorProfile);
router.patch("/service", updateVendorService);
//food
router.post("/food", uploadImage, addFood);
router.get("/foods", getFoods);
router.delete("/:id", deleteFood);


export { router as vendorRouer };
