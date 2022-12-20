const express = require("express");
const Router = express.Router();

const todoRouter = require("./todos");
const userRouter = require("./user");

Router.use("/todos", todoRouter);
Router.use("/user", userRouter);

module.exports = Router;
