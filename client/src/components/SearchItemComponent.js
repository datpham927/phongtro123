function SearchItemComponent({ title, icon, onClick, defaultText }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between text-sm font-medium fon bg-white   p-2 rounded-md hover:shadow-custom`}
    >
      <span
        className={`overflow-hidden overflow-ellipsis whitespace-nowrap ${
          !!title ? "text-black font-medium" : "text-gray-400"
        } `}
      >
        {title || defaultText}
      </span>
      <span className="flex items-center mx-2 ">{icon}</span>
    </div>
  );
}

export default SearchItemComponent;
