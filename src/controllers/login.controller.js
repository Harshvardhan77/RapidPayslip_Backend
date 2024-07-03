import { User } from "../models/userModel.js";
import { asyncHandler } from "../utils/ayncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)

  if (!email || !password) {
    throw new ApiError(409, "Please enter both the fields");
  }

  const existedUser = await User.findOne({ email });

  if(!existedUser){
    throw new ApiError(405, "Invalid username or password")
  }

  const isPasswordValid= await existedUser.isPasswordCorrect(password);

  if (!isPasswordValid){
    throw new ApiError(405, "Invalid password");
  }
  else{

    const accessToken= await existedUser.generateAccessToken();
    const refreshToken= await existedUser.generateRefreshToken();
    console.log(existedUser);

    return res
      .status(201)
      .json(
        new ApiResponse(200,existedUser, "User logged-in succesfully")
      );

  }  
});

export { loginUser };
