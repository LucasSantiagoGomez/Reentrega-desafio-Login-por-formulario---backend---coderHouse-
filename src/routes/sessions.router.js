import { Router } from "express";
import userModel from "../dao/models/users.js";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;

    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .send({ status: "error", error: "User already exists" });
    }

    const user = {
      first_name,
      last_name,
      email,
      age,
      password,
    };
    await userModel.create(user);
    return res
      .status(201)
      .send({ status: "success", message: "User registered" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });

    if (!user) {
      return res
        .status(400)
        .send({ status: "error", error: "Incorrect credentials" });
    }

    user.email === "adminCoder@coder.com"
      ? (user.role = "admin")
      : (user.role = "user");

    req.session.user = {
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      age: user.age,
      role: user.role,
    };

    res.send({
      status: "success",
      message: "Logged In",
      payload: req.session.user,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (!error) return res.send("Logout successful!");

    return res.send({ status: "error", message: "Logout error", body: error });
  });
});

export default router;