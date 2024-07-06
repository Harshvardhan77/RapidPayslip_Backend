import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { loginUser } from "../controllers/login.controller.js";
import { uploadPayslip } from "../controllers/payslip.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { getPayslipsByUserId } from "../controllers/getPayslips.controller.js"

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/download").post(
    upload.fields([
        {
            name:"logo",
            maxCount:1
        },
        {
            name:"payslip",
            maxCount:1
        }
    ]),
    uploadPayslip
);
router.route("/payslips/:userId").get(getPayslipsByUserId);



export default router;
