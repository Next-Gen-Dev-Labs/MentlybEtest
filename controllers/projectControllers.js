const asyncHandler = require("../middleware/asyncHandler");
const Project = require("../models/projectModel");
const getTeamMembersById = require("../utils/getTeamMembers");

// Create A Project
const createProject = asyncHandler(async (req, res) => {
  let { name, description, teamMembers } = req.body;

  if (!name || !description || !teamMembers) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  teamMembers = await getTeamMembersById(teamMembers);

  const project = await Project.create({
    name,
    description,
    createdBy: req.user._id,
    teamMembers,
  });

  if (project) {
    res.status(201).json(project);
  } else {
    res.status(400);
    throw new Error("Project Creation Failed! Please try again");
  }
});

// List Projects
const listProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({})
    .populate("createdBy", "name email")
    .populate("teamMembers", "name email");

  if (projects) {
    res.status(200).json(projects);
  } else {
    res.status(400);
    throw new Error("Unable to fetch projects, please try again!");
  }
});

// Update Project
const updateProject = asyncHandler(async (req, res) => {
  let { name, teamMembers, description, status } = req.body;

  teamMembers = await getTeamMembersById(teamMembers);

  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  project.name = name || project.name;
  project.description = description || project.description;
  project.teamMembers = teamMembers || project.teamMembers;
  project.status = status || project.status;

  const updatedProject = await project.save();
  if (updatedProject) {
    res.status(200).json({ message: "Project updated successfully" });
  } else {
    res.status(400);
    throw new Error("Unable to updated");
  }
});

// Delete A Project
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project) {
    await project.deleteOne();
    res.status(200).json({ message: "Projected deleted successfully" });
  } else {
    res.status(400);
    throw new Error("Process failed! please try again!");
  }
});

module.exports = { createProject, updateProject, listProjects, deleteProject };
