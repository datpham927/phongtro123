const db = require("../models");

const priceServices = async () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Price?.findAll({
        raw: true,
        attributes: ["code", "value", "order"],
        order: [
          ["order", "ASC"], // sắp xếp theo thứ tự giảm dần
        ],
      });
      resolve({
        err: 0,
        data: response,
      });
    } catch (error) {
      reject(error);
    }
  });

module.exports = { priceServices };
