import React, { useEffect, useState } from 'react';

import "../../styles/Post/InputThread.css";
import "../../styles/Post/CommentHub.css";

import PostInfo from './Components/PostInfo';
import PostContent from './Components/PostContent';
import Comment from './Components/Comment';
import PostInputComment from './Components/PostInputComment';

async function getData(postId, userId) {
    const res = await fetch('http://localhost:8080/api/v1/posts/v2/'+postId+'?userId='+userId);
    if (!res.ok) {
        console.log('Failed to fetch data');
        return null;
    }else{
        return res.json();
    }
}

const Post = ({displayPost, postId, userData}) => {

    const [data, setData] = useState({});
    const loadData = async () => {
        let data;
        if (userData?.id) {
            data = await getData(postId, userData.id);
        }else{
            data = await getData(postId, -1);
        }
        setData(data);
    }
    useEffect(() => {
        if(displayPost){
            loadData();
        }
    }, [displayPost]);


    const [comments, setComments] = useState([]);

  return (
<>
    <div className='post-content'>

        <PostInfo postData={data}></PostInfo>

        <PostContent postData={data}></PostContent>

        <Comment comments={comments} setComments={setComments}></Comment>

    </div>

    <PostInputComment comments={comments} setComments={setComments} isUsingFull={false}></PostInputComment>
</>
  )
}

export default Post