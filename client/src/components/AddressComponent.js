import { useEffect, useState } from "react";
import SelectAddress from "./SelectAddress";
import { getApiPublicDistrict, getApiPublicProvince } from "../services/app";
import InputReadOnly from "./InputReadOnly";

function AddressComponent({
  payload,
  setPayload,
  invalidFields,
  setInvalidFields,
}) {
  const [provinces, setProvinces] = useState();
  const [districts, setDistricts] = useState();
  const [provinceId, setProvinceId] = useState("");
  const [districtId, setDistrictId] = useState("");
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getApiPublicProvince();
      setProvinces(response?.results);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    setDistricts(null);
    const fetchApi = async () => {
      const response = await getApiPublicDistrict(provinceId);
      setDistricts(response.results);
    };
    provinceId && fetchApi();
  }, [provinceId, districtId]);

  useEffect(() => {
    setPayload((prev) => ({
      ...prev,
      address: `${
        districtId
          ? districts.find((e) => e?.district_id === districtId)
              ?.district_name + ","
          : ""
      } ${
        provinceId
          ? provinces.find((e) => e?.province_id === provinceId)?.province_name
          : ""
      }`,
      province: provinceId
        ? provinces.find((e) => e?.province_id === provinceId)?.province_name
        : "",
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provinceId, districtId]);

  return (
    <div className="flex flex-col gap-8 ">
      <h1 className="text-2xl my-5 font-semibold">Địa chỉ cho thuê</h1>
      <div className="flex gap-8">
        <SelectAddress
          value={provinceId}
          label={"Tỉnh/Thành phố"}
          options={provinces}
          setId={setProvinceId}
          type="province"
        />
        <SelectAddress
          value={districtId}
          label={"Quận/Huyện"}
          options={districts}
          setId={setDistrictId}
          type="district"
        />
      </div>
      <InputReadOnly
        invalidFields={invalidFields}
        setInvalidFields={setInvalidFields}
        name="province"
        label={"Địa chỉ chính xác"}
        value={
          payload.address
            ? payload.address
            : `${
                districts?.find((e) => e?.district_id === districtId)
                  ?.district_name
                  ? districts?.find((e) => e?.district_id === districtId)
                      ?.district_name + ","
                  : ""
              }${
                provinceId
                  ? provinces.find((e) => e?.province_id === provinceId)
                      ?.province_name
                  : ""
              }`
        }
      />
    </div>
  );
}

export default AddressComponent;
