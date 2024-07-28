import { converTime } from '@/app/helper/converTime'
import { useRouter } from 'next/navigation'
import React from 'react'
import DropDownDot from '../../DropDown/DropDownDot';

const PostInfo = ({postData}) => {

  const router = useRouter();

  return (
    <div className='post-info'>
        <div className='post-user-info'>
            <span onClick={() => {router.push("/"+postData?.user?.username)}} className='post-avatar-user'>
                <img src={postData?.user?.userProfile?.profileImageUrl ? 'https://image.lehienthanh.workers.dev/?id='+postData?.user?.userProfile?.profileImageUrl : "/avatar.jpeg"} />
            </span>
            <span className='contain-post-name-user'>
                <div onClick={() => {router.push("/"+postData?.user?.username)}} className='post-name-user'>{postData?.user?.username}</div>
                <div className='post-tm-user'><span>1,634 views</span><span className='delimiter'>•</span><span>{converTime(postData.createdAt)}</span></div>
            </span>

            <div className='contain-dropdown-dot'>
                <DropDownDot options={['Delete', 'Report']} indexOption={0} setIndexOption={null} ></DropDownDot>
            </div>
        </div>
    </div>
  )
}

export default PostInfo
