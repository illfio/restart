const express = require("express");
const router = express.Router();
const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

require("dotenv").config();
router.use(cookieParser());

// in production, encapsulate these three methods into an obj
const generateToken = async (userID, username) => {
  const secret = process.env.JWT_SECRET;

  const payload = {
    userID: userID,
    username: username,
  };

  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  return token;
};

const hashPassword = async (password) => {
  let hashed = await bcrypt.hash(password, 10);
  return hashed;
};

const comparePassword = async (password, hashedPassword) => {
  let compare = await bcrypt.compare(password, hashedPassword);
  return compare;
};

// get requests
router.get("/getAllUsers", async (req, res) => {
  try {
    let result = await User.getAllUsers();
    res.status(200).json(result);
  } catch (error) {
    console.error({ error: error });
  }
});

router.get("/findUser", async (req, res) => {
  try {
    let usernameInput = req.body.username;
    let findUser = await User.findUserName({
      username: usernameInput,
    });

    if (!findUser[0]) res.status(400).send("cannot find user");
    else res.status(200).send("user found");
  } catch (error) {
    console.error({ error: error });
  }
});

router.get("/findUserByID/:id", async (req, res) => {
  try {
    let userID = req.params.id;
    let findUser = await User.findUserByID({ userID: userID });

    if (!findUser[0]) res.status(400).send("cannot find user");
    else res.status(200).send("user found");
  } catch (error) {
    console.error({ error: error });
  }
});

// post requests
router.post("/addNewUser", async (req, res) => {
  try {
    let usernameInput = req.body.username;
    let passwordInput = req.body.password;

    // check for bad requests
    if (!usernameInput || !passwordInput) {
      res.status(404).send("bad request");
    }

    // find if user already exists
    let findUser = await User.findUserName({ username: usernameInput });
    if (findUser[0]) res.status(200).send("user already exists");
    else {
      const hashed = await hashPassword(passwordInput);
      const token = await generateToken(req.body.user_id, usernameInput);

      // hash password
      await User.addNewUser({
        username: usernameInput,
        password: hashed,
      });

      // send token for authentication
      res.status(200).json({ token });
    }

    res.send("user successfully added");
  } catch (error) {
    console.error({ error: error });
  }
});

router.post("/login", async (req, res) => {
  const usernameInput = req.body.username;
  const passwordInput = req.body.password;

  // no username or password input
  if (!usernameInput || !passwordInput) res.status(400).send("bad request");
  else {
    // cannot find user
    let findUser = await User.findUserName({ username: usernameInput });
    if (!findUser[0]) res.status(400).send("cannot find user");

    // compare passwords
    let checkPassword = await comparePassword(
      passwordInput,
      findUser[0].password
    );

    // send result
    if (!checkPassword) res.status(400).send("invalid password");
    else res.status(200).json({ message: "login successful", boolean: true });
  }
});

// delete requests
router.delete("/deleteUserByID/:id", async (req, res) => {
  try {
    let userID = req.params.id;
    let findUser = await User.findUserByID({ userID: userID });
    if (!findUser[0]) return res.status(400).send("cannot find user");

    await User.deleteUserByID({ userID: userID });
    res.status(200).send("successfully deleted");
  } catch (error) {
    console.error({ error: error });
  }
});

// put requests
router.put("/updateUserByID/:id", async (req, res) => {
  let userID = req.params.id;
  let username = req.body.username;
  let password = req.body.password;
  let findUser = await User.findUserByID({ userID: userID });
  if (!findUser[0]) return res.status(400).send("cannot find user");

  let result = await User.updateUserByID({
    userID: userID,
    username: username,
    password: password,
  });

  if (result) res.status(200).send("successfully updated");
});

module.exports = router;
