import jwt from "jsonwebtoken";

// middleware
export const checkAuth = (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.userId = decoded.id;
      next();
    } catch (error) {
      return res.json({
        message: "No data available",
      });
    }
  } else {
    return res.json({
      message: "No data available",
    });
  }
};
