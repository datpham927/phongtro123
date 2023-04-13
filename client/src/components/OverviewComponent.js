import { useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { getApiUploadImage } from "../services/app";
import InputForm from "./InputForm";
import InputFormV2 from "./InputFormV2";
import InputReadOnly from "./InputReadOnly";
import SelectAddress from "./SelectAddress";

import { useSelector } from "react-redux";
import ButtonComponent from "./ButtonComponent";
import { dataArea, dataPrice } from "../utils/data";
import { apiCreatePost } from "../services/portSercives";
import toastMessage from "./toastMessage";
import { useNavigate } from "react-router-dom";
import validate from "../utils/valueDate/valueDate";

function OverviewComponent({
  payload,
  setPayload,
  invalidFields,
  setInvalidFields,
}) {
  const navigate = useNavigate();
  const [images, setImage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { categories } = useSelector((state) => state.category);
  const { user } = useSelector((state) => state.user);

  const handleUploadImage = async (e) => {
    setIsLoading(true);
    const files = e.target.files;
    if (!files) return;
    let images = [];
    const formData = new FormData();
    for (let i of files) {
      formData.append("file", i);
      formData.append("upload_preset", process.env.REACT_APP_UPLOAD_NAME);
      const response = await getApiUploadImage(formData);
      if (response) {
        images = [...images, response.secure_url];
      }
    }
    setIsLoading(false);
    setPayload((prev) => ({
      ...prev,
      images: JSON.stringify([...payload.images, ...images]),
    }));
    setImage((prev) => [...prev, ...images]);
  };

  const handleSummit = async () => {
    const priceCode =
      dataPrice.find(
        (e) => e.min < payload?.priceNumber && e.max > payload?.priceNumber
      )?.code || "5ERTTTTTT";
    const areaCode =
      dataArea.find(
        (e) => e.min < payload?.areaNumber && e.max > payload?.areaNumber
      )?.code || "NRTTTTTTT";
    const category = categories?.find(
      (e) => e?.code === payload.categoryCode
    )?.value;
    const check = validate(
      {
        ...payload,
        priceCode,
        areaCode,
        category,
      },
      setInvalidFields
    );

    console.log("check", check);
    if (!check) return;

    const response = await apiCreatePost({
      ...payload,
      priceCode,
      areaCode,
      category,
    });
    if (response.err === 1) {
      toastMessage(response.message);
    } else {
      toastMessage(response.message);
      navigate("/");
    }
  };
  console.log("payload", payload);

  return (
    <div className="flex flex-col gap-6 ">
      <h1 className="text-2xl mt-6 font-semibold">Thông tin mô tả</h1>
      <SelectAddress
        value={payload?.category}
        label={"Loại chuyên mục"}
        options={categories}
        type={"categoryCode"}
        setValue={setPayload}
      />
      <InputForm
        label={"Tiêu đề"}
        setValue={setPayload}
        name={"title"}
        invalidFields={invalidFields}
        setInvalidFields={setInvalidFields}
      />
      <div className="flex flex-col gap-1">
        <label htmlFor="desc">Nội dung mô tả</label>
        <textarea
          value={payload?.description}
          onChange={(e) => {
            setPayload((prev) => ({ ...prev, description: e?.target?.value }));
            setInvalidFields(
              invalidFields.filter((e) => e.name !== "description")
            );
          }}
          id="desc"
          rows={10}
          className="border-solid border-[1px] border-slate-300 w-full outline-blue-300 rounded-md p-2"
        />
        {invalidFields?.some((e) => e.name === "description") ? (
          <span className="text-red-500 text-sm">
            {invalidFields?.find((e) => e.name === "description")?.message}
          </span>
        ) : (
          ""
        )}
      </div>
      <InputReadOnly
        label={"Thông tin liên hệ"}
        value={user.name}
        invalidFields={invalidFields}
        setInvalidFields={setInvalidFields}
        setValue={setPayload}
      />
      <InputReadOnly
        label={"Điện thoại"}
        value={user.phone}
        invalidFields={invalidFields}
        setInvalidFields={setInvalidFields}
        setValue={setPayload}
      />
      <InputFormV2
        label={"Giá cho thuê"}
        unit={"đồng"}
        setValue={setPayload}
        invalidFields={invalidFields}
        setInvalidFields={setInvalidFields}
        name={"priceNumber"}
        value={payload?.priceNumber}
      />
      <InputFormV2
        label={"Diện tích"}
        unit={"m2"}
        setValue={setPayload}
        invalidFields={invalidFields}
        setInvalidFields={setInvalidFields}
        name={"areaNumber"}
        value={payload?.areaNumber}
      />
      <SelectAddress
        setValue={setPayload}
        value={payload?.target}
        invalidFields={invalidFields}
        setInvalidFields={setInvalidFields}
        label={"Đối tượng cho thuê"}
        type="target"
        options={[
          {
            id: 1,
            value: "Nam",
          },
          {
            id: 2,
            value: "Nữ",
          },
        ]}
      />
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-medium">Hình ảnh</h1>
        <span className="text-sm">
          Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn
        </span>
        <div className="w-full">
          <label
            htmlFor="upload-image"
            className="text-xl flex flex-col items-center justify-center py-4  border-[2px] border-dashed border-[#bbb]"
          >
            {isLoading ? (
              <BallTriangle
                height={90}
                width={90}
                radius={5}
                color="#4fa94d"
                ariaLabel="ball-triangle-loading"
                wrapperClass={{}}
                wrapperStyle=""
                visible={true}
              />
            ) : (
              <img
                className="w-[90px] "
                src="https://phongtro123.com/dashboard_resource/images/upload-image.png"
                alt=""
              />
            )}
            Thêm ảnh
          </label>
          <input
            hidden
            id="upload-image"
            type="file"
            onChange={handleUploadImage}
            multiple
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {images?.map((e) => (
          <div className="flex flex-col justify-center shadow-custom rounded-md overflow-hidden">
            <img className="w-full h-[110px] object-cover " src={e} alt="" />
            <div
              className="w-full bg-white flex items-center justify-center py-2 cursor-pointer"
              onClick={() => setImage(() => images.filter((i) => i !== e))}
            >
              <span className="text-sm">Xóa</span>
            </div>
          </div>
        ))}
      </div>

      <ButtonComponent
        text={"Tạo mới"}
        className={"bg-blue-custom text-white"}
        onClick={handleSummit}
      />
    </div>
  );
}

export default OverviewComponent;
