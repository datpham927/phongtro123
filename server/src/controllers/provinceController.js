const provinceServices = require("../services/provinceServices");

const province = async (req, res) => {
  try {
    const response = await provinceServices();
    res.json(response);
  } catch (error) {
    res.json({
      err: -1,
      message: error.message,
    });
  }
};

module.exports = { province };
