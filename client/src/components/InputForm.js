import { memo } from "react";

function InputForm({
  label,
  setValue,
  name,
  invalidFields,
  value,
  setInvalidFields,direction,
}) {
  return (
    <div className={`flex  ${direction?direction:"flex-col gap-1"} w-full`}     >
      <label htmlFor={name} className="flex items-end w-1/2">{label}</label>
      <div className="w-full">
        <input
          id={name}
          value={value}
          className="flex  w-full border-solid border-[1px] border-slate-300 py-1 px-2 rounded-md outline-blue-300"
          type="text"
          onChange={(e) => {
            setValue((prev) => ({ ...prev, [name]: e?.target?.value }));
            setInvalidFields(invalidFields.filter((e) => e.name !== name));
          }}
        />
         {invalidFields?.length > 0 &&
      invalidFields?.some((e) => e?.name === name) ? (
        <span className="text-red-500 text-sm">
          {invalidFields?.find((e) => e?.name === name)?.message}
        </span>
      ) : (
        ""
      )}
      </div>
     
    </div>
  );
}

export default memo(InputForm);
