const db = require("../db/dbConfig");

//SHOW - get info from a user in the users table
const getProfile = async (uid) => {
  try {
    const profile = await db.one(
      `SELECT id, email, first_name, last_name, dob, photo, created_at FROM users WHERE uid=$1`,
      uid
    );
    return profile;
  } catch (error) {
    return error;
  }
};

// UPDATE - update info for a user in the users table
const updateProfile = async (user) => {
  try {
    const updatedProfile = await db.one(
      `UPDATE users SET first_name=$1, last_name=$2, dob=$3, photo=$4 WHERE id=$5 RETURNING id, email, first_name, last_name, dob, photo, created_at`,
      [user.first_name, user.last_name, user.dob, user.photo, user.id]
    );
    return updatedProfile;
  } catch (error) {
    return error;
  }
};

module.exports = {
  updateProfile,
  getProfile,
};
