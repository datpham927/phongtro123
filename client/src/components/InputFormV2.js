import { memo } from "react";

function InputFormV2({
  label,
  unit,
  setValue,
  name,
  invalidFields,
  value,
  setInvalidFields,
}) {
  return (
    <div className="flex flex-col gap-1 w-1/2">
      <label htmlFor={name} className="font-medium text-sm">
        {label}
      </label>
      <div className="flex border-slate-300  ">
        <input
          id={name}
          className="py-1 px-2 flex-1 outline-blue-300  rounded-l-md border-solid border-[1px] border-slate-300"
          type="number"
          value={value}
          onChange={(e) => {
            setValue((prev) => ({
              ...prev,
              [name]:
                name === "priceNumber"
                  ? parseFloat(e.target.value) / 1000000
                  : e.target.value,
            }));
            setInvalidFields(invalidFields.filter((e) => e.name !== name));
          }}
        />
        <div className="flex items-center justify-center bg-primary-bg px-3 border-solid border-t-[1px] border-r-[1px] border-b-[1px] border- border-slate-300 rounded-r-md">
          {unit}
        </div>
      </div>

      {invalidFields?.length > 0 &&
      invalidFields?.some((e) => e.name === name) ? (
        <span className="text-red-500 text-sm">
          {invalidFields?.find((e) => e.name === name)?.message}
        </span>
      ) : (
        ""
      )}
    </div>
  );
}

export default memo(InputFormV2);
