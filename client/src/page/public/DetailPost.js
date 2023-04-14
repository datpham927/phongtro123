import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiDetailPost } from '../../services/portServices';

const DetailPost = () => {
  const postId = useParams()?.postId
  const [dataPost, setDataPost] = useState([])
  useEffect(() => {
    const fetchApi = async () => {
      const response = await apiDetailPost(postId)
      if (response.err === 1) return;
      setDataPost(response.data)
    }
    fetchApi()
  }, [postId])
  console.log(dataPost)
  return (
    <div className='flex w-full'>
      <div className='w-2/3'>
           </div><div>
      </div>
      <div className='w-1/3'>
           </div><div>
      </div>
    </div>
  )
}

export default DetailPost