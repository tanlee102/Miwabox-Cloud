'use client';

import React, { useContext, useEffect, useState } from 'react';
import ProfileHeader from '../components/Profile/ProfileHeader';
import ProfileMenu from '../components/Profile/ProfileMenu';
import { useSearchParams } from 'next/navigation';
import { WindowContext } from '../context/WindowContext';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import ContentByUser from '../components/Profile/ContentByUser';
import FollowingSection from '../components/Profile/FollowingSection';

async function getData(username) {
  const token = Cookies.get('token');
  let res = null;
  if (!token) {
    res = await fetch('http://localhost:8080/api/v1/users/profile/'+username);
  }else{
    const decoded = jwtDecode(token);
    res = await fetch('http://localhost:8080/api/v1/users/profile/'+username+"?userId="+decoded.id);
  }
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

const page = ({params}) => {

  const {setDisplayPost} = useContext(WindowContext);

  const [data, setData] = useState({});

  const loadData = async (username) =>  {
    let data = await getData(username);
    setData(data);
  }

  useEffect(() => {
    loadData(params.username);
    setDisplayPost(false);
  }, []);

  const searchParams = useSearchParams();
  const type = searchParams.get('type') || 1;

  return (
    <div className='fr-profile fr-content'>
        <ProfileHeader dataProfile={data}></ProfileHeader>
        <ProfileMenu username={params.username} type={type}></ProfileMenu>
        {Number(type) < 4 ? 
          <ContentByUser type={Number(type)} userId={data.id}></ContentByUser> : 
          <FollowingSection userId={data.id}></FollowingSection>
        }
    </div>
  )
}

export default page