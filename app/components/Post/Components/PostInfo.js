import { converTime } from '@/app/helper/converTime';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import DropDownDot from '../../DropDown/DropDownDot';

const PostInfo = ({ postData }) => {
  const router = useRouter();
  const [indexOptions, setIndexOption] = useState(-1);

  useEffect(() => {
    const deletePost = async () => {
      if (indexOptions === 0) {
        console.log("DELETE " + postData.id);

        const url = 'https://hoifancuongonepiece.site/api/v1/posts/' + postData.id;
        const token = Cookies.get('token');

        try {
          const response = await axios.delete(url, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.status === 200) {
            // Redirect to home page
            window.location.replace('/');
            // Optionally update the followers count in `dataProfile`
          } else {
            const errorData = response.data;
            console.error('Error:', errorData);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    deletePost();
  }, [indexOptions]);

  return (
    <div className='post-info'>
      <div className='post-user-info'>
        <span onClick={() => { router.push("/" + postData?.user?.username) }} className='post-avatar-user'>
          <img src={postData?.user?.userProfile?.profileImageUrl ? 'https://image.adumikimio.workers.dev/?id=' + postData?.user?.userProfile?.profileImageUrl : "/avatar.jpeg"} />
        </span>
        <span className='contain-post-name-user'>
          <div onClick={() => { router.push("/" + postData?.user?.username) }} className='post-name-user'>{postData?.user?.username}</div>
          <div className='post-tm-user'><span>{postData.viewCount} views</span><span className='delimiter'>•</span><span>{converTime(postData.createdAt)}</span></div>
        </span>

        <div className='contain-dropdown-dot'>
          <DropDownDot options={['Delete', 'Report']} indexOption={indexOptions} setIndexOption={setIndexOption}></DropDownDot>
        </div>
      </div>
    </div>
  );
};

export default PostInfo;
