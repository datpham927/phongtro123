function InputComponent({ placeholder, type, onChange, name, invalidFields }) {
  return (
    <>
      <input
        className="outline-none  text-base  bg-primary-bg p-2 rounded-md my-2"
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
      />
      {invalidFields?.length > 0 &&
        invalidFields?.some((e) => e.name === name) && (
          <span className="my-1 text-xs text-red-custom">
            {invalidFields?.find((e) => e.name === name)?.message}
          </span>
        )}
    </>
  );
}

export default InputComponent;
