import React, { memo } from "react";
import moment from "moment";
import "moment/locale/vi";
import { Link } from "react-router-dom";
import { path } from "../utils/constant";
import { convertVietnamese } from "../utils/format/convertVietnamese";

const SitemComponent = ({ title, price, image, createdAt, id }) => {
  moment.locale("vi");
  return (
    <div className="w-full flex items-center gap-2 py-1 border-b border-gray-300">
      <Link to={`${path.DETAIL}${convertVietnamese(title).replaceAll("/", "-")}/${id}`}>
        <img
          src={image[0]}
          alt="anh"
          className="w-[65px] h-[65px] object-cover flex-none rounded-md"
        />
      </Link>
      <div className="w-full">
        <Link to={`${path.DETAIL}${convertVietnamese(title).replaceAll("/", "-")}/${id}`}>
          <h4 className="text-blue-600 text-base">{`${title?.slice(
            0,
            45
          )}...`}</h4>
        </Link>
        <div className=" flex items-center justify-between w-full">
          <span className="text-sm shrink-0 font-medium text-green-500">
            {price}
          </span>
          <span className="text-[12px] text-gray-500">
            {moment(createdAt).fromNow()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(SitemComponent);
