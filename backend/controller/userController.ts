import asyncHandler from 'express-async-handler';
import User from "../model/user"

const registerUser =asyncHandler( async (req, res) => { //순서 중요
    const { name, email, password, picture} = req.body;
    if(!name|| !email || !password || !picture){
        res.status(400);
        throw new Error("Please Enter all the Fields");
    }
    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400);
        throw new Error("User Already Exists");

    }

    const user = await User.create({
        name,
        email,
        password,
        picture,
    });
    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            picture: user.picture,
            token:generateToken(user._id)
        })
    }else{
        res.status(400);
        throw new Error("Failed to Create User")
    }
});

export default registerUser;