const knex = require("../db");

const User = {
  getAllUsers: async () => {
    return await knex.select("*").from("user");
  },

  findUserName: async ({ username }) => {
    return await knex("user").where({ username });
  },

  findUserByID: async ({ userID }) => {
    return await knex("user").where({ user_id: userID });
  },

  addNewUser: async ({ username, password }) => {
    return await knex("user").insert({
      username,
      password,
    });
  },

  deleteUserByID: async ({ userID }) => {
    return await knex("user").where({ user_id: userID }).del();
  },

  updateUserByID: async ({ userID, username, password }) => {
    return await knex("user").where({ user_id: userID }).update({
      username,
      password,
    });
  },
};

module.exports = User;
