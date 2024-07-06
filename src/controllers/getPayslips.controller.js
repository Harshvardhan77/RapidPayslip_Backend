import React from 'react'
import { asyncHandler } from '../utils/ayncHandler.js'
import { Payslip } from '../models/payslipModel.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const getPayslipsByUserId= asyncHandler(async(req,res)=>{
    const {userId}=req.params;

    const payslips=await Payslip.find({userId})

    if(!payslips.length){
        throw new ApiError(410,"No payslips available");
    }

    const payslipsUrl= payslips.map((payslip)=>payslip.payslip);
    console.log(payslipsUrl);

    if(payslipsUrl){
        return res.status(201).json(
            new ApiResponse(200,payslipsUrl,"Fetched Url succesfully")
        )
    }

})
 export {getPayslipsByUserId}