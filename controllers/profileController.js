const express = require("express");
const profile = express.Router();
const {
  updateProfile, 
  getProfile,
} = require("../queries/profile");

// http://localhost:3003/api/profile/skZmowShBkPAbWHUYx6It5XdXg73
profile.get("/:uid", async (req, res) => {
  const { uid } = req.params;
  const profile = await getProfile(uid);
  if (profile.id) {
    res.status(200).json(profile);
  } else {
    res.status(500).json({ error: "Error fetching user profile" });
  }
});

// http://localhost:3003/api/profile/1
profile.put("/:user_id", async (req, res) => {
  const { user_id } = req.params;
  const updatedProfile = await updateProfile({
    id: user_id,
    ...req.body,
  });
  if (updatedProfile.id) {
    res.status(200).json(updatedProfile);
  } else {
    res.status(500).json({ error: "Error updating user profile" });
  }
});

module.exports = profile;