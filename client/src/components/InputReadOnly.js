import { memo, useEffect } from "react";

function InputReadOnly({
  label,
  value,
  direction,isEditPhone
}) {
  return (
    <div className={`flex ${direction?direction:"flex-col gap-1"}`}>
      <label htmlFor="exact-address" className="flex items-end w-1/2" >
        {label}
      </label>
      <div className="w-full">
        <input
          id="exact-address"
          type="text"
          readOnly
          value={value}
          className=" bg-[#e9ecef]  rounded-md w-full px-4 py-1 outline-blue-300"
        />
        {isEditPhone&&<small className="text-sm text-blue-custom my-2">Đổi số điện thoại</small>}
      </div>
      
    
    </div>
  );
}

export default memo(InputReadOnly);
