import { Request, Response, NextFunction } from "express";
import expressAsyncHandler from "express-async-handler";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../../models/UserModel.js";

// Declare global namespace for custom properties on Request object
declare global {
  namespace Express {
    interface Request {
      auth0Id?: string;
      userId?: string;
    }
  }
}

const protect = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      res.status(401).json({ message: "Unauthorized" });
      return; // return to stop further execution
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    try {
      const decoded = jwt.decode(token) as JwtPayload;
      const auth0Id = decoded.sub;

      const user = await User.findOne({ auth0Id });

      if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      req.auth0Id = auth0Id;
      req.userId = user._id.toString();

      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: "Unauthorized" });
    }
  }
);

export default protect;
