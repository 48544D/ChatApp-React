import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  try {
    // check if token exists in header
    if (!req.headers.authorization)
      return res.status(401).json({ error: "Unauthorized" });

    let token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default verifyToken;
