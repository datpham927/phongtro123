const db = require("../models");

const getOneUser = async (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { id },
        attributes: {
          exclude: ["password"],
        },
      });
      resolve({
        err: user ? 0 : 1,
        message: user ? "Oke" : "error",
        user,
      });
    } catch (error) {
      reject(error);
    }
  });

module.exports = { getOneUser };
