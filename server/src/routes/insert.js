const express = require("express");
const nhachothue = require("../../data/nha-cho-thue.json");
const chothuematbang = require("../../data/cho-thue-mat-bang.json");
const chothuecanho = require("../../data/cho-thue-can-ho.json");
const chothuephongtro = require("../../data/cho-thue-phong-tro.json");
const bcrypt = require("bcryptjs");
const { v4 } = require("uuid");
const db = require("../models");
const autoId = require("../utils/autoId");
const {
  getNumberFromString,
  getNumberFromStringV2,
} = require("../utils/common");
const { dataArea, dataPrice } = require("../utils/data");

const hashPassword = (password) => bcrypt.hashSync(password);
const router = express.Router();

// const dataBody = [chothuematbang, chothuephongtro];
// const code = ["CTMB", "CTPT"];
const dataBody = [nhachothue, chothuecanho];
const code = ["NCT", "CTCH"];
router.post("/insert", async (req, res) => {
  try {
    dataBody.forEach((i, index) => {
      i.forEach(async (e) => {
        const attributesId = v4();
        const labelCode = autoId(e.header.class.classType);
        const userId = v4();
        const overviewId = v4();
        const imagesId = v4();
        const provinceCode = autoId(e.header.address.split(",").slice(-1)[0]);
        const categoryCode = code[index];
        let currentArea = getNumberFromString(e?.header?.attributes?.acreage);
        let currentPrice = getNumberFromString(e?.header?.attributes?.price);

        await db.Province?.findOrCreate({
          where: { code: provinceCode },
          defaults: {
            code: provinceCode,
            value: e.header.address.split(",").slice(-1)[0],
          },
        });

        await db.User.create({
          id: userId,
          name: e.contact.content?.find((item) => item.name === "Liên hệ:")
            .content,
          password: hashPassword("234434443"),
          phone: e.contact.content?.find((item) => item.name === "Điện thoại:")
            .content,
          zalo: e.contact.content?.find((item) => item.name === "Zalo").content,
          fbUrl: "does not exists",
          avatar:
            "https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/66e2e0e2f044043eeb2c780d3b06102c~c5_100x100.jpeg?x-expires=1680004800&x-signature=3807gk6%2Fgil%2FmMBd7F8zEpTIDYI%3D",
        });

        await db.Post.create({
          id: v4(),
          title: e.header.title,
          star: 5,
          labelCode,
          address: e.header.address,
          attributesId,
          categoryCode,
          description: JSON.stringify(e.mainContent.content[0]),
          userId,
          overviewId,
          imagesId,

          areaCode: dataArea?.find(
            (area) => area.max > currentArea && area.min <= currentArea
          )?.code,
          priceCode: dataPrice?.find(
            (area) => area.max > currentPrice && area.min <= currentPrice
          )?.code,
          priceNumber: getNumberFromStringV2(e?.header?.attributes?.price),
          areaNumber: getNumberFromStringV2(e?.header?.attributes?.acreage),
          provinceCode,
        });
        await db.Attribute.create({
          id: attributesId,
          price: e.header.attributes.price,
          hashtag: e.header.attributes.hashtag,
          acreage: e.header.attributes.acreage, //diện tích
          published: e.header.attributes.published,
        });
        await db.Overview.create({
          id: overviewId,
          code: e.overview.content?.find((item) => item.name === "Mã tin:")
            .content,
          area: e.overview.content?.find((item) => item.name === "Khu vực")
            .content,
          type: e.overview.content?.find((item) => item.name === "Loại tin rao:")
            .content, //diện tích
          target: e.overview.content?.find(
            (item) => item.name === "Đối tượng thuê:"
          ).content,
          created: e.overview.content?.find((item) => item.name === "Ngày đăng:")
            .content, //hết hạn

          bonus: e.overview.content?.find((item) => item.name === "Gói tin:")
            .content,
          expire: e.overview.content?.find(
            (item) => item.name === "Ngày hết hạn:"
          ).content,
        });
        await db.Image.create({
          id: imagesId,
          image: JSON.stringify(e.images),
        });
        await db.Label?.findOrCreate({
          where: { code: labelCode },
          defaults: {
            id: labelCode,
            code: e.header.class.content,
            value: e.header.class.classType,
          },
        });
      });
    });

    // dataArea.forEach(async (item, index) => {
    //   await db.Area.create({
    //     order: index,
    //     code: item?.code,
    //     value: item?.value,
    //   });
    // });
    // await dataPrice.forEach(async (item, index) => {
    //   await db.Price.create({
    //     id: v4(),
    //     order: index,
    //     code: item.code,
    //     value: item.value,
    //   });
    // });
    res.json("success");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
