import express from "express";
import registerUser from "../controller/userController";
const router = express.Router();

//서버에서 /api/user/다음여기
 router.route('/').post(registerUser)
// router.route('/login', authUser).get(()=>{

// })

export default router