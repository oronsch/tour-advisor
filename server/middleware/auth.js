import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import "dotenv/config";
const env = process.env;

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, env.SECRET_KEY);
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      const googleId = decodedData?.sub.toString();
      const user = await User.findOne({ googleId });
      req.userId = user?._id;
    }
    next();
  } catch (error) {
    console.error(error);
  }
};

export default auth;
