import { asyncHandler } from "../utils/ayncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Payslip } from "../models/payslipModel.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const uploadPayslip=asyncHandler(async(req,res)=>{

    const {headingTitle,companyName,email,month_year,state,city,payslipDetails,
        employeeDetails,earningDetails,deductionDetails,netPay,amount,amountInWords,note}= req.body
    
    console.log("before parsing",headingTitle,companyName,email,month_year,state,city,payslipDetails,employeeDetails,earningDetails,deductionDetails);

    if(!headingTitle || !companyName ||!email ||!month_year ||!state ||!city ){
        throw new ApiError(407,"All fields required");
    }

    const parsedPayslipDetails = payslipDetails ? JSON.parse(payslipDetails) : [];
    const parsedEmployeeDetails = employeeDetails ? JSON.parse(employeeDetails) : [];
    const parsedEarningDetails = earningDetails ? JSON.parse(earningDetails) : [];
    const parsedDeductionDetails = deductionDetails ? JSON.parse(deductionDetails) : [];
    
    console.log("before parsing",parsedPayslipDetails,parsedEmployeeDetails,parsedEarningDetails,parsedDeductionDetails);


    const logoLocalPath=req.files?.logo[0]?.path;

    if(!logoLocalPath){
        throw new ApiError(400,"logo is required")
    }

    const logoImage=await uploadOnCloudinary(logoLocalPath);

    if(!logoImage){
        throw new ApiError(400,'logo file is required')
    }

    const payslipInstance= await Payslip.create({
        headingTitle,
        companyName,
        email,
        month_year,
        state,
        city,
        logo:logoImage.url,
        payslipDetails:parsedPayslipDetails,
        employeeDetails:parsedEmployeeDetails,
        earningDetails:parsedEarningDetails,
        deductionDetails:parsedDeductionDetails,
        netPay,
        amount,
        amountInWords,
        note
    })


    if(!payslipInstance){
        throw new ApiError(409,"Error while saving payslip")
    }

    if (payslipInstance) {
        return res
          .status(201)
          .json(
            new ApiResponse(200, { payslipInstance }, "payslip saved successfully")
          );
      }
})

export {uploadPayslip};