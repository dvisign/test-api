const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dayjs = require("dayjs");

const User = require("../models/user");

const router = express.Router();

//% GET
router.get("/", (req, res, next) => {
  res.send("user");
});

//% POST
router.post("/signIn", async (req, res, next) => {
  const { userId, userPw } = req.body;
  const result = await User.findOne({
    where: {
      mb_id: userId,
    },
  });
  const { id, mb_id, createdAt, mb_password } = result?.dataValues;
  const comparePw = await bcrypt.compare(userPw, mb_password);
  if (!comparePw) {
    return res.status(403).json({
      reason: "아이디 혹은 패스워드가 틀립니다.",
    });
  }
  const accessToken = jwt.sign(
    {
      id: mb_id,
    },
    process.env.JWT_SALT,
    {
      expiresIn: "10m",
    }
  );
  const refreshToken = jwt.sign(
    {
      id: mb_id,
    },
    process.env.JWT_SALT,
    {
      expiresIn: "1M",
    }
  );
  return res.json({
    id,
    mb_id,
    createdAt: dayjs(createdAt).format("YYYY-MM-DD hh:mm"),
    accessToken, // 10m
    refreshToken, // 1M
  });
});
router.post("/signUp", async (req, res, next) => {
  const { userId, userPw } = req.body;
  try {
    const users = await User.findOne({
      where: {
        mb_id: userId,
      },
    });
    if (users) {
      return res.status(403).json({
        reason: "이미 등록된 아이디가 있습니다.",
      });
    }
    const hashPw = await bcrypt.hash(userPw, 12);
    const user = await User.create({
      mb_id: userId,
      mb_password: hashPw,
    });
    const { id, mb_id, createdAt } = user;
    return res.json({
      message: "회원가입 성공",
      user: {
        id,
        mb_id,
        createdAt: dayjs(createdAt).format("YYYY-MM-DD hh:mm"),
      },
    });
  } catch (e) {
    return res.json(e);
  }
});

module.exports = router;
