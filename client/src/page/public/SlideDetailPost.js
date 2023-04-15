import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from 'swiper';
import "swiper/css";
import "swiper/css/navigation";

export const SlideDetailPost = ({images}) => {
  return (
    <div className='flex w-full'>
    <Swiper
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      mousewheel={true}
      loop={true}
      modules={[Autoplay, Pagination, Navigation]}
      allowTouchMove={false}
      navigation={true}
      className="mySwiper">
      {images.map(e => <SwiperSlide>
        <div className='flex justify-center w-full h-[317px]  shrink-0 bg-black'> <img className='w-auto h-auto object-fill' src={e} alt='' /></div>


      </SwiperSlide>)}


    </Swiper>

  </div>
  )
}
