const { priceServices } = require("../services/priceServices");

const price = async (req, res) => {
  try {
    const response = await priceServices();
    res.json(response);
  } catch (error) {
    res.json({
      err: -1,
      message: error.message,
    });
  }
};

module.exports = { price };
