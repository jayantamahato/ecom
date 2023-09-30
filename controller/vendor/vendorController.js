import { validatePassword, getSignature } from "../../helper/index.js";
import { FoodModel } from "../../models/index.js";
import { findVendor } from "../../service/vendorServices.js";
import { existingEmail } from "../admin/adminController.js";

// vendor login

export const vendorLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const vendor = await existingEmail(email); //checking email

    if (vendor === null) {
      res.status(400).json({
        status: false,
        results: 0,
        data: {},
        message: "email not exist",
      });
    } else {
      if (await validatePassword(vendor.password, password, vendor.salt)) {
        //validating password
        const payload = {
          _id: vendor._id,
          name: vendor.name,
          email: vendor.email,
        };

        res.status(200).json({
          status: true,
          results: 1,
          data: await getSignature(payload),
          message: "log in successful",
        });
      } else {
        res.status(400).json({
          status: false,
          results: 0,
          data: {},
          message: "password not matched",
        });
      }
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

//vendor profile

export const vendorProfile = async (req, res) => {
  try {
    if (req.user) {
      //checking user authentication
      const vendor = await existingEmail(req.user.email); //checking is user exist or not

      if (vendor !== null) {
        res.status(200).json({
          status: true,
          results: 1,
          data: vendor,
          message: "verified user ",
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

//edit vendor profile

export const updateVendorProfile = async (req, res) => {
  const { foodType, address, name, phone } = req.body;
  // console.log(req.user)

  try {
    if (req.user) {
      //checking user authentication
      const vendor = await findVendor(req.user._id); //checking is user exist or not

      if (vendor !== null) {
        vendor.name = name;
        vendor.address = address;
        vendor.phone = phone;
        vendor.foodType = foodType;
        const updateRes = await vendor.save();

        res.status(200).json({
          status: true,
          results: 1,
          data: updateRes,
          message: "information update success",
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

//update vendor service

export const updateVendorService = async (req, res) => {
  try {
    if (req.user) {
      //checking user authentication
      const vendor = await findVendor(req.user._id); //checking is user exist or not

      if (vendor !== null) {
        vendor.isEnable = !vendor.isEnable;
        const updateRes = await vendor.save();

        res.status(200).json({
          status: true,
          results: 1,
          data: updateRes,
          message: "information update success",
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

//add food

export const addFood = async (req, res) => {
  const { name, desc, category, foodType, readyTime, price } = req.body;

  try {
    if (req.user) {
      //checking user authentication
      const vendor = await findVendor(req.user._id); //checking is user exist or not

      if (vendor !== null) {
        const file = req.files;
        var temp = file.map((element) => element.path);

        const addedResult = await FoodModel.create({
          name: name,
          desc: desc,
          category: category,
          foodType: foodType,
          readyTime: readyTime,
          price: price,
          vendorId: vendor._id,
          images: temp,
        });
        vendor.foods.push(addedResult);
        const vendorData = await vendor.save();
        if (vendorData) {
          res.status(200).json({
            status: true,
            results: 1,
            data: vendorData,
            message: "item added successfully",
          });
        } else {
          res.status(400).json({
            status: false,
            results: 0,
            data: {},
            message: "item not added",
          });
        }
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

//get foods

export const getFoods = async (req, res) => {
  try {
    const vendor = await findVendor(req.user._id);

    if (vendor === null) {
      res.status(400).json({
        status: false,
        results: 0,
        data: {},
        message: "vendor not found",
      });
    } else {
      const foodList = await FoodModel.find({ vendorId: vendor._id });

      if (foodList === null) {
        res.status(400).json({
          status: false,
          results: 0,
          data: {},
          message: "no food found",
        });
      } else {
        res.status(200).json({
          status: true,
          results: foodList.length,
          data: foodList,
          message: `got ${foodList.length} items `,
        });
      }
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

//delete food

export const deleteFood = async (req, res) => {
  try {
    const foodId = req.params.id;
    const vendor = await findVendor(req.user._id);

    if (vendor == null) {
      res.status(400).json({
        status: false,
        results: 0,
        data: {},
        message: "vendor not found",
      });
    } else {
      const deletaRes = await FoodModel.findOneAndDelete({ _id: foodId });
      if (deletaRes) {
        vendor.foods.pop(deletaRes);
        const foodDeleteData = await vendor.save();

        res.status(200).json({
          status: false,
          results: 0,
          data: {},
          message: "deleted successfully",
        });
      } else {
        console.log("no Content");
        res.status(400).json({
          status: false,
          results: 0,
          data: {},
          message: "no food found",
        });
      }
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
