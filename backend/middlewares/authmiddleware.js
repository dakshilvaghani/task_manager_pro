import jwt from "jsonwebtoken";
import User from "../models/user.js"; // Assuming correct path to user model

const protectRoute = async (req, res, next) => {
  try {
    let token = req.cookies?.token; // Changed req.cookie.token to req.cookies.token
    if (token) {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decodedToken);
      const resp = await User.findById(decodedToken.id).select("isAdmin email"); // Corrected typo in findById and select method
      console.log("User information:", resp);
      req.user = {
        email: resp.email,
        isAdmin: resp.isAdmin,
        userId: decodedToken.userId,
      };
    }
    next();
  } catch (error) {
    console.log(error);
    // Handle error appropriately, such as sending an error response to the client
    return res
      .status(401)
      .json({ status: false, message: "not authorized. try again!" });
  }
};

const isAdminRoute = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).json({
      status: false,
      message: "Not authorized as admin",
    });
  }
};

export { isAdminRoute, protectRoute };
