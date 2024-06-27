import { User } from "../models/userModel.js";
import { asyncHandler } from "../utils/ayncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { FullName, email, password } = req.body;
  console.log(req.body);
  console.log(FullName);

  if (!FullName || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: { email },
  });

  if (existedUser) {
    throw new ApiError(400, "User already exist");
  }

  const user = await User.create({
    FullName,
    email,
    password,
  });

  const createdUser = await User.findById(user._id);

  if (!createdUser) {
    throw new ApiError(407, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered succesfully"));
});

export { registerUser };
