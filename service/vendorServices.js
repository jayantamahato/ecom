import { VendorModel } from "../models/index.js"

export const findVendor = async(id)=>  {
return await VendorModel.findOne({_id:id})
} 