import { CustomerModel } from "../models/index.js";

export const checkExistingCustomer = async (mobile) => {
return await CustomerModel.findOne({ phone: mobile });
};
