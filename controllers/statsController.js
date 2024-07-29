const express = require("express");
const stats = express.Router();
const {
  getStatsByUserId,
  updateUserStats,
  getLeaderboard,
} = require("../queries/stats");

// http://localhost:3003/api/stats/leaderboard
stats.get("/leaderboard", async (req, res) => {
  const leaderboard = await getLeaderboard();
  if (leaderboard[0]) {
    res.status(200).json(leaderboard);
  } else {
    res.status(500).json({ error: "Error fetching leaderboard" });
  }
});

// http://localhost:3003/api/stats/1
stats.get("/:user_id", async (req, res) => {
  const { user_id } = req.params;
  const userStats = await getStatsByUserId(user_id);
  if (userStats.id) {
    res.status(200).json(userStats);
  } else {
    res.status(500).json({ error: "Error fetching user stats" });
  }
});

// http://localhost:3003/api/stats/1
stats.put("/:user_id", async (req, res) => {
  const { user_id } = req.params;
  const { xp, games_played, questions_correct, questions_wrong } = req.body;
  try {
    const userStats = await getStatsByUserId(user_id);
    if (!userStats) {
      return res.status(404).json({ error: "User stats not found" });
    }

    const updatedUserStats = await updateUserStats({
      user_id,
      xp: userStats.xp + xp,
      games_played: userStats.games_played + games_played,
      questions_correct: userStats.questions_correct + questions_correct,
      questions_wrong: userStats.questions_wrong + questions_wrong,
    });
    res.status(200).json(updatedUserStats);
  } catch (error) {
    console.error("Error updating user stats:", error);
    res.status(500).json({ error: "Failed to update user stats" });
  }
});

module.exports = stats;
