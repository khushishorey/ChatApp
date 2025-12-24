import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/generateToken.js"

export const signup = async (req,res) => {
    const { name, email, password} = req.body

    try {
        if(!name || !email || !password)
            return res.status(400).json({message: "Please fill in all the required fields"})
        if(password.length < 6)
            return res.status(400).json({message: "Password must be atleast 6 characters long"})

        const userExist = await User.findOne({email}) 

        if(userExist)
            return res.status(400).json({message: "User with this email already exists"})

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            name,
            email,
            password: hashPassword,
        })

        res.status(201).json({message: "User registered successfully"})
        
    } catch (error) {
    console.error("SIGNUP ERROR 👉", error);
    return res.status(500).json({ message: error.message });
    }

}

export const login = async (req,res) => {
    const { email, password} = req.body

    try {
        const user = await User.findOne({email})

        if(!user)
            return res.status(400).json({message: "Invalid Credentials"})

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if(!isPasswordCorrect)
            return res.status(400).json({message: "Invalid Credentials"})

        generateToken(user._id, res)

        res.status(201).json(
            {message: "Login successfull!!",
            _id: user._id,
            name: user.name,
            email: user.email,
            profilePic: user.profilePic,
            })

    } catch (error) {
    console.error("LOGIN ERROR 👉", error);
    return res.status(500).json({ message: error.message });
    }

}

export const logout = async (req,res) => {
    try {
        res.cookie("token", "", {maxAge:0})
        res.status(201).json({message: "Logged Out Successfully"})
        
    } catch (error) {
    console.error("LOGOUT ERROR 👉", error);
    return res.status(500).json({ message: error.message });
    }
}