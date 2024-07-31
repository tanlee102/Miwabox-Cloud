'use client';

import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { converTime } from '@/app/helper/converTime';
import { WindowContext } from '@/app/context/WindowContext';

const NotificationAccount = () => {

    const [data, setData] = useState([]);
    const {userData} = useContext(WindowContext);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/notification/users/'+userData.id+'/notifications?page=0&size=30');
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        if(userData.id) fetchData();
    }, [userData?.id]);

    const getNotificationDescription = (type) => {
        switch (type) {
            case 'like':
                return 'liked your post';
            case 'comment':
                return 'commented on your post';
            case 'follow':
                return 'started following you';
            case 'reply':
                return 'replied to your comment';
            default:
                return 'did something';
        }
    };

    return (
        <div className="member-hub notification-hub form-account">
            {data.map((notification, index) => (
                <div key={index} className="item-tab notification-tab">
                    <Link href={"/" + notification.actorDetails[0].username}>
                        <div className="ava-notification-tab">
                            <span>
                                <img src={notification.actorDetails[0].profileImageUrl ? 'https://image.lehienthanh.workers.dev/?id='+ notification.actorDetails[0].profileImageUrl : '/avatar.jpeg'} alt="" />
                            </span>
                        </div>
                    </Link>

                    <div className="content-notification-tab">
                        <Link href={`/${notification.type}/${notification.entityId}`}>
                            <div>
                                <div className="text-notification-tab">
                                    <a>{notification.actorDetails[0].username}</a>
                                    {notification.actorDetails.length > 1 && (
                                        <>
                                            <span> and </span>
                                            <a>{notification.actorDetails.length - 1} others </a>
                                        </>
                                    )}
                                    <span> {getNotificationDescription(notification.type)}</span>
                                </div>
                                <div className="time-notification-tab">
                                    {converTime(notification.latestCreatedAt)}
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default NotificationAccount
