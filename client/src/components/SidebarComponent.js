import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { menuManage } from "../utils/menuManage";

function SidebarComponent() { 
  const { user } = useSelector((state) => state.user);
  return (
    <div className="flex flex-col p-3">
      <div className="flex items-center">
        <img
          className="w-[50px] h-[50px] rounded-full"
          src={`${
            user?.avatar
              ? user?.avatar
              : "https://phongtro123.com/images/default-user.png"
          }`}
          alt=""
        />

        <div className="flex flex-col ml-3">
          <span className="text-base">
            <strong>{user?.name}</strong>
          </span>
          <span className="text-[12px]">{user?.phone}</span>
        </div>
      </div>
      <span className="my-2 text-sm">
        Mã thành viên :
        <strong>
          {user?.id
            ?.match(/\d+(\.\d+)?/g)
            .join("")
            .slice(0, 5)}
        </strong>
      </span>

      <ul className="flex flex-col gap-4 mt-5">
        {menuManage.map((e) => (
          <li className=" text-sm text-blue-custom hover:text-red-500">
            <NavLink
              key={e.id}
              to={e.path}
              className={({ isActive }) => (isActive ? "text-red-400" : "")}
            >
              {e.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SidebarComponent;
