import { memo } from "react";

function PageNumberComponent({ children, onClick, active }) {
  return (
    <div
      onClick={onClick}
      className={`${active ? "bg-red-custom text-white" : "bg-white  hover:bg-slate-200"
        } px-5 py-3 cursor-pointer rounded-md shadow-custom text-sm`}
    >
      {children}
    </div>
  );
}

export default memo(PageNumberComponent);
