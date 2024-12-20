const asyncHandler = require("../middleware/asyncHandler");
const Project = require("../models/projectModel");
const Issue = require("../models/issueModel");
const User = require("../models/userModel");

// Create issues
const createIssue = asyncHandler(async (req, res) => {
  const { title, description, project, assignedTo } = req.body;

  if (!title || !description || !project) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  const projectExists = await Project.findById(project);
  if (!projectExists) {
    res.status(404);
    throw new Error("Project not found");
  }

  const issue = await Issue.create({
    title,
    description,
    project,
    createdBy: req.user._id,
  });

  if (issue) {
    if (assignedTo) {
      const assignedUser = await User.findOne({ email: assignedTo });
      issue.assignedTo = assignedUser._id;
      await issue.save();
    }
    res.status(201).json({ message: "Issue created successfully" });
  } else {
    res.status(400);
    throw new Error("Error creating issues");
  }
});

// List issues
const listIssues = asyncHandler(async (req, res) => {
  const {
    title,
    project,
    status,
    assignedTo,
    page = 1,
    limit = 10,
  } = req.query;

  let query = {};
  // carry out a search for keywords the title contain
  if (title) {
    query.title = { $regex: title, $options: "i" }; // 'i' makes the search case-insensitive
  }
  if (project) query.project = project;
  if (status) query.status = status;
  if (assignedTo) query.assignedTo = assignedTo;

  const total = await Issue.countDocuments(query);

  const issues = await Issue.find(query)
    .populate("project", "name")
    .populate("assignedTo", "name, email")
    .populate("createdBy", "name, email")
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  if (issues) {
    res
      .status(200)
      .json({ total, page: Number(page), limit: Number(limit), issues });
  } else {
    res.status(404);
    throw new Error("No issues found");
  }
});

// update issue status
const updateIssueStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!status) {
    res.status(400);
    throw new Error("No status selected");
  }

  const issue = await Issue.findById(req.params.id);
  if (!issue) {
    res.status(404);
    throw new Error("Issue not found");
  }

  issue.status = status;

  const updatedStatus = await issue.save();

  if (updatedStatus) {
    res.status(200).json({ message: "Issue status updated successfully" });
  } else {
    res.status(400);
    throw new Error("Error updating status, please try again");
  }
});

// Assign issues to users
const assignIssues = asyncHandler(async (req, res) => {
  const { assignedTo } = req.body;

  if (!assignedTo) {
    res.status(400);
    throw new Error("Please enter a email to assign issue to user");
  }

  const issue = await Issue.findById(req.params.id);
  if (!issue) {
    res.status(404);
    throw new Error("Issue not found");
  }

  const assignedUser = await User.findOne({ email: assignedTo });
  issue.assignedTo = assignedUser._id;
  const updatedIssue = await issue.save();

  if (updatedIssue) {
    res.status(200).json({ message: "issue assigned successfuly" });
  } else {
    res.status(400);
    throw new Error("Error assigning issue, please try again");
  }
});

// Add comments to issues
const addComment = asyncHandler(async (req, res) => {
  const { comment } = req.body;

  if (!comment) {
    res.status(400);
    throw new Error("Please enter a comment");
  }

  const issue = await Issue.findById(req.params.id);
  if (!issue) {
    res.status(404);
    throw new Error("Issue not found");
  }

  const commentobject = {
    comment,
    createdBy: req.user._id,
  };

  issue.comments.push(commentobject);
  const updatedComment = await issue.save();
  if (updatedComment) {
    res.status(201).json({ message: "Comment added successfully" });
  } else {
    res.status(400);
    throw new Error("Error adding comment");
  }
});

module.exports = {
  createIssue,
  listIssues,
  updateIssueStatus,
  assignIssues,
  addComment,
};
