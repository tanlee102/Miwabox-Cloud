import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import Dropdown from '../DropDown/DropDown';
import axios from 'axios';
import Cookies from 'js-cookie';
import { WindowContext } from '@/app/context/WindowContext';

const getData = async (userId, typeFollow, setMyData) => {

  const token = Cookies.get('token');
  if (!token) {
    alert('No authentication token found');
    return;
  }

  try {
    const endpoint = typeFollow === 0 ? 'followers' : 'following';
    const response = await axios.post(`http://8.219.96.109/api/v1/followers/${endpoint}?userId=${userId}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setMyData(response.data);
  } catch (error) {
    console.error('Error loading user data:', error);
  }
};

const FollowingSection = ({ userId }) => {
  const [typeFollow, setTypeFollow] = useState(0);
  const [data, setData] = useState([]);
  const {userData} = useContext(WindowContext)

  const loadData = (userId) => {
    getData(userId, typeFollow, setData);
  };

  useEffect(() => {
    if (userId) {
      loadData(userId);
    }
  }, [userId, typeFollow]);

  const handleFollow = async (user) => {
    const token = Cookies.get('token');
    if (!token) return;

    let url = null;
    if (user.followed) {
      url = 'http://8.219.96.109/api/v1/followers/unfollow';
    } else {
      url = 'http://8.219.96.109/api/v1/followers/follow';
    }

    try {
      const response = await axios.post(`${url}?followerId=${user.userId}`, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // Update the user follow status in the data
        setData((prevData) =>
          prevData.map((item) =>
            item.userId === user.userId ? { ...item, followed: !user.followed } : item
          )
        );
      } else {
        console.error('Error:', response.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Dropdown options={['Follower', 'Following']} indexOption={typeFollow} setIndexOption={setTypeFollow} />

      <div className="member-hub">
        {data.map((user, index) => (
          <Link key={index} href={`/${user.username}`}>
            <div className="item-tab member-tab">
              <div className="content-member-tab">
                <div className="ava-item-tab">
                  <img src={user?.profileImageUrl ? 'https://image.lehienthanh.workers.dev/?id='+user?.profileImageUrl : "/avatar.jpeg"} alt="" />
                </div>
                <div className="content-item-tab">
                  <div className="title-item-tab set-bold">{user.username}</div>
                </div>
              </div>
              {userData.id !== user.userId &&
                  <span
                  onClick={(e) => {
                    e.preventDefault();
                    handleFollow(user);
                  }}
                  className={user.followed ? 'btn-member-tab un-btn-member-tab' : 'btn-member-tab'}
                >
                  <p>{user.followed ? 'Bỏ theo dõi' : 'Theo dõi'}</p>
                </span>
              }
            </div>
          </Link>
        ))}


        <>
        {data.length <= 0 && (
            <div className="empty-users">
                <p>No users found.</p>
            </div>
        )}
        </>

      </div>
    </>
  );
};

export default FollowingSection;
