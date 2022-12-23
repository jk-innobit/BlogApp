import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decodedData = jwt.verify(token, "test");
    req.name = decodedData?.name;
    req.userId = decodedData?.id;
    next();
  } catch (error) {
    res.status(401).json({ message: "please login first" });
  }
};

export default auth;
