import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import OptionPanelPart from '../Other/OptionPanelPart';

async function getData(page, size, sortingIndex) {
    let url = 'http://8.219.96.109/api/v1/users/';
    if (sortingIndex === 0) {
        url += 'latest';
    } else if (sortingIndex === 1) {
        url += 'latest-banned';
    }
    const res = await fetch(`${url}?page=${page}&size=${size}`);
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

const Members = ({ sortingIndex }) => {
    const [data, setData] = useState([]);

    const loadData = async (page, size) => {
        const data = await getData(page, size, sortingIndex);
        setData(data?.content);
    };

    useEffect(() => {
        loadData(0, 30);
    }, [sortingIndex]);

    return (
        <div className='manage-hub member-hub'>
            {data?.map((ite, index) => (
                <div key={index} className="item-tab member-tab set-border-box-1 set-margin-top-1px">
                    <div className="content-member-tab">
                        <Link href={'/' + ite.username}>
                            <div className="ava-item-tab">
                                <a href="">
                                    <img src={ite.profileImageUrl ? 'https://image.lehienthanh.workers.dev/?id=' + ite.profileImageUrl : '/avatar.jpeg'} alt="" />
                                </a>
                            </div>
                        </Link>
                        <div className="content-item-tab">
                            <div className="title-item-tab set-bold set-black-white">{ite.username}</div>
                            <div className="list-in-line set-anchor-gray-color">
                                <ul>
                                    <li>Follower: {ite.followersCount}</li>
                                    <li>TotalPost: {ite.postsCount}</li>
                                    <li>Email: {ite.email}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <OptionPanelPart isBan={ite.banned} isAdmin={true} dataProfile={ite}></OptionPanelPart>
                </div>
            ))}
        </div>
    );
};

export default Members;
