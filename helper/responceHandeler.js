import pkg from "express";

const Response = pkg

class ResposeHandeler {
    // error handling when error occured
 errorHandler(error) {
    return Response.status(error.status || 500).json({
      success: false,
      message: error.message||'internal error'
    });
  };
  
  // success response and return data
   successHandler(successMsg, successData) {
      return Response.status(200).json({
        success: true,
        message: successMsg,
        data: successData
      });
   
  };
}
export {ResposeHandeler}