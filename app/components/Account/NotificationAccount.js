'use client';

import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { converTime } from '@/app/helper/converTime';
import { WindowContext } from '@/app/context/WindowContext';
import LoadMore from '../Other/LoadMore';

const NotificationAccount = () => {
    const [data, setData] = useState([]);
    const { userData } = useContext(WindowContext);
    const [loadMoreState, setLoadMoreState] = useState(false);
    const [displayLoadMore, setDisplayLoadMore] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    const fetchData = async (page = 0, size = 40) => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/notification/users/${userData.id}/notifications?page=${page}&size=${size}`);
            const result = await response.json();
            if (page === 0) {
                setData(result);
            } else {
                setData(prevData => [...prevData, ...result]);
            }
            setDisplayLoadMore(result.length >= 10);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        if (userData.id) fetchData();
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

    const handleLoadMore = async () => {
        setLoadMoreState(true);
        await fetchData(currentPage + 1);
        setCurrentPage(prevPage => prevPage + 1);
        setLoadMoreState(false);
    }

    const setUrlNotifications = (notification) => {
        const type = notification.type;
        const entityId = notification.entityId;
        const username = notification.actorDetails[0].username;
        if(type === 'like' || type === 'comment' || type === 'reply'){
            return `/post/${entityId}`
        }else{
            return `/${username}`
        }
    }

    return (
        <div className="member-hub notification-hub form-account">
            {data?.map((notification, index) => (
                <div key={index} className="item-tab notification-tab">
                    <Link href={"/" + notification.actorDetails[0].username}>
                        <div className="ava-notification-tab">
                            <span>
                                <img src={notification.actorDetails[0].profileImageUrl ? 'https://image.lehienthanh.workers.dev/?id=' + notification.actorDetails[0].profileImageUrl : '/avatar.jpeg'} alt="" />
                            </span>
                        </div>
                    </Link>
                    <div className="content-notification-tab">
                        <Link href={
                            setUrlNotifications(notification)
                            }>
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
            {displayLoadMore && (
                <LoadMore loadState={loadMoreState} setLoadState={setLoadMoreState} btnAct={handleLoadMore} />
            )}
        </div>
    );
}

export default NotificationAccount;
