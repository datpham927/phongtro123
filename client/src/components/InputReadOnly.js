import { memo, useEffect } from "react";

function InputReadOnly({
  label,
  value,
  name,
  invalidFields,
  setInvalidFields,
}) {
  useEffect(() => {
    setInvalidFields(invalidFields.filter((e) => e.name !== name));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="exact-address" className="font-semibold text-sm">
        {label}
      </label>
      <input
        id="exact-address"
        type="text"
        readOnly
        value={value}
        className=" bg-[#e9ecef]  rounded-md w-full px-4 py-1 outline-blue-300"
      />
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

export default memo(InputReadOnly);
