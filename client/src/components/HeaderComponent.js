import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../redux/categorySlice/categorySlice";
import { apiCategory } from "../services/categoryService";
import ButtonComponent from "./ButtonComponent";
import NavigateComponent from "./NavigateComponent";
import { setLogout } from "../redux/authSlice/authSlice";
import { menuManage } from "../utils/menuManage";
import { Link } from "react-router-dom";
import toastMessage from "./toastMessage";
import UserComponent from "./UserComponent";

function HeaderComponent() {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const { isLogged } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchApi = async () => {
      const res = await apiCategory();
      if (res?.err === 0) {
        dispatch(setCategories(res?.data));
      }
    };
    fetchApi();
  }, []);

  return (
    <div>
      <div className="flex justify-between w-[1100px] mx-auto">
        <div>
          <img
            className="w-[240px] h-[70px] object-contain"
            src="https://phongtro123-hip06.vercel.app/static/media/logowithoutbg.bf008420f8d82e029a9b.png"
            alt=""
          />
        </div>
        {isLogged && <UserComponent />}
        <div className="flex items-center gap-2 relative">
          {isLogged ? (
            <>
              <ButtonComponent
                text="Quản lý tài khoản"
                onClick={() => setModal(!modal)}
              />
              {modal && (
                <div className="absolute flex flex-col top-[80%] bg-white w-[200px] p-3 rounded-sm shadow-custom z-10">
                  {menuManage.map((e) => (
                    <Link
                      to={e.path}
                      key={e.id}
                      className=" border-solid border-b-[1px] border-gray-300 py-2 text-sm text-blue-custom cursor-pointer hover:text-orange-500"
                    >
                      {e.text}
                    </Link>
                  ))}
                  <span
                    className=" border-solid py-2 text-sm text-blue-custom cursor-pointer  hover:text-orange-500"
                    onClick={() => {
                      dispatch(setLogout());
                      toastMessage("Đăng xuất thành công");
                    }}
                  >
                    Thoát
                  </span>
                </div>
              )}
            </>
          ) : (
            <>
              <ButtonComponent text="Đăng Nhập" link="/login" />
              <ButtonComponent text="Đăng ký" link="/register" />
            </>
          )}
          <ButtonComponent
            text="Đăng tin mới"
            className={"bg-red-custom text-white "}
          />
        </div>
      </div>
      <NavigateComponent />
    </div>
  );
}

export default HeaderComponent;
