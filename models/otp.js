import mongoose from "mongoose";

const OtpSchema = mongoose.Schema({
    mobile:{type:String,required:true},
    otp:{type:String,required:true},
    otp_exp:{type:Number,required:true},
    isverified:{type:Boolean,required:true},
})
const OtpModel = mongoose.model('otp',OtpSchema);
export {OtpModel}