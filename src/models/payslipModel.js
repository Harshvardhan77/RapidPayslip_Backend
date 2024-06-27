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
        payslipValue:Number
    }],
    employeeDetails:[{
        employeeTitle:String,
        employeeValue:Number
    }],
    earningDetails:[{
        earningTitle:String,
        earningValue:Number
    }],
    deductionDetails:[{
        deductionTitle:String,
        deductionValue:Number
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