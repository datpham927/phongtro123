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

const updateUser = async (req, res) => {
  try {
    const { id } = req.user;
    if (!id) {
      return res.status(400).json({
        err: 1,
        message: "update failed"
      })
    }
    const response = await userServices.updateUser(id, req.body);
    res.status(200).json(response);
  } catch (error) {
    res.json(error);
  }
};

module.exports = { getOneUser, updateUser };
