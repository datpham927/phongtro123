import { useEffect, useState } from "react";
import SelectAddress from "./SelectAddress";
import { getApiPublicDistrict, getApiPublicProvince } from "../services/app";
import InputReadOnly from "./InputReadOnly";
import { useSelector } from "react-redux";

function AddressComponent({
  payload,
  setPayload,
  invalidFields,
  setInvalidFields,
  isEdit
}) {
  const { dataEditPost } = useSelector((state) => state?.app);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [provinceId, setProvinceId] = useState();
  const [districtId, setDistrictId] = useState("");

  useEffect(()=>{
    if(provinces?.length>0&&isEdit){
      const arrAddress=dataEditPost?.address?.split(",")
      const check= provinces?.some(e=>e?.province_name=== arrAddress[arrAddress?.length-1]?.trim())
      if (check){
        setProvinceId(provinces?.find(e=>e?.province_name=== arrAddress[arrAddress?.length-1]?.trim())?.province_id)
  
       }  
    }
  },[provinces])
  
  useEffect(()=>{
    if(districts?.length>0&&isEdit){
      const arrAddress=dataEditPost?.address?.split(",")
      const check=districts?.some(e=>e?.district_name=== arrAddress[arrAddress?.length-2]?.trim())
       if (check){
        setDistrictId(districts?.find(e=>e?.district_name=== arrAddress[arrAddress?.length-2]?.trim())?.district_id)
       }  
    }
},[districts])
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
  }, [provinceId]);

  useEffect(() => {
    setPayload((prev) => ({
      ...prev,
      address: `${
        districtId
          ? districts?.find((e) => e?.district_id === districtId)
              ?.district_name + ","
          : ""
      } ${    
        provinceId
          ? provinces?.find((e) => e?.province_id === provinceId)?.province_name
          : ""
      }`,
      province: provinceId
        ? provinces?.find((e) => e?.province_id === provinceId)?.province_name
        : "",
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provinceId, districtId]);


  return (
    <div className="flex flex-col gap-8 ">
      <h1 className="text-2xl my-5 font-semibold">Địa chỉ cho thuê</h1>
      <div className="flex gap-8">
        <SelectAddress
          valueId={provinceId}
          label={"Tỉnh/Thành phố"}
          options={provinces}
          setId={setProvinceId}
          type="province"
        />
        <SelectAddress
          valueId={districtId}
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
        value={ `${
                districts?.some((e) => e?.district_id === districtId)
                  ? districts?.find((e) => e?.district_id === districtId)
                      ?.district_name + ","
                  : ""
              }${
                provinceId
                  ? provinces?.find((e) => e?.province_id === provinceId)
                      ?.province_name
                  : ""
              }`
        }
      />
    </div>
  );
}

export default AddressComponent;
