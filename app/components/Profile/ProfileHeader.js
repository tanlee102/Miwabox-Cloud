'use client'
import { WindowContext } from '@/app/context/WindowContext';
import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react'
import OptionPanelPart from '../Other/OptionPanelPart';

const ProfileHeader = ({dataProfile}) => {

    const [follow, setFollow] = useState(false);
    const {userData} = useContext(WindowContext);

    useEffect(() => {
        setFollow(dataProfile.following); // Assuming `isFollowing` is a field in `dataProfile`
    }, [dataProfile]);

    const handleFollow = async () => {
        const token = Cookies.get('token');
        if (!token) return;

        let url = null;
        if(follow){
            url = 'http://localhost:8080/api/v1/followers/unfollow';
            setFollow(false);
        }else{
            url = 'http://localhost:8080/api/v1/followers/follow';
            setFollow(true);
        }

        try {
            const response = await fetch(url+"?followerId="+dataProfile.id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: {},
            });

            if (response.ok) {
                setFollow(!follow);
                // Optionally update the followers count in `dataProfile`
            } else {
                const errorData = await response.json();
                console.error('Error:', errorData);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

  return (
    <div className='profile-header'>
        <div className='profile-avatar-container'>
            <img src={dataProfile.profileImageUrl ? 'https://image.lehienthanh.workers.dev/?id='+dataProfile.profileImageUrl : "/avatar.jpeg"} />
        </div>

        <div className='profile-name-container'>
            <p>{dataProfile.username}</p>
            {dataProfile.bio ? <span>{dataProfile.bio}</span>
            : ""}
        </div>

        <div className='profile-follow-container'>
            <div className='item-follow'>
                <span>{dataProfile.postsCount}</span>
                <span> Posts</span>
            </div>
            <div className='item-follow'>
                <span>{dataProfile.followersCount}</span>
                <span> Followers</span>
            </div>
            <div className='item-follow'>
                <span>{dataProfile.followingCount}</span>
                <span> Following</span>
            </div>
        </div>

        {dataProfile.id === userData.id ? ""
        :
        <div className='contain-profile-option'>
            <div className='button-profile-option'>{}
                <OptionPanelPart isAdmin={userData.role === "ADMIN" ? true : false} dataProfile={dataProfile}></OptionPanelPart>
            </div>
            <div className={`follow-button ${!follow? "" : "followed"}`}>
                <span onClick={() => handleFollow()}>
                    {follow? "Following" : "Follow"}
                </span>
            </div>
        </div>
        }
        
    </div>
  )
}

export default ProfileHeader
