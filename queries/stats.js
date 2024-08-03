const db = require("../db/dbConfig");

// Get all users and their stats from users table joining stats table
const getLeaderboard = async () => {
  try {
    const leaderboard = await db.any(
      `SELECT users.first_name, users.last_name, users.photo, users.id, stats.xp FROM users LEFT JOIN stats ON stats.user_id = users.id `
    );
    return leaderboard;
  } catch (error) {
    return error;
  }
};

// Get stats for a specific user
const getStatsByUserId = async (user_id) => {
  try {
    const statsByUserId = await db.one(
      `SELECT * FROM stats WHERE user_id = $1`,
      user_id
    );
    return statsByUserId;
  } catch (error) {
    return error;
  }
};

// CREATE - create a blank user stats for a user when a new user is added
const createUserStats = async (user_id) => {
  try {
    const newUserStats = await db.one(
      `INSERT INTO stats(user_id) VALUES($1) RETURNING *`,
      user_id
    );
    return newUserStats;
  } catch (error) {
    return error;
  }
};

// UPDATE - update user stats after a game is played
const updateUserStats = async (stats) => {
  try {
    const updatedUserStats = await db.one(
      `UPDATE stats SET xp=$1, games_played=$2, questions_correct=$3, questions_wrong=$4 WHERE user_id=$5 RETURNING *`,
      [
        stats.xp,
        stats.games_played,
        stats.questions_correct,
        stats.questions_wrong,
        stats.user_id,
      ]
    );
    return updatedUserStats;
  } catch (error) {
    throw new Error(`Failed to update user stats: ${error.message}`);
  }
};

module.exports = {
  getLeaderboard,
  getStatsByUserId,
  updateUserStats,
  createUserStats,
};
