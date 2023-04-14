const db = require("../models");

const categoryServices = async () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Category?.findAll({
        raw: true,
        attributes: ["code", "value"],
      });
      resolve({
        err: 0,
        data: response,
      });
    } catch (error) {
      reject(error);
    }
  });

module.exports = { categoryServices };
