import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddressComponent from "../../components/AddressComponent";
import OverviewComponent from "../../components/OverviewComponent";


function CreatePost({ isEdit,setIsEdit }) {
  const dispatch=useDispatch()
  const { dataEditPost } = useSelector((state) => state?.app);
  const [payload, setPayload] = useState({
    address:  "",
    title: isEdit?dataEditPost?.title : "",
    priceNumber: isEdit?dataEditPost?.priceNumber : "",
    areaNumber:isEdit? dataEditPost?.areaNumber : "",
    images: isEdit?dataEditPost?.images?.image : "",
    description:isEdit? dataEditPost?.description : "",
    target: isEdit?dataEditPost?.overview?.target : "",
    province:isEdit? dataEditPost?.overview?.area : "", 
  });
  const [invalidFields, setInvalidFields] = useState([]);
 
  return (       
    <div className="px-7 flex flex-col">
      <div className="flex justify-center w-full border-solid border-b-[1px] border-gray-300">
        <h1 className="flex text-3xl py-3 text-blue-custom">
          {isEdit ? "Chỉnh sửa tin đăng" : "Đăng tin mới"}
        </h1>
      </div>
      <div className="flex">
        <div className="flex flex-col gap-3 w-[60%]">
          <AddressComponent
            payload={payload}
            setPayload={setPayload}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            isEdit={isEdit}
          />
          <OverviewComponent
            payload={payload}
            setPayload={setPayload}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
          />
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
