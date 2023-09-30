import { VendorModel } from "../models/index.js";



class VendorRepo {
  //create vendor

  async createVendor(
    name,
    address,
    pin,
    email,
    phone,
    ownerName,
    password,
    foodType
  ) {
    console.log("create vendor repo.");

    try {
      const result = await VendorModel.create({
        name: name,
        address: address,
        email: email,
        phone: phone,
        coverImages: [],
        ownerName: ownerName,
        pin: pin,
        password: password,
        rating: 0,
        vendorImage: "",
        isEnable: true,
        foodType: foodType,
        salt: "test",
      });
      return result;
    } catch (error) {
     return error

 
    }
  }

  //check email

  async checkEmail(email) {
    try {
      const result = await VendorModel.find({ email: email });

      console.log(result)
      if (result) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      // console.log("Error :" + error);
      throw error
    }
  }
}
export { VendorRepo };
