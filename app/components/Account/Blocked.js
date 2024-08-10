import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import BlockButton from '../Manage/BlockButton';




const Blocked = () => {

    const [data, setData] = useState([]);


    const getData = async () => {

        const token = Cookies.get('token');
        if (!token) {
          alert('No authentication token found');
          return;
        }
      
        try {
          const response = await axios.post(`http://localhost:8080/api/v1/blocks/blocked-users`, {}, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
      
          setData(response.data);
          console.log(response.data);
        } catch (error) {
          console.error('Error loading user data:', error);
        }
    };

    useEffect(() => {
        getData();
    }, [])


  return (
    <div className="member-hub">
    {data.map((user, index) => (
      <Link key={index} href={`/${user.username}`}>
        <div className="item-tab member-tab">
          <div className="content-member-tab">
            <div className="ava-item-tab">
              <img src={user?.profileUrl ? 'https://image.lehienthanh.workers.dev/?id='+user?.profileUrl : "/avatar.jpeg"} alt="" />
            </div>
            <div className="content-item-tab">
              <div className="title-item-tab set-bold">{user.username}</div>
            </div>
          </div>

            <BlockButton user={user}></BlockButton>
          
        </div>
      </Link>
    ))}
  </div>
  )
}

export default Blocked
