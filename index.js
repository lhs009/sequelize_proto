const express = require("express");
const { sequelize, User } = require("./models");
const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

sequelize
  .sync()
  .then(() => {
    console.log("✓ DB connection success.");
  })
  .catch((err) => {
    console.error(err);
    process.exit();
  });

app.get("/", (req, res) => res.json({ result: "OK computer" }));

app.get("/users", async (req, res) => {
  try {
    const result = await User.findAll();
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(503).json(error);
  }
});

app.get("/users/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await User.findOne({ where: { userId } });
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(503).json(error);
  }
});

app.post("/users", async (req, res) => {
  const { loginId, password, nickname } = req.body;

  try {
    const result = await User.create({ loginId, password, nickname });
    res.json(result);
  } catch (error) {
    res.status(503).json(error);
  }
});

app.put("/users/:id", async (req, res) => {
  const { nickname } = req.body;
  const userId = req.params.id;
  console.log(userId, nickname);

  try {
    const result = await User.update({ nickname }, { where: { userId } });
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(503).json(error);
  }
});

app.delete("/users/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await User.destroy({ where: { userId } });
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(503).json(error);
  }
});

app.listen(3000, () => console.log(`listening at http://localhost:3000`));
