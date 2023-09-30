import express from "express";
import { addToCart, cancelOrder, getOTP, getProfile, logOut, orderList, placeOrder, reOrder, registration, removeCart, removeFromCart, verifyOTP } from "../../controller/index.js";
import { authentication } from "../../middleware/auth.js";
const router = express.Router()
// -----------------------auth--------------------

//OTP

//get otp
router.post('/get-otp',getOTP)

//verify OTP
router.post('/verify-otp',verifyOTP)
//registration

router.post('/registration',registration)

//neeed authentications
router.use(authentication);
//get profile
router.get('/',getProfile)
router.get('/logout',logOut)
//update profile
router.patch('/edit')


// -----------------------orders--------------------

//place order
router.post('/order',placeOrder)
//order list
router.get('/orders',orderList)
//cancel orders
router.delete('/order/:id',cancelOrder)
//re-order
router.post('/re-order',reOrder)

// -----------------------cart--------------------

//add to cart
router.post('/add-to-cart',addToCart);
//remove from cart
router.delete('/remove-cart',removeCart);
//remove from cart by ID
router.delete('/remove-cart/:id',removeFromCart);




export {router as customerRouter}