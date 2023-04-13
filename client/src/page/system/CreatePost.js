import { useState } from "react";
import AddressComponent from "../../components/AddressComponent";
import OverviewComponent from "../../components/OverviewComponent";
import { useSelector } from "react-redux";

function CreatePost({ isEdit }) {
  const { dataEditPost } = useSelector((state) => state?.app);
  console.log(dataEditPost)
  const [payload, setPayload] = useState({
    title: dataEditPost?.title || "",
    priceNumber: dataEditPost?.priceNumber || "",
    areaNumber: dataEditPost?.areaNumber || "",
    images: dataEditPost?.images || "",
    address: dataEditPost?.address || "",
    description: dataEditPost?.description || "",
    target: dataEditPost?.overview?.target || "",
    province: dataEditPost?.overview?.area || "",
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
          />
          <OverviewComponent
            payload={payload}
            setPayload={setPayload}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
