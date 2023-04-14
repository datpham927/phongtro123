function ItemManagePost({
  id,
  avatar,
  price,
  startDate,
  expireDate,
  status,
  setIsEdit,
  onClickEdit,onClickDelete
}) {
  return (
    <ul className=" grid grid-cols-7 divide-x border-solid border-t-[1px] border-slate-200">
      <li className="p-[10px] text-sm">{id}</li>
      <li className="p-[10px] text-sm">
        <img className="w-[30px] h-[30px]" src={avatar} alt="" />
      </li>
      <li className="p-[10px] text-sm">{price}</li>
      <li className="p-[10px] text-sm">{startDate}</li>
      <li className="p-[10px] text-sm">{expireDate}</li>
      <li className="p-[10px] text-sm">{status}</li>
      <li className=" flex p-[15px] text-sm justify-between">
        <button
          className="px-2 bg-blue-500 text-white rounded-md"
          onClick={(e) => {
            e.preventDefault();
            setIsEdit && setIsEdit(true);
            onClickEdit();
          }}
        >
          Edit
        </button>
        <button className="px-2 bg-blue-500 text-white rounded-md" onClick={(e)=>{
          e.preventDefault()
          onClickDelete()
        }}>
          Delete
        </button>
      </li>
    </ul>
  );
}

export default ItemManagePost;
