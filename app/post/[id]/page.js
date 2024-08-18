'use client'
import React, { useContext, useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';

import '../../styles/Post/FullPost.css';
import '../../styles/Post/FullPostRes.css';

import PostInfo from '@/app/components/Post/Components/PostInfo';
import PostContent from '@/app/components/Post/Components/PostContent';
import Cookies from 'js-cookie';
import Comment from '@/app/components/Post/Components/Comment';
import PostInputComment from '@/app/components/Post/Components/PostInputComment';
import { WindowContext } from '@/app/context/WindowContext';


async function getData(postId, userId) {
    const res = await fetch('http://8.219.96.109/api/v1/posts/v2/'+postId+'?userId='+userId)
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
}

async function getRandomPosts(limit, postId) {
    const res = await fetch('http://8.219.96.109/api/v1/posts/randomExcludingId?limit=' + limit + '&excludePostId='+postId)
    if (!res.ok) {
        throw new Error('Failed to fetch random posts');
    }
    return res.json();
}

const page = ({params}) => {

    const [data, setData] = useState({});
    const [randomPosts, setRandomPosts] = useState([]);
    const {setDisplayPost} = useContext(WindowContext);

    const router = useRouter();

    const loadRandomPosts = async () => {
        const posts = await getRandomPosts(5, params.id);
        setRandomPosts(posts);
    }
    
    const loadData = async () => {
        let data;
        const token = Cookies.get('token');
        if (token) {
            const decoded = jwtDecode(token);
            data = await getData(params.id, decoded.id);
        }else{
            data = await getData(params.id, -1);
        }
        setData(data);
    }
    useEffect(() => {
        setDisplayPost(false);
        loadData();
        loadRandomPosts();
    }, []);

    const [comments, setComments] = useState([]);

  return (
    <div className='fr-full-post fr-content'>
        <div className='full-post'>

            <div className='post-content'>

                <PostInfo postData={data}></PostInfo>

                <PostContent postData={data}></PostContent>

                {data?.muted ? "" : 
                <PostInputComment postId={params.id} comments={comments} setComments={setComments}></PostInputComment>
                }

                <Comment postId={params.id} comments={comments} setComments={setComments} isMuted={data?.muted}></Comment>

            </div>

        </div>
      
        <div className='fr-suggestion-posts'>

            {randomPosts.map(post => (
                <div onClick={() => {router.push('/post/'+post.id)}} className='item-suggestion-post' key={post.id}>
                    <div className='image-suggestion-post'>
                        <img src={post.media[0]?.mediaType==="video" ? 'https://image.lehienthanh1.workers.dev/?id='+post.media[0].thumb_url : 'https://image.lehienthanh1.workers.dev/?id='+post.media[0]?.url } alt="Post Image" />
                    </div>
                    <div className='text-suggestion-post'>
                        <p>
                            {post.title}
                        </p>
                    </div>
                </div>
            ))}

        </div>
    </div>
  )
}

export default page