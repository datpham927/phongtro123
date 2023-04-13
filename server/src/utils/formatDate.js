const moment = require("moment");

const formatCurrentDate = (timeObj) => {
  const day =
    timeObj.getDay() === 0 ? "Chủ nhật" : `Thứ ${timeObj.getDay() + 1}`;
  const date = `${timeObj.getDate()}/${
    timeObj.getMonth() + 1
  }/${timeObj.getFullYear()}`;
  const time = `${timeObj.getHours()}:${timeObj.getMinutes()}`;
  return `${day}, ${time} ${date}`;
};

const generateDate = () => {
  const expires = Math.floor(Math.random() * 100) + 1;
  const currentDate = new Date();
  return {
    today: formatCurrentDate(currentDate),
    expireDate: formatCurrentDate(
      moment(currentDate).add(expires, "d").toDate()
    ),
  };
};

module.exports = generateDate;
