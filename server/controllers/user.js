import User from "../models/user.js";
import {
  generateToken,
  getDecryptedValue,
  hashPassword,
  isPasswordCorrect,
} from "../config/utils.js";

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  const decryptedPassword = getDecryptedValue(password);
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exists." });
    const isCorrectPassword = await isPasswordCorrect(
      decryptedPassword,
      existingUser.password
    );
    if (!isCorrectPassword)
      return res.status(400).json({ message: "Invalid Credentials." });
    const token = generateToken({
      name: existingUser.name,
      email: existingUser.email,
      id: existingUser._id,
    });
    res.status(200).json({ token: token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const signUp = async (req, res) => {
  const { email, firstName, lastName, password } = req.body;
  const decryptedPassword = getDecryptedValue(password);
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(404).json({ message: "User already exists." });
    const hashedPassword = await hashPassword(decryptedPassword);
    await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });
    return res.status(200).json({ message: "SignUp Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong." });
  }
};
