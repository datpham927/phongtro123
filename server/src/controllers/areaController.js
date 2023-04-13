const { areaServices } = require("../services/areaServices");

const area = async (req, res) => {
  try {
    const response = await areaServices();
    res.json(response);
  } catch (error) {
    res.json({
      err: -1,
      message: error.message,
    });
  }
};

module.exports = { area };
