import User from "../models/User.js"
import bcrypt from "bcryptjs"

export const signup = async (req,res) => {
    const { name, email, password} = req.body

    try {
        if(!name || !email || !password)
            return res.status(400).json({message: "Please fill all required fields"})
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
        
    }catch (error) {
    console.error("SIGNUP ERROR 👉", error);
    return res.status(500).json({ message: error.message });
    }

}

export const login = async (req,res) => {
    res.send("Signup Page")
}

export const logout = async (req,res) => {
    res.send("Signup Page")
}