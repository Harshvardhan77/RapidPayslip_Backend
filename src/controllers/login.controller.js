import { User } from "../models/userModel.js";
import { asyncHandler } from "../utils/ayncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email);

  if (!email || !password) {
    throw new ApiError(409, "Please enter both the fields");
  }

  const existedUser = await User.find({ email, password });

  if (existedUser.length === 0) {
    throw new ApiError(405, "Invalid username or password");
  }

  if (existedUser) {
    return res
      .status(201)
      .json(
        new ApiResponse(200, { existedUser }, "User logged-in succesfully")
      );
  }
});

export { loginUser };
