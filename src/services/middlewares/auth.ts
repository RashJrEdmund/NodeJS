import { Request, Response, NextFunction } from "express";

const User = require("../database/users");
const { verifyToken } = require("./jwt");

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.get("Authorization"); // expected string: "bearer your_token_maybe_from_jwt"
  const token = authorization?.split(" ").pop(); // to get: "your_token_maybe_from_jwt"

  if (token) {
    try {
      const bearer = verifyToken(token);
      const user = await User.findByPk(bearer.bearer_id);
      if (!user) return res.sendStatus(401);
      req.user = user.dataValues || user;
      next();
    } catch {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(401);
  }
};

const authApiKey = async (req, res, next) => {
  const API_KEY = req.header('x-api-key');

  if (!API_KEY) return res.sendStatus(401);

  const user = await User.findOne({ where: { apikey: API_KEY } });

  if (!user) return res.sendStatus(401);

  req.user = user;
  next();
}

const authAdmin = async (req, res, next) => {
  if (!req.user.is_admin) return res.sendStatus(401);
  next();
}

module.exports = { authMiddleware, authApiKey, authAdmin };