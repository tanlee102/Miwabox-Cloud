import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import OptionPanelPart from '../Other/OptionPanelPart';

async function getData(page, size) {
    const res = await fetch('http://localhost:8080/api/v1/users/latest?page='+page+'&size='+size);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
}

const Members = () => {


    const [data, setData] = useState([]);

    const loadData = async (page, size) => {
        const token = Cookies.get('token');
        if (token) {
            const decoded = jwtDecode(token);
        }
        const data = await getData(page, size);
        setData(data?.content);
    }

    useEffect(() => {
        loadData(0, 10);
    }, []);


    return (
        <div className='manage-hub member-hub'>
        {data?.map((ite, index) => ( 

            <div key={index} class="item-tab member-tab set-border-box-1 set-margin-top-1px">
                <div class="content-member-tab">
                    <Link href={'/'+ite.username}>
                        <div class="ava-item-tab">
                            <a href="">
                                <img src={ite.profileImageUrl ? 'https://image.lehienthanh.workers.dev/?id='+ ite.profileImageUrl : '/avatar.jpeg'} alt="" />
                            </a>
                        </div>
                    </Link>
                    <div class="content-item-tab">
                        <div class="title-item-tab set-bold set-black-white">{ite.username}</div>
                        <div class="list-in-line set-anchor-gray-color">
                            <ul>
                                <li>Follower: {ite.followersCount} </li>
                                <li>TotalPost: {ite.postsCount}</li>
                                <li>email: {ite.email}</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <OptionPanelPart isAdmin={true}></OptionPanelPart>

            </div>

        ))}
        </div>
    )
}

export default Members
