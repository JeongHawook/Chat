import express from "express";
import  {registerUser , authUser} from "../controller/userController";
const router = express.Router();

//서버에서 /api/user/다음여기
 router.route('/').post(registerUser)
 router.post('/login', authUser)

export default router