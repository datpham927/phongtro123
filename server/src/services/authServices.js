const bcrypt = require("bcryptjs");
const { v4 } = require("uuid");
require("dotenv").config();
const db = require("../models");
const jwt = require("jsonwebtoken");
const hashPassword = (password) => bcrypt.hashSync(password);

const registerServices = async ({ name, password, phone }) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await db.User?.findOne({
        where: {
          phone,
        },
      });
      if (user) {
        resolve({
          err: 2,
          message: "Account already exists",
        });
      }
      await db.User.create({
        name,
        password: hashPassword(password),
        phone,
        id: v4(),
      })
        .then((user) => {
          resolve({
            err: 0,
            message: "register is successfully",
          });
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      reject(error);
    }
  });

const loginServices = async ({ phone, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await db.User?.findOne({
        where: {
          phone,
        },
      });
      if (!user) {
        resolve({
          err: 2,
          message: "Account does not exists",
        });
      } else {
        const token = jwt.sign({ user }, process.env.ACCESS_TOKEN);
        const verifyPassword = bcrypt.compareSync(password, user.password);
        resolve({
          err: verifyPassword ? 0 : 2,
          message: verifyPassword
            ? "login is successfully"
            : "Incorrect account or password",
          token: verifyPassword ? token : null,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
module.exports = { registerServices, loginServices };
