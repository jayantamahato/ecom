//login-registration

import {
  checkOTP,
  generatePassword,
  generateSalt,
  getSignature,
  phoneVerification,
  sendOTP,
  validatePhone,
} from "../../helper/index.js";
import { Cartmodel, CustomerModel, FoodModel } from "../../models/index.js";
import { checkExistingCustomer } from "../../service/index.js";

//get OTP

export const getOTP = async (req, res) => {
  const { mobileNo } = req.body;
  if (validatePhone(mobileNo)) {
    console.log(`Validate No :${validatePhone(mobileNo)}`);
    try {
      await sendOTP(mobileNo);
      return res.status(200).json({
        status: true,
        results: 0,
        data: {},
        message: `otp send on ${mobileNo}`,
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        results: 0,
        data: {},
        message: error.message,
      });
    }
  }
  return res.status(400).json({
    status: false,
    results: 0,
    data: {},
    message: "check your no",
  });
};

//verify otp
export const verifyOTP = async (req, res) => {
  const { mobileNo, otp } = req.body;

  try {
    if (await checkOTP(otp, mobileNo)) {
      if (checkExistingCustomer(mobileNo).length != 0) {
        return res.status(200).json({
          status: true,
          results: 0,
          data: checkExistingCustomer,
          message: "otp verified",
        });
      }
      return res.status(200).json({
        status: true,
        results: 0,
        data: {},
        message: "otp verified",
      });
    }
    return res.status(400).json({
      status: false,
      results: 0,
      data: {},
      message: "otp not verified",
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      results: 0,
      data: {},
      message: error.message,
    });
  }
};
//registration

export const registration = async (req, res) => {
  const { firstName, lastName, email, password, phone, address, lat, long } =
    req.body;

  try {
    const result = await checkExistingCustomer(phone);
    if (result.length > 0) {
      return res.status(400).json({
        status: false,
        results: 0,
        data: {},
        message: "user exsist",
      });
    } else {
      const salt = await generateSalt();
      const userPassword = await generatePassword(password, salt);
      const result = await CustomerModel.create({
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        isVerified: await phoneVerification(phone),
        password: userPassword,
        salt: salt,
        isLogedIn: true,
        address: address,
        lat: lat || 22.07,
        lng: long || 21.05,
        memberShip: "silver",
      });

      const payload = {
        _id: result._id,
        phone: result.phone,
        email: result.email,
      };
      return res.status(201).json({
        status: true,
        results: result.length,
        data: await getSignature(payload),
        message: "customer created",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: false,
      results: 0,
      data: {},
      message: error.message,
    });
  }
};

// profile

export const getProfile = async (req, res) => {
  try {
    if (req.user) {
      //checking user authentication
      const customer = await CustomerModel.findOne({ phone: req.user.phone }); //checking is user exist or not

      if (customer !== null) {
        res.status(200).json({
          status: true,
          results: 1,
          data: customer,
          message: "customer found ",
        });
      } else {
        res.status(400).json({
          status: false,
          results: 0,
          data: {},
          message: "user not found",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        results: 0,
        data: {},
        message: "unauthorized user",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      results: 0,
      data: {},
      message: error.message,
    });
  }
};


//logout 
export const logOut = async (req, res) => {
  try {
    if (req.user) {
      //checking user authentication
      const customer = await CustomerModel.findOne({ phone: req.user.phone }); //checking is user exist or not

      if (customer !== null) {
        customer.isLogedIn = false;
        const updateRes = await customer.save();
        res.status(200).json({
          status: true,
          results: 1,
          data: updateRes._id,
          message: "log out successfully ",
        });
      } else {
        res.status(400).json({
          status: false,
          results: 0,
          data: {},
          message: "user not found",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        results: 0,
        data: {},
        message: "unauthorized user",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      results: 0,
      data: {},
      message: error.message,
    });
  }
};

//edit profile
export const editProfile = async (req, res) => {
  const { firstName, lastName, email, address, lat, long } = req.body;

  try {
    const result = await checkExistingCustomer(req.user.phone);
    if (result != null) {
      result.first_name = firstName;
      result.last_name = lastName;
      result.email = email;
      result.address = address;
      result.lat = lat;
      result.lng = long;

      const updateResult = await result.save();

      if (updateResult) {
        return res.status(200).json({
          status: true,
          results: updateResult.length,
          data: updateResult,
          message: "customer updated",
        });
      } else {
        return res.status(400).json({
          status: false,
          results: 0,
          data: {},
          message: "not updated",
        });
      }
    } else {
      return res.status(400).json({
        status: false,
        results: 0,
        data: {},
        message: "customer does not exsist",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: false,
      results: 0,
      data: {},
      message: error.message,
    });
  }
};


//place order
export const placeOrder = async (req, res) => {};
//order list

export const orderList = async (req, res) => {};

//cancel order

export const cancelOrder = async (req, res) => {};
//reorder

export const reOrder = async (req, res) => {};
