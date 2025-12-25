import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const protect = async(req,res,next) => {
    const token = req.cookies.token

    if(!token) {
        return res.status(401).json({message: "Unauthorized User"})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        const user = await User.findById(decoded.userId).select("-password")

        if(!user)
            return res.status(404).json({message: "User not found"})

        req.user = user

        next()
        
    } catch (error) {
    console.error("ERROR 👉", error);
    return res.status(500).json({ message: "Server Error" });
    }
}

