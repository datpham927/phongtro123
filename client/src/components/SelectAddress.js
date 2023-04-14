import { memo } from "react";

function SelectAddress({
  label,
  valueId,
  options,
  type,
  setId,
  setValue,
  className,
  isLabel = false,
  setInvalidFields,
}) {
  const handleValue = (e) => {
    setId
      ? setId(e?.target?.value)
      : setValue((prev) => ({ ...prev, [type]: e?.target?.value }));
  };

  //value nào của option == value của select thì hiển thị
  return (
    <div className={`flex flex-col w-1/2 gap-1 ${className} `}>
      {isLabel && (
        <label htmlFor="select-address" className="text-sm font-semibold">
          {label}
        </label>
      )}
      <select
        value={valueId}
        onChange={handleValue}
        id="select-address"
        className="outline-none bg-primary-bg text-sm border-solid border-[1px] border-gray-300 py-1 px-4 rounded-md"
      >
        <option>{`--${label}--`}</option>
        {options?.map((e) => (
          <option
            key={
              type === "province"
                ? e?.province_id
                : type === "district"
                ? e?.province_id
                : e?.id
            }
            value={
              type === "province"
                ? e?.province_id
                : type === "district"
                ? e?.district_id
                : e?.code
            }
          >{`${
            type === "province"
              ? e?.province_name
              : type === "district"
              ? e?.district_name
              : e.value
          }`}</option>
        ))}
      </select>
    </div>
  );
}

export default memo(SelectAddress);
