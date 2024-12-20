const express = require("express");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const { createIssue, listIssues, updateIssueStatus, assignIssues, addComment } = require("../controllers/issuesController");
const router = express.Router();

router.post("/", protect, createIssue);
router.get("/", protect, listIssues);
router.patch("/:id", protect, authorizeRoles('Admin', 'Project Manager'), updateIssueStatus)
router.put("/:id/assign", protect, authorizeRoles('Admin', 'Project Manager'), assignIssues)
router.post("/:id/comment", protect, addComment)

module.exports = router;