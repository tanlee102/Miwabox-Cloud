import React, { useEffect, useState } from 'react'
import OptionPanelPart from '../Other/OptionPanelPart'
import axios from 'axios';
import PopOutAuthorityPanel from '../Other/PopOutAuthorityPanel';


const Roles = () => {

  const [data, setData] = useState();

  const loadRoles = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/users/role/2');
      if (response.status === 200) {
          const responseData = await response.json();
          setData(responseData);
      }else{}
    } catch (error) {}
  }

  useEffect(() => {
    loadRoles();
  }, []);

  return (
      <div className="member-hub">
          {data?.map(user => (
            <div className="item-tab member-tab">
              <div key={user.userId} className="content-member-tab">
                <div className="ava-item-tab">
                  <img src={user?.profileImageUrl ? 'https://image.lehienthanh.workers.dev/?id=' + user.profileImageUrl : '/avatar.jpeg'} alt="" />
                </div>
                <div className="content-item-tab">
                  <div className="title-item-tab set-bold set-black-white">{user.username}</div>
                  <div className="list-in-line set-anchor-gray-color">
                    <ul>
                        <li>Admin</li>
                    </ul>
                  </div>
                </div>
              </div>
              <PopOutAuthorityPanel idMember={user.userId}></PopOutAuthorityPanel>
            </div>
          ))}
      </div>
  )
}

export default Roles
