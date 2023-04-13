const authRouter = require("./authRouter");
const portRouter = require("./portRouter");
const categoryRouter = require("./categoryRouter");
const priceRouter = require("./priceRouter");
const areaRouter = require("./areaRouter");
const provinceRouter = require("./provinceRouter");
const userRouter = require("./userRouter");
const insert = require("./insert");

const routes = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api", insert);
  app.use("/api/post", portRouter);
  app.use("/api/category", categoryRouter);
  app.use("/api/price", priceRouter);
  app.use("/api/province", provinceRouter);
  app.use("/api/area", areaRouter);
  app.use("/api/user", userRouter);
};

module.exports = routes;
