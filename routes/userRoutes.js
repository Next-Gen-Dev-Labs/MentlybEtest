const express = require("express");
const { login, signup, getUser } = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/signup", signup)
router.post("/login", login);
router.get("/profile", protect, getUser)

module.exports = router;