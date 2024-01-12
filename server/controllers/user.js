import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import "dotenv/config";
const env = process.env;


// User login
const signin = async (req, res) => {
  const { email, password } = req.body;
  // User ID validation by email and password
  try {
    const signedUser = await User.findOne({ email });
    if (!signedUser)
      return res.status(404).json({ message: "Wrong email or password!" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      signedUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Wrong email or password!" });

    const token = jwt.sign(
      { email: signedUser.email, id: signedUser._id },
      env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ result: signedUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.error(error);
  }
};

// User signup
const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const signedUser = await User.findOne({ email });
    if (signedUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.error(error);
  }
};

export { signin, signup };
