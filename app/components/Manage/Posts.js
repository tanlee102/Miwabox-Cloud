import React, { useContext, useEffect, useState } from 'react';
import OptionPanelPart from '../Other/OptionPanelPart';
import { converTime } from '@/app/helper/converTime';
import Cookies from 'js-cookie';

import PopOutPostManagePanel from '../Other/PopOutPostManagePanel';
import { jwtDecode } from 'jwt-decode';
import { WindowContext } from '@/app/context/WindowContext';

// Function to fetch data based on sortingIndex
async function getData(sortingIndex, page, size) {
    let url;
    switch (sortingIndex) {
        case 1: // Restricted
            url = `https://hoifancuongonepiece.site/api/v1/posts/restricted?page=${page}&size=${size}`;
            break;
        case 2: // Muted
            url = `https://hoifancuongonepiece.site/api/v1/posts/muted?page=${page}&size=${size}`;
            break;
        default: // Chronology (Ordered by ID)
            url = `https://hoifancuongonepiece.site/api/v1/posts/orderById?limit=1000`;
            break;
    }

    const res = await fetch(url);
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

const Posts = ({ sortingIndex }) => {
    const [data, setData] = useState([]);
    const {setPostId, setDisplayPost} = useContext(WindowContext);

    const loadData = async (sortingIndex, page, size) => {
        const token = Cookies.get('token');
        if (token) {
            const decoded = jwtDecode(token);
        }
        const data = await getData(sortingIndex, page, size);
        setData(data);
    };

    useEffect(() => {
        loadData(sortingIndex, 0, 100);
    }, [sortingIndex]);

    return (
        <>
            {data?.map((item, index) => (
                <div className="post-manage" key={index}>
                    <div style={{cursor: 'pointer'}} className="post-manage-image" onClick={() => {setDisplayPost(true); setPostId(item.id);}}>
                        <img
                            src={
                                item.media[0].mediaType === 'video'
                                    ? 'https://image.lehienthanh1.workers.dev/?id=' + item.media[0].thumb_url
                                    : 'https://image.lehienthanh1.workers.dev/?id=' + item.media[0].url
                            }
                            alt="Post Image"
                        />
                    </div>
                    <div style={{cursor: 'pointer'}} className="post-manage-content" onClick={() => {setDisplayPost(true); setPostId(item.id);}}>
                        <h3>{item.title}</h3>
                        <p>{converTime(item.createdAt)}</p>
                    </div>

                    <div className="post-manage-button">
                        <PopOutPostManagePanel restricted={item.restricted} muted={item.muted} postId={item.id}></PopOutPostManagePanel>
                    </div>

                    <div className="post-manage-item">
                        <p>{item.commentCount} comments</p>
                    </div>
                    <div className="post-manage-item">
                        <p>{item.likeCount} likes</p>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Posts;