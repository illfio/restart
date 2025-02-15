const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");

router.get("/getAllUsers", async (req, res) => {
  try {
    let result = await userModel.getAllUsers();
    res.json(result);
  } catch (error) {
    console.error({ error: error });
  }
});

router.get("/findUser", async (req, res) => {
  try {
    let findUser = await userModel.findUserName({
      username: req.body.username,
    });

    if (findUser[0]) res.json({ found: true });
    else res.json({ found: false });
  } catch (error) {
    console.error({ error: error });
  }
});

router.get("/findUserByID/:id", async (req, res) => {
  try {
    let userID = req.params.id;
    let findUser = await userModel.findUserByID({ userID: userID });
    if (findUser[0]) res.json({ found: true });
    else res.json({ found: false });
  } catch (error) {
    console.error({ error: error });
  }
});

router.post("/addUser", async (req, res) => {
  try {
    let findUser = await userModel.findUserName(req.body.username);

    if (findUser[0]) res.json({ message: "user already exists" });
    else {
      await userModel.addNewUser({
        username: req.body.username,
        password: req.body.password,
      });
    }

    res.json({ message: "user successfully added" });
  } catch (error) {
    console.error({ error: error });
  }
});

router.delete("/deleteUserByID/:id", async (req, res) => {
  try {
    let userID = req.params.id;
    let findUser = await userModel.findUserByID({ userID: userID });
    if (!findUser[0]) return res.json({ message: "cannot find user" });

    await userModel.deleteUserByID({ userID: userID });
    res.json({ message: "successfully deleted" });

    res.json(findUser);
  } catch (error) {
    console.error({ error: error });
  }
});

router.put("/updateUserByID/:id", async (req, res) => {
  let userID = req.params.id;
  let username = req.body?.username;
  let password = req.body?.password;
  let findUser = await userModel.findUserByID({ userID: userID });
  if (!findUser[0]) return res.json({ message: "cannot find user" });

  let result = await userModel.updateUserByID({
    userID: userID,
    username: username,
    password: password,
  });

  if (result) res.json("successfully updated");
});

module.exports = router;
