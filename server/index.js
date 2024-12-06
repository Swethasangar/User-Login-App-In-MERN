import express from "express";
import cors from "cors";

const app = express();

const PORT = 5000;

app.use(express.json());

app.use(cors());

const users = [
  {
    email: "abc@gmail.com",
    password: "123",
  },
];

const check = (a, b) => {
  return a === b;
};

const findExistingUser = (email) => {
  return users.find((user) => user.email == email);
};

app.get("/", (_, res) => {
  console.log("Get Method");
  res.send("Api is Working Fine");
});

app.post("/signup", (req, res) => {
  console.log("Signup")
  try {
    const { email, password } = req.body;

    const existingUser = findExistingUser(email);

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists.Please Log In Instead!",
      });
    }

    const userPayload = { email, password };

    users.push(userPayload);

    return res.status(201).json({ message: "Signed Up Successfully", users });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something Went Wrong!", error: error.message });
  }
});

app.get("/login/:email/:password", (req, res) => {
  try {
    const { email, password } = req.params;

    const existingUser = findExistingUser(email);

    if (!existingUser) {
      return res.status(404).json({
        message: "User Email Not Found",
      });
    }

    if (check(password, existingUser.password)) {
      return res.status(200).json({ message: "User Logged In" });
    }
    return res.status(400).json({ message: "Invalid Credential" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something Went Wrong!", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}...`);
});
