const services = require("../services/authServices");

const register = async (req, res) => {
  try {
    const { phone, name, password } = req.body;
    if (!phone || !name || !password) {
      return res.status(400).json({ err: 1, message: "Required input" });
    }
    const response = await services.registerServices(req.body);
    res.json(response);
  } catch (error) {
    return res.status(500).json({ err: -1, message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    if (!phone || !password) {
      return res.status(400).json({ err: 1, message: "Required input" });
    }
    const response = await services.loginServices(req.body);
    res.json(response);
  } catch (error) {
    return res.status(500).json({ err: -1, message: error.message });
  }
};

module.exports = { register, login };
