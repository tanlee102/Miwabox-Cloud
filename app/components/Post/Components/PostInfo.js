import { converTime } from '@/app/helper/converTime'
import React from 'react'

const PostInfo = ({postData}) => {
  return (
    <div className='post-info'>
        <div className='post-user-info'>
            <span className='post-avatar-user'>
                <img src={postData?.user?.userProfile?.profileImageUrl ? 'https://image.lehienthanh.workers.dev/?id='+postData?.user?.userProfile?.profileImageUrl : "/avatar.jpeg"} />
            </span>
            <span className='contain-post-name-user'>
                <div className='post-name-user'>{postData?.user?.username}</div>
                <div className='post-tm-user'><span>1,634 views</span><span className='delimiter'>•</span><span>{converTime(postData.createdAt)}</span></div>
            </span>
        </div>
    </div>
  )
}

export default PostInfo
