const db = require("../models");

const getOneUser = async (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await db.User?.findOne({
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
const updateUser = async (id,data) =>
  new Promise(async (resolve, reject) => {
    try {
       const response=await db.User.update(data,{
        where: { id },
      });
      resolve({
        err: response[0]==1?0:1 ,
        message:  response[0]==1? "Oke" :"Error",
      });
    } catch (error) {
      reject(error);
    }
  });

module.exports = { getOneUser,updateUser };
