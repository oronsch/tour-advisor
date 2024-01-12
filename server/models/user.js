import mongoose from "mongoose";
import Joi from "joi";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, min: 2, max: 24 },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
  },
  password: { type: String, required: false, min: 6, max: 24 },
  id: { type: String },
});

const User = mongoose.model("User", userSchema);

// Create User validations
function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(24).required(),
    email: Joi.string()
      .$_match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
      .required()
      .email(),
    password: Joi.string().min(6).max(24).required(),
  });

  return schema.validate(user);
}

export { validateUser, User };
