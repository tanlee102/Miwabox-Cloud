import React, { useEffect, useState } from 'react'
import OptionPanelPart from '../Other/OptionPanelPart'
import { converTime } from '@/app/helper/converTime';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';


async function getData(page, size) {
    const res = await fetch('http://localhost:8080/api/v1/posts');
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    
    return res.json();
}


const Posts = () => {

    const [data, setData] = useState([]);

    const loadData = async (page, size) => {
        const token = Cookies.get('token');
        if (token) {
            const decoded = jwtDecode(token);
        }
        const data = await getData(page, size);
        setData(data);
    }

    useEffect(() => {
        loadData(0, 10);
    }, []);


  return (
    <>
        {data?.map((item, index) => ( 
            <div class="post-manage">
                <div class="post-manage-image">
                    <img src={item.media[0].mediaType==="video" ? 'https://image.lehienthanh1.workers.dev/?id='+item.media[0].thumb_url : 'https://image.lehienthanh1.workers.dev/?id='+item.media[0].url } alt="Post Image" />
                </div>
                <div class="post-manage-content">
                    <h3>{item.title}</h3>
                    <p>{converTime(item.createdAt)}</p>
                </div>
            
                <div class="post-manage-button">
                    <OptionPanelPart isAdmin={true}></OptionPanelPart>
                </div>

                <div class="post-manage-item">
                    <p>{item.commentCount} comments</p>
                </div>
                <div class="post-manage-item">
                    <p>{item.likeCount} likes</p>
                </div>
                
                {/* <div class="post-manage-date">
                    <p>23-23-2013</p>
                </div> */}

            </div>
        ))}


    </>
  )
}

export default Posts