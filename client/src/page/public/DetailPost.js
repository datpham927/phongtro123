/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiDetailPost } from '../../services/portServices';
import { SlideDetailPost } from './SlideDetailPost';
import { BoxInfo } from '../../components/BoxInfo';
import { isJSON } from '../../utils/checkJson';
import RelatedComponent from '../../components/RelatedComponent';
import { FeaturedNews } from '../../components/FeaturedNews';
import { starToArr } from '../../utils/starToArr';
// Import Swiper React components

const DetailPost = () => {
    const postId = useParams()?.postId
    const [dataPost, setDataPost] = useState([])
    const [images, setImages] = useState([])
    useEffect(() => {
        const fetchApi = async () => {
            const response = await apiDetailPost(postId)
            if (response.err === 1) return;
            if (response.data) {
                setDataPost(response.data)
            }
        }
        fetchApi()
    }, [postId])
    useEffect(() => {
        setImages(dataPost.images ? JSON?.parse(dataPost?.images?.image) : [])
    }, [dataPost])


    return (
        <div className='flex w-full my-10'>
            <div className='w-2/3 overflow-hidden'>
                <SlideDetailPost images={images} />
                <div>
                    <div className='my-5 flex gap-3 items-center'>

                        <div className='flex text-2xl font-medium text-red-500 uppercase '>
                            {dataPost?.star && <span className="text-yellow-400 text-sm flex shrink-0">
                                {starToArr(dataPost?.star).map(() => <ion-icon name="star"></ion-icon>)}
                            </span>}
                            {dataPost?.title}
                        </div>
                    </div>
                    <div className='text-sm'>Địa chỉ : <span>{dataPost.address}</span></div>
                    <div className='flex gap-8 my-2'>
                        <span className='text-xl text-emerald-500 font-semibold '>{dataPost?.attributes?.price}</span>
                        <span className='text-sm '>{dataPost?.attributes?.acreage}</span>
                        <span className='text-sm '>{dataPost?.attributes?.published}</span>
                        <span className='text-sm '>#{dataPost?.attributes?.hashtag}</span>
                    </div>
                </div>
                <div>
                    <div className='my-5'>
                        <h1 className='text-1xl font-semibold'>Đặc điểm tin đăng</h1>
                        {dataPost?.description && <span className='text-base '>{isJSON(dataPost?.description) ? JSON?.parse(dataPost?.description) : dataPost?.description}</span>}
                    </div>
                </div>
                <div className='my-5'>
                    <h1 className='text-1xl font-semibold'>Thông tin mô tả</h1>
                    <table className='w-full my-3'>
                        <tbody className=' h-[40px] bg-primary-bg'>
                            <td className='text-sm w-1/3 px-2 '>Mã tin:</td>
                            <td className='text-sm '>#{dataPost?.overview?.code}</td> </tbody>
                        <tbody className=' h-[40px]'>
                            <td className='text-sm w-1/3 px-2 '>Loại tin rao:</td>
                            <td className='text-sm '>{dataPost?.category?.value}</td> </tbody>
                        <tbody className=' h-[40px] bg-primary-bg'>
                            <td className='text-sm w-1/3 px-2 '>Đối tượng thuê:	</td>
                            <td className='text-sm '>{dataPost?.overview?.target}</td> </tbody>
                        <tbody className=' h-[40px]'>
                            <td className='text-sm  w-1/3 px-2 '> Gói tin:</td>
                            <td className='text-sm '>{dataPost?.overview?.bonus}</td> </tbody>
                        <tbody className=' h-[40px] bg-primary-bg'>
                            <td className='text-sm  w-1/3 px-2 '>Ngày đăng:</td>
                            <td className='text-sm '>{dataPost?.overview?.created}</td> </tbody>
                        <tbody className=' h-[40px] '>
                            <td className='text-sm w-1/3 px-2 '>Ngày hết hạn:	</td>
                            <td className='text-sm '>{dataPost?.overview?.expire}</td></tbody>
                    </table>
                </div>
                <div className='my-5'>
                    <h1 className='text-1xl font-semibold'>Thông tin liên hệ</h1>
                    <table className='w-full my-3'>
                        <tbody className=' h-[40px]'>
                            <td className='text-sm w-1/3 px-2 '>Liên hệ:</td>
                            <td className='text-sm '>#{dataPost?.user?.name}</td> </tbody>
                        <tbody className=' h-[40px]  bg-primary-bg'>
                            <td className='text-sm w-1/3 px-2 '>Điện thoại:</td>
                            <td className='text-sm '>{dataPost?.user?.phone}</td> </tbody>
                        <tbody className=' h-[40px] '>
                            <td className='text-sm w-1/3 px-2 '>Zalo:	</td>
                            <td className='text-sm '>{dataPost?.user?.zalo}</td> </tbody>

                    </table>
                </div>
            </div>
            <div className='w-1/3 px-2'>
                <BoxInfo
                    avatar={dataPost?.user?.avatar}
                    name={dataPost?.user?.name}
                    phone={dataPost?.user?.phone}
                    zalo={postId?.user?.zalo}
                    status={"Đang hoạt động"}
                />
                <FeaturedNews />
                <RelatedComponent />
            </div>
            <div>
            </div>
        </div>
    )
}

export default DetailPost