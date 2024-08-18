import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react';

const LikeButtonListItem = ({likeCount, postId, likeState}) => {

    const [isLiked, setIsLiked] = useState(likeState);

    const [totalLike, setTotalLike] = useState(likeCount);

    const toggleLike = async () => {

        if(isLiked) {
          setTotalLike(totalLike - 1);
        }else{
          setTotalLike(totalLike + 1);
        }

        setIsLiked(!isLiked);
        const token = Cookies.get('token');
        try {
          const response = await axios.post(`https://hoifancuongonepiece.site/api/v1/likes/post/${postId}`, {}, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        } catch (error) {
          console.error('Error toggling like:', error);
        }
    };

  return (
    <span onClick={() => {toggleLike()}}>
        {isLiked ? 
            <svg viewBox="0 0 24 24">
                <path style={{fill: "red"}} d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"></path>
            </svg>
            :
            <svg viewBox="0 0 24 24">
                <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"></path>
            </svg>
        }
        <p>{totalLike}</p>
    </span>
  )
}

export default LikeButtonListItem