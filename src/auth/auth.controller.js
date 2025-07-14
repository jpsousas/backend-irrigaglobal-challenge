import { registerUser, loginUser } from "./auth.service.js";

const register = (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = registerUser(username, password);
    res
      .status(201)
      .json({ message: "User registered successfully!", user: newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = (req, res) => {
  try {
    const { username, password } = req.body;
    const token = loginUser(username, password);
    res.status(200).json({ message: "Login successful!", token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export { register, login };
