import { useDispatch, useSelector } from "react-redux";
import { setPostFilterCode } from "../redux/postSlice/postSlice";
import { path } from "../utils/constant";
import { convertVietnamese } from "../utils/format/convertVietnamese";
import { useState } from "react";

const { NavLink, useNavigate } = require("react-router-dom");

const NavigateComponent = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const [fixedNavigate, setFixedNavigate] = useState(false);

  // useEffect(() => {
  //   const handleOnScroll = (e) => {
  //     // setFixedNavigate(true);
  //     console.log(e?.target?.scrollHeight);
  //   };
  //   document.addEventListener("scroll", handleOnScroll);
  // });

  const notActive =
    "text-white text-sm font-semibold px-3 py-[10px]  hover:bg-red-custom";
  const active =
    "text-white text-sm font-semibold px-3 py-[10px] bg-red-custom hover:opacity-95";

  return (
    <div
      className={`bg-blue-custom   ${fixedNavigate ? "fixed top-0 w-full  " : ""
        }`}
    >
      <div className="w-[1100px] mx-auto  flex items-center">
        <NavLink
          end
          to={path.HOME}
          className={({ isActive }) => (isActive ? active : notActive)}
          onClick={() => {
            dispatch(setPostFilterCode(""));
          }}
        >
          Trang chủ
        </NavLink>
        {categories?.map((e) => (
          <NavLink
            to={`${convertVietnamese(e.value)}?page=1`}
            className={({ isActive }) => (isActive ? active : notActive)}
          >
            {e.value}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default NavigateComponent;
