import express from "express"
import { getUsers, deleteUsers, blockUsers, unblockUsers } from "../controllers/user.js"

const router = express.Router()

router.get("/getusers", getUsers)
router.post("/deleteusers", deleteUsers)
router.post("/blockusers", blockUsers)
router.post("/unblockusers", unblockUsers)


export default router