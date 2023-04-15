import CreatePost from "../page/system/CreatePost";

function EditPostComponent({ setIsEdit }) {
  return (
    <div
      className="fixed flex top-0 right-0 w-full h-full  items-center justify-center bg-[rgba(0,0,0,.5)]"
      onClick={(e) => {
        e.stopPropagation();
        setIsEdit(false);
      }}
    >
      <div
        className="w-[80%] rounded-md overflow-hidden h-[90%] "
        onClick={(e) => e.stopPropagation()}
      >
        <div className=" bg-white overflow-y-scroll h-full p-2  ">
          <CreatePost isEdit setIsEdit={setIsEdit} />
        </div>
      </div>
    </div>
  );
}

export default EditPostComponent;
