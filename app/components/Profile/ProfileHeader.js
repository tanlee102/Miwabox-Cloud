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
            url = 'https://hoifancuongonepiece.site/api/v1/followers/unfollow';
            setFollow(false);
        }else{
            url = 'https://hoifancuongonepiece.site/api/v1/followers/follow';
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



    const gettingConversation = async () => {
        try {
            const response = await fetch(`https://hoifancuongonepiece.site/api/conversation?userId1=${userData.id}&userId2=${dataProfile.id}`, {
                method: 'GET',
            });

            if (response.ok) {
                const conversation = await response.json();
                window.location.replace(`/chat?conversation=${conversation.id}`);
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
            <div className='button-profile-option'>
                <OptionPanelPart isBan={dataProfile.banned} isAdmin={userData.role === "ADMIN" ? true : false} dataProfile={dataProfile}></OptionPanelPart>
            </div>
            <div onClick={() => {gettingConversation()}} class="icon-nav-item message-icon-nav-item" style={{marginRight: '5px', cursor: 'pointer'}}><svg viewBox="0 0 24 24" fill="none"><path style={{stroke: "rgb(127, 127, 127)"}} d="M17 3.33782C15.5291 2.48697 13.8214 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22C17.5228 22 22 17.5228 22 12C22 10.1786 21.513 8.47087 20.6622 7" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path><path d="M8 12H8.009M11.991 12H12M15.991 12H16" stroke="#1C274C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>
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
