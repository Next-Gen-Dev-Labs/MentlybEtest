const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, "Enter a comment"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "issue title is required"],
    },
    description: {
      type: String,
      required: [true, "Issue description is required"],
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    status: {
      type: String,
      enum: ["Open", "Ongoing", "Resolved", "Closed"],
      default: "Open",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [commentSchema],
  },
  { timestamps: true }
);

const Issue = mongoose.model("Issue", issueSchema);
module.exports = Issue;
