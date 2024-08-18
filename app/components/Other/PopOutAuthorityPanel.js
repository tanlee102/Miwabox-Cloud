import { LayoutContext } from '@/app/context/LayoutContext';
import { useOutsideClick } from '@/app/helper/useOutsideClick';
import axios from 'axios';
import Cookies from 'js-cookie';

import React, { useState, useEffect, useContext } from 'react'


const PopOutAuthorityPanel = ({idMember}) => {


    const {conFirmFun} = useContext(LayoutContext);


    const handleClickOutside = () => {
        targetRefExp.current.style.display = 'none';
    };
    
    const targetRefExp = useOutsideClick(handleClickOutside);
    const handleClick = () => {
        targetRefExp.current.style.display = 'flex';
    };

    const handleHeaderClick = (event) => {
      event.stopPropagation();
    };

    const removeAdmin = () => {
        console.log(idMember)

        conFirmFun("Manage", "Do you want to reset this member to USER?", async () => {
            conFirmFun("Quản lý");
            setTimeout(async () => {
                try {
                    const token = Cookies.get('token');
                    const response = await axios.post(`https://hoifancuongonepiece.site/api/v1/users/role/user/${idMember}`, {}, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });

                    if (response.status === 200) {
                        conFirmFun();
                        targetRefExp.current.style.display = 'none';
                    } else {
                        conFirmFun("Quản lý", "Failed to set user as USER.");
                    }
                } catch (error) {
                    conFirmFun("Quản lý", "Error occurred: " + error.message);
                }
            }, 400);
        });
    }


  return (
    <>
        <span class="btn-icon-member-tab btn-member-tab un-btn-member-tab" onClick={() => handleClick()}>
            <svg version="1.1"  x="0px" y="0px" viewBox="0 0 472.576 472.576">
            <circle cx="65.142" cy="236.288" r="65.142"/>
            <circle cx="236.308" cy="236.288" r="65.142"/>
            <circle cx="407.434" cy="236.288" r="65.142"/>
            </svg>
                <div class="pop-out-member-panel pop-out-member-panel-right pop-out-member-panel-admin" ref={targetRefExp} style={{display: "none"}}>
                    <div onClick={() => {removeAdmin()}}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 30 30"><path stroke='none' d="M 15 3 C 11.783059 3 8.8641982 4.2807926 6.7070312 6.3496094 A 1.0001 1.0001 0 0 0 6.3476562 6.7070312 C 4.2793766 8.8641071 3 11.783531 3 15 C 3 21.615572 8.3844276 27 15 27 C 18.210007 27 21.123475 25.724995 23.279297 23.664062 A 1.0001 1.0001 0 0 0 23.662109 23.28125 C 25.724168 21.125235 27 18.210998 27 15 C 27 8.3844276 21.615572 3 15 3 z M 15 5 C 20.534692 5 25 9.4653079 25 15 C 25 17.40637 24.155173 19.609062 22.746094 21.332031 L 8.6679688 7.2539062 C 10.390938 5.8448274 12.59363 5 15 5 z M 7.2539062 8.6679688 L 21.332031 22.746094 C 19.609062 24.155173 17.40637 25 15 25 C 9.4653079 25 5 20.534692 5 15 C 5 12.59363 5.8448274 10.390938 7.2539062 8.6679688 z"></path></svg>                
                        <p>Remove administrative rights</p>
                    </div>
                </div>
        </span>
    </>
  )
}

export default PopOutAuthorityPanel;
