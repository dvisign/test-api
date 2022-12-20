const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const apiRoute = require("./router");
const { sequelize } = require("./models");
dotenv.config();
const app = express();

sequelize
  .sync()
  .then(() => {
    console.log("DB 연결 성공");
  })
  .catch(console.error);

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieParser(process.env.PASS_SALT));
app.use(
  session({
    resave: false, // 매번 세션 강제 저장
    saveUninitialized: false, // 빈 세션값도 저장
    secret: process.env.COOKIE_SECRET, // 쿠키암호화
    cookie: {
      httpOnly: true, // 쿠키를 자바스크립트에서 접근 금지
      secure: false, // https 사용시 true
    },
    name: "__aleinfeo#", // 쿠키이름 명명
  })
);

app.use("/api", apiRoute);
app.use("/storage", express.static(path.join(__dirname, "./upload")));

app.listen(5000, (err) => {
  if (err) throw err;
  console.log("start server");
});
