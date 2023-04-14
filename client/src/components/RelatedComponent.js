import React, { useEffect, useState } from "react";
import { apiNewPost } from "../services/portServices";
import SitemComponent from "./SitemComponent";
const RelatedComponent = () => {
  const [newsPost, setNewsPost] = useState();
  useEffect(() => {
    const fetchApi = async () => {
      const response = await apiNewPost();
      setNewsPost(response.data || []);
    };
    fetchApi();
  }, []);

  return (
    <div className="w-full bg-white rounded-md p-4">
      <h3 className="font-semibold text-lg mb-4">Tin mới đăng</h3>
      <div className="w-full flex flex-col gap-2">
        {newsPost?.map((item) => {
          return (
            <SitemComponent
              key={item.id}
              title={item.title}
              price={item?.attributes?.price}
              createdAt={item.createdAt}
              image={JSON.parse(item.images.image)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RelatedComponent;
