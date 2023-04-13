import { memo } from "react";

function InputForm({
  label,
  setValue,
  name,
  invalidFields,
  value,
  setInvalidFields,
}) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor="input">{label}</label>
      <input
        id="input"
        value={value}
        className="flex  border-solid border-[1px] border-slate-300 py-1 px-2 rounded-md outline-blue-300"
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
  );
}

export default memo(InputForm);
