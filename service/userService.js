import { CustomerModel } from "../models/index.js";

export const checkExistingUser = async (mobile) => {
return await CustomerModel.find({ phone: mobile });
};
