const express = require("express");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const { createProject, listProjects, updateProject, deleteProject } = require("../controllers/projectControllers");
const router = express.Router();

router.post("/", protect, authorizeRoles('Admin', 'Project Manager'), createProject)
router.get("/", protect, listProjects)
router.patch("/:id", protect, authorizeRoles('Admin', 'Project Manager'), updateProject)
router.delete("/:id", protect, authorizeRoles('Admin', 'Project manager'), deleteProject)

module.exports = router;
