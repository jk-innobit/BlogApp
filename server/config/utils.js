import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Buffer } from "buffer";

export const generateToken = (data) => {
  const token = jwt.sign(data, process.env.JWT_KEY, { expiresIn: 1800000 });
  return token;
};

export const isPasswordCorrect = async (password, existingPassword) => {
  const isPasswordCorrect = await bcrypt.compare(password, existingPassword);
  return isPasswordCorrect;
};

export const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword;
};

export const getDecryptedValue = (value) => {
  let decryptedValue = Buffer.from(value, "base64").toString("ascii");
  return decryptedValue;
};
