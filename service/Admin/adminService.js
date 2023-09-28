import { VendorRepo } from "../../repository/index.js";

const _vendorRepo = new VendorRepo();

class AdminService {

//check vendor email 

checkVendorEmail(email){
return( _vendorRepo.checkEmail(email));
}



  //crate vendor

   createVendor(
    name,
    address,
    pin,
    email,
    phone,
    ownerName,
    password,
    foodType
  ) {
 return _vendorRepo.createVendor(
        name,
        address,
        pin,
        email,
        phone,
        ownerName,
        password,
        foodType
      );
  }
}
export { AdminService };
