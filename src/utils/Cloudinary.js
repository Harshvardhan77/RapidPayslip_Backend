import {v2 as cloudinary} from "cloudinary"
import { configDotenv } from "dotenv";
import fs from "fs"

configDotenv();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary=async(localfilepath)=>{
try {
    // Upload the image
    if(!localfilepath){
        return null;
    }
    const result = await cloudinary.uploader.upload(localfilepath,{
        resource_type:"auto"
    });

    return result;

  } catch (error) {
    fs.unlinkSync(localfilepath)
    console.error(error);
  }
}

export {uploadOnCloudinary}