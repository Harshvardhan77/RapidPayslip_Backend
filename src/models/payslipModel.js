import mongoose from "mongoose";

const payslipSchema= mongoose.Schema({
    headingTitle:{
        type:String,
        required:true
    },
    companyName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    month_year:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    logo:{
        type:String,
        required:true
    },
    payslipDetails:[{
        payslipTitle:String,
        payslipDate:String
    }],
    employeeDetails:[{
        empDetailTitle:String,
        empDetailsAmount:String
    }],
    earningDetails:[{
        earningTitle:String,
        earningAmount:String
    }],
    deductionDetails:[{
        deductionTitle:String,
        deductionAmount:String
    }],
    netPay:{
        type:Number
    },
    amount:{
        type:Number
    },
    amountInWords:{
        type:String
    },
    note:{
        type:String
    }

},{
    timestamp:true
}
)

export const Payslip=mongoose.model("payslip",payslipSchema);