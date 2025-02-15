const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// app.use(cors());
// app.use(cookieParser());
app.use(express.json());

app.use("/users", userRoute);

app.get("/:id", async (req, res) => {
  try {
    res.json(req.params.id);
  } catch (error) {
    console.error({ error: error });
  }
});

const PORT = "8080" || "development";
app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
