const userServices = require("../services/userServices");

const getOneUser = async (req, res) => {
  try {
    const { id } = req.user;

    const response = await userServices.getOneUser(id);
    res.status(200).json(response);
  } catch (error) {
    res.json(error);
  }
};

module.exports = { getOneUser };
