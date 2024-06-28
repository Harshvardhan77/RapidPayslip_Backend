import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { loginUser } from "../controllers/login.controller.js";
import { uploadPayslip } from "../controllers/payslip.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/download").post(
    upload.fields([
        {
            name:"logo",
            maxCount:1
        },
    ]),
    uploadPayslip
)



export default router;
