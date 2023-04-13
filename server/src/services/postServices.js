const { Op } = require("sequelize");
const { v4 } = require("uuid");
const moment = require("moment");
const db = require("../models");
const autoId = require("../utils/autoId");
const generateDate = require("../utils/formatDate");

const getAllPostService = async (limit, page, areaNumber, priceNumber, query) =>
  new Promise(async (resolve, reject) => {
    try {
      if (limit) {
        const queries = { ...query };
        if (areaNumber?.length > 0)
          queries.areaNumber = { [Op.between]: areaNumber };
        if (priceNumber?.length > 0)
          queries.priceNumber = { [Op.between]: priceNumber };
        const response = await db.Post.findAndCountAll({
          raw: true,
          nest: true,
          where: [queries],
          include: [
            { model: db.Image, as: "images", attributes: ["image"] },
            {
              model: db.Attribute,
              as: "attributes",
              attributes: ["id", "price", "hashtag", "acreage", "published"],
            },
            {
              model: db.User,
              as: "user",
              attributes: ["name", "zalo", "phone", "avatar"],
            },
          ],
          attributes: ["id", "title", "star", "labelCode", "description"],
          offset: page * limit,
          limit: limit,
        });
        resolve({
          err: 0,
          currentPage: page,
          message: "successfully",
          data: response,
        });
      }
      const response = await db.Post.findAndCountAll({
        raw: true,
        nest: true,
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["id", "price", "hashtag", "acreage", "published"],
          },
          {
            model: db.User,
            as: "user",
            attributes: ["name", "zalo", "phone", "avatar"],
          },
        ],
        attributes: ["id", "title", "star", "labelCode", "description"],
      });
      resolve({
        err: 0,
        message: "successfully",
        data: response,
      });
    } catch (error) {
      reject({
        err: -1,
        message: error.message,
      });
    }
  });

const getNewPosts = async () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findAll({
        raw: true,
        nest: true,
        limit: 10,
        attributes: ["address", "title", "star", "createdAt"],
        include: [
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["id", "price", "hashtag", "acreage", "published"],
          },
          { model: db.Image, as: "images", attributes: ["image"] },
        ],

        order: [
          ["createdAt", "DESC"], // sắp xếp theo thứ tự giảm dần
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

const createNewPosts = async (body, user) =>
  new Promise(async (resolve, reject) => {
    try {
      const attributesId = v4();
      const labelCode = autoId(body?.title);
      const userId = user.id;
      const overviewId = v4();
      const imagesId = v4();
      const provinceCode = autoId(body?.province);
      const hashtag = `${Math.random() * Math.pow(10, 6)}`;
      const currentDate = generateDate();

      await db.Label.create({
        code: body?.title,
        value: body?.category,
        id: labelCode,
      });

      console.log("userId", userId);
      await db.Post.create({
        id: v4(),
        title: body?.title,
        labelCode,
        address: body?.address,
        attributesId,
        categoryCode: body?.categoryCode,
        description: body?.description,
        userId,
        overviewId,
        imagesId,
        areaCode: body?.areaCode,
        priceCode: body?.priceCode,
        priceNumber: body?.priceNumber,
        areaNumber: body?.areaNumber,
        provinceCode,
      });
      await db.Attribute.create({
        id: attributesId,
        price:
          body?.priceNumber < 1
            ? `${new Intl.NumberFormat().format(
                body?.priceNumber * 1000000
              )} đồng/tháng`
            : `${new Intl.NumberFormat().format(
                body?.priceNumber
              )} triệu/tháng`,
        acreage: `${body?.areaNumber} m2`, //diện tích,
        hashtag,
        published: `${moment(new Date()).format("dd/mm/yyyy")} trước`,
      });
      await db.Overview.create({
        id: overviewId,
        code: hashtag,
        area: body?.province,
        type: body?.category, //diện tích
        target: body?.target,
        expire: currentDate.expireDate, //hết hạn
        bonus: "Tin thường",
        created: currentDate.today,
      });
      await db.Image.create({
        id: imagesId,
        image: body?.images,
      });

      await db.Province.findOrCreate({
        where: {
          [Op.and]: [
            { value: body?.province.replace("Thành phố", "") },
            { value: body?.province.replace("Tỉnh", "") },
          ],
        },
        defaults: {
          code: provinceCode,
          value: body?.province.includes("Thành phố")
            ? body?.province.replace("Thành phố", "")
            : body?.province.replace("Tỉnh", ""),
        },
      });

      resolve({
        err: 0,
        message: "create post successfully",
      });
    } catch (error) {
      reject({
        err: 1,
        message: error.message,
      });
    }
  });

const getAllPostAdmin = async (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findAndCountAll({
        raw: true,
        nest: true,
        where: [{ userId: id }],
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["id", "price", "hashtag", "acreage", "published"],
          },
          {
            model: db.User,
            as: "user",
            attributes: ["name", "zalo", "phone", "avatar"],
          },
          {
            model: db.Overview,
            as: "overview",
          },
        ],
        attributes: [
          "id",
          "title",
          "star",
          "labelCode",
          "description",
          "areaNumber",
          "priceNumber",
          "address"
        ],
      });
      resolve({
        err: 0,
        message: "successfully",
        data: response,
      });
    } catch (error) {
      reject({
        err: -1,
        message: error.message,
      });
    }
  });
module.exports = {
  getAllPostService,
  getNewPosts,
  createNewPosts,
  getAllPostAdmin,
};