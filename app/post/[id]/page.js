'use client'
import React, { useContext, useEffect, useRef, useState } from 'react'

import '../../styles/Post/FullPost.css';
import '../../styles/Post/FullPostRes.css';

import Link from 'next/link';
import { converTime } from '@/app/helper/converTime';
import PostInfo from '@/app/components/Post/Components/PostInfo';
import PostContent from '@/app/components/Post/Components/PostContent';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { WindowContext } from '@/app/context/WindowContext';
import LoadMore from '@/app/components/Other/LoadMore';
import Comment from '@/app/components/Post/Components/Comment';
import PostInputComment from '@/app/components/Post/Components/PostInputComment';

async function getData(postId, userId) {
    const res = await fetch('http://localhost:8080/api/v1/posts/v2/'+postId+'?userId='+userId)
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
}

const page = ({params}) => {

    const [data, setData] = useState({});
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
        loadData();
    }, []);

    const [comments, setComments] = useState([]);

  return (
    <div className='fr-full-post fr-content'>
        <div className='full-post'>

            <div className='post-content'>

                <PostInfo postData={data}></PostInfo>

                <PostContent postData={data}></PostContent>

                <PostInputComment comments={comments} setComments={setComments}></PostInputComment>

                <Comment comments={comments} setComments={setComments}></Comment>

            </div>

        </div>
      
        <div className='fr-suggestion-posts'>

            <div className='item-suggestion-post'>
                <div className='image-suggestion-post'>
                    <img src='https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_863/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/v6bwf3e8qhdfhrgq7lv3/V%C3%A9C%C3%B4ngVi%C3%AAnGi%E1%BA%A3iTr%C3%ADIMGWorldsofAdventure%E1%BB%9FDubai.jpg' />
                </div>
                <div className='text-suggestion-post'>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                </div>
            </div>

            <div className='item-suggestion-post'>
                <div className='image-suggestion-post'>
                    <img src='https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_863/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/v6bwf3e8qhdfhrgq7lv3/V%C3%A9C%C3%B4ngVi%C3%AAnGi%E1%BA%A3iTr%C3%ADIMGWorldsofAdventure%E1%BB%9FDubai.jpg' />
                </div>
                <div className='text-suggestion-post'>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                </div>
            </div>

        </div>
    </div>
  )
}

export default page
