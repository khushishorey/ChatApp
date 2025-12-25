import express from "express"
import { signup, login, logout, updateProfile } from "../controllers/authController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

router.put("/updateProfile", protect, updateProfile)


export default router