import { useDispatch } from "react-redux";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { setPostFilterCode } from "../redux/postSlice/postSlice";
import { convertVietnamese } from "../utils/format/convertVietnamese";

function ItemNavbarComponent({ title, content, isDouble, type }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleFilterPost = (e) => {
    if (type) {
      dispatch(setPostFilterCode({ [type]: e.code }));
      navigate({
        pathname: location.pathname,
        search: createSearchParams(
          {
            [type]: e.code,
            page: 1,
          },
          {
            state: 0,
          }
        ).toString(),
      });
    } else {
      navigate(`/${convertVietnamese(e.value)}?page=1`);
    }
  };
  return (
    <div className="w-full bg-white rounded-md p-4 shadow-custom mb-5">
      <h1 className="text-lg font-medium mb-2 ">{title}</h1>
      <div className={isDouble && "grid grid-cols-2"}>
        {content?.map((e) => (
          <div
            key={e.value}
            onClick={() => handleFilterPost(e)}
            className="flex items-center text-neutral-700 text-sm py-2 border-solid border-b-[1px] border-gray-100"
          >
            <ion-icon name="chevron-forward-outline"></ion-icon>
            <span className="ml-2 cursor-pointer hover:text-orange-500">
              {e.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemNavbarComponent;
