const db = require("../models");

const provinceServices = async () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Province?.findAll({
        raw: true,
        attributes: ["code", "value"],
      });
      resolve({
        err: 0,
        data: response,
      });
    } catch (error) {
      reject({
        err: 1,
        message: error.message,
      });
    }
  });

module.exports = provinceServices;
