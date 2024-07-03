import mongoose from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema= mongoose.Schema(
    {
        FullName:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        refreshToken:{
            type:String,
        }
   },{
    timestamps:true
   }
)

userSchema.plugin(mongooseAggregatePaginate)

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
    this.password= await bcrypt.hash(this.password,10)
    next()
    }else{
        return next()
    }
})

userSchema.methods.isPasswordCorrect= async function(password){
    try{
    return await bcrypt.compare(password,this.password)
    }
    catch(error){
        console.log(error)
    }
}

userSchema.methods.generateAccessToken= function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            FullName:this.FullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken= async function(){
     const refreshToken=jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
  this.refreshToken = refreshToken;
  await this.save();

  return this.refreshToken;
}

export const User= mongoose.model("User",userSchema);