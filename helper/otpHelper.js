import twilio from "twilio";
import { OtpModel } from "../models/index.js";

export const sendOTP = async (no) => {
  try {
    const OTP = parseInt(Math.random() * (9999 - 1111) + 1111);
    console.log("first1");
    const accountSid = "ACd02c379a532b5602f8758fa765e7a681";
    const authToken = "b554a47dc9ed2f3edf8b7ba2cb1ec1e4";
    const client = twilio(accountSid, authToken);

    try {
      await client.messages.create({
        body: `Your Verification Code :${OTP}`,
        from: "+12565784079",
        to: `+91${no}`,
      });
      await OtpModel.deleteOne({ mobile: no });
      await OtpModel.create({
        mobile: no,
        otp: OTP,
        otp_exp: Date.now() + 180000,
        isverified: false,
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const checkOTP = async (otp, no) => {
  const res = await OtpModel.find({ isverified: false, mobile: no });

  if (
    res[0].otp_exp > Date.now() &&
    res[0].otp === otp &&
    res.length != 0
  ) {
    await OtpModel.deleteOne({ _id: res[0].id });
    return true;
  } else {
    return false;
  }
};

export const phoneVerification = async(no)=>{
  const res = await OtpModel.find({ isverified: false, mobile: no });
  if(res.length==0)return true;else return false
}
