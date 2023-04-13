import { useState } from "react";
import { Link } from "react-router-dom";

function ItemComponent({ images, attributes, user, description, star, title }) {
  const [hoverHeart, setHoverHeart] = useState(false);
  return (
    <div className="flex border-solid border-t-[1px] border-red-custom py-4">
      <div className="block w-[170px] h-[160px] relative  shrink-0 rounded-md overflow-hidden cursor-pointer">
        <img src={images[0]} alt="" />
        <span className="absolute   bg-[rgba(0,0,0,.5)] text-sm text-white px-1 rounded-md left-2 bottom-2">
          {images?.length} ảnh
        </span>
        <span
          className={`absolute bottom-0 right-2    ${
            hoverHeart ? "text-red-500" : " text-white"
          }`}
          onMouseEnter={() => setHoverHeart(true)}
          onMouseLeave={() => setHoverHeart(false)}
        >
          <ion-icon
            name={`${hoverHeart ? "heart" : "heart-outline"}`}
          ></ion-icon>
        </span>
      </div>
      <div className="ml-3 flex-1">
        <Link className="text-orange-600 text-base font-semibold cursor-pointer hover:underline">
          <span className="text-yellow-400 text-sm">
            <ion-icon name="star"></ion-icon>
            <ion-icon name="star"></ion-icon>
          </span>
          {title}
        </Link>
        <div className="flex justify-between my-2 ">
          <span className="text-green-500 text-lg">{attributes.price}</span>
          <span className="text-base">{attributes.acreage}</span>
          <span className="text-base">{attributes.price}</span>
          <span className="text-sm text-gray-400">{attributes.published}</span>
        </div>
        <p className="text-sm text-gray-500">{description}</p>
        <div className="flex justify-between  mt-3 ">
          <div className="flex gap-2 items-center">
            <img
              className="w-[30px] h-[30px] rounded-full"
              src={
                user.avatar
                  ? user.avatar
                  : "https://phongtro123.com/images/default-user.png"
              }
              alt=""
            />
            <span className="text-sm text-gray-400"> {user.name}</span>
          </div>
          <div className="flex gap-[10px]">
            <button className="text-sm bg-blue-custom px-2 py-1 text-white rounded-md ">
              Gọi {user.phone}
            </button>
            <button className="text-sm border-solid border-[1px] border-blue-custom  px-2 py-1 text-blue-custom rounded-md ">
              Nhắn zalo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemComponent;
