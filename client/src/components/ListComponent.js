import ButtonComponent from "./ButtonComponent";
import ItemComponent from "./ItemComponent";

function ListComponent({ data }) {
  return (
    <div className="bg-white p-4 rounded-md shadow-custom ">
      <div>
        <h1 className="text-lg font-medium"> Danh sách tin đăng</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm">Sắp Xếp:</span>
          <ButtonComponent
            text="Mặc định"
            className={"bg-primary-bg !py-1 text-sm  "}
          />
          <ButtonComponent
            text="Mới nhất"
            className={"bg-primary-bg !py-1 text-sm "}
          />
          <ButtonComponent
            text="Có video"
            className={"bg-primary-bg !py-1 text-sm "}
          />
        </div>
      </div>

      <div className="mt-3">
        {data?.map((e) => (
          <ItemComponent
            key={e.id}
            id={e.id}
            images={JSON.parse(e?.images?.image)}
            attributes={e?.attributes}
            user={e?.user}
            description={e.description}
            star={e.star}
            title={e.title}
          />
        ))}
      </div>
    </div>
  );
}

export default ListComponent;
