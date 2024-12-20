const User = require("../models/userModel");

const getTeamMembersById = async (teamMembers) => {
  if (!Array.isArray(teamMembers)) {
    teamMembers = [teamMembers];
  }

  const members = await User.find({ email: { $in: teamMembers } }, "_id");
  const memberIds = members.map((member) => member._id);
  return memberIds;
};

module.exports = getTeamMembersById;
