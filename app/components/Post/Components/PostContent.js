import { WindowContext } from '@/app/context/WindowContext';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'

const PostContent = ({postData}) => {

    const [isLiked, setIsLiked] = useState(false);
    const [bookmark, setBookmark] = useState(false);
    const [totalLike, setTotalLike] = useState(postData?.likeCount);

    const {logged} = useContext(WindowContext);

    const router = useRouter();

    useEffect(() =>{
        setIsLiked(postData?.status);
        setBookmark(postData?.bookmark);
        setTotalLike(postData?.likeCount);
    }, [postData]);

    const toggleLike = async (postId) => {

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
          console.log(response.data);
        } catch (error) {
          console.error('Error toggling like:', error);
        }
    };

    const toggleBookmark = async (postId) => {
        setBookmark(!bookmark); // Assuming you have state for bookmarked status
        const token = Cookies.get('token');
        try {
            const response = await axios.post(`https://hoifancuongonepiece.site/api/v1/bookmarks/toggle?postId=${postId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error toggling bookmark:', error);
        }
    };

    const {setDisplayPost} = useContext(WindowContext)
    

  return (
    <>
        <div className='post-title'>{postData.title}</div>

        <div className='post-list-tags'>
            {postData?.tags?.map(tag => (
                <span onClick={() => {router.push("/?tagname="+tag.name); setDisplayPost(false)}} key={tag.id}>#{tag.name}</span>
            ))}
        </div>

        <div className='post-main-content'>

            {postData?.medias?.map(media => (
                <>
                    <div className='post-content-media'>
                        {media.mediaType === "video"
                            ? <video controls src={`https://video.iuhito102.workers.dev?ciphertext=${media.url}`} />
                            : <img src={`https://image.lehienthanh1.workers.dev/?id=${media.url}`} alt={media.content} />
                        }
                    </div>
                    <div className='post-content-media-description'>
                        {media.content!=="undefined" &&  media.content!=="null" && media?.content? media.content : ""}
                    </div>
                </>
            ))}
            
            {logged ? 
            <div className='post-content-like'>
                <span onClick={() => toggleLike(postData?.id)}>
                    {isLiked == false ?
                    <svg aria-label="Thích" class="x1lliihq x1n2onr6 xyb1xck" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Thích</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
                    : <svg style={{fill:'red'}} aria-label="Bỏ thích" class="x1lliihq x1n2onr6 xxk16z8" fill="currentColor" height="24" role="img" viewBox="0 0 48 48" width="24"><title>Bỏ thích</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>}
                    <span>{totalLike}</span>
                </span>
                <span>
                    <svg aria-label="Bình luận" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Bình luận</title><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>
                    <span>{postData.commentCount}</span>
                </span>
                <span onClick={() => toggleBookmark(postData?.id)}>
                    {bookmark == false ?
                    <svg aria-label="Lưu" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Lưu</title><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg>
                    :
                    <svg aria-label="Gỡ" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Gỡ</title><path d="M20 22a.999.999 0 0 1-.687-.273L12 14.815l-7.313 6.912A1 1 0 0 1 3 21V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Z"></path></svg>
                    }
                </span>
            </div>
            :""}

        </div>
      
    </>
  )
}

export default PostContent
