import React, { useEffect, useState } from 'react'
import SitemComponent from './SitemComponent';
import { apiNewPost } from '../services/portServices';

export const FeaturedNews = () => {
    const [featuredNews, setFeaturedNews] = useState();
    useEffect(() => {
        const fetchApi = async () => {
            const response = await apiNewPost({ order: ["star", "DESC"], limit: 5 });
            setFeaturedNews(response.data || []);
        }
        fetchApi()
    }, []);

    return <div className="w-full bg-white rounded-md p-4">
        <h3 className="font-semibold text-lg mb-4">Tin nổi bật</h3>
        <div className="w-full flex flex-col">
            {featuredNews?.map((item) => {
                return (
                    <SitemComponent
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        price={item?.attributes?.price}
                        createdAt={item.createdAt}
                        image={JSON.parse(item.images.image)}
                    />
                );
            })}
        </div>
    </div>
}
