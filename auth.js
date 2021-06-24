import jwt from "jsonwebtoken";
import Model from "./model/postModel.js";

const authMiddleware = (req, res, next) => {
  const token = req.cookies.access_token;

  //토큰을 복호화
  Model.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });
    req.user = user;
    req.token = token;

    next();
  });
};

export default authMiddleware;
