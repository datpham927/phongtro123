import React, { memo } from "react";
import moment from "moment";
import "moment/locale/vi";

const SitemComponent = ({ title, price, image, createdAt }) => {
  moment.locale("vi");
  return (
    <div className="w-full flex items-center gap-2 py-2 border-b border-gray-300">
      <img
        src={image[0]}
        alt="anh"
        className="w-[65px] h-[65px] object-cover flex-none rounded-md"
      />
      <div className="w-full">
        <h4 className="text-blue-600 text-base">{`${title?.slice(
          0,
          45
        )}...`}</h4>
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
