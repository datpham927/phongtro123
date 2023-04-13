const { categoryServices } = require("../services/categoryServices");

const category = async (req, res) => {
  try {
    const response = await categoryServices();
    res.json(response);
  } catch (error) {
    res.json({
      err: -1,
      message: error.message,
    });
  }
};

module.exports = { category };
