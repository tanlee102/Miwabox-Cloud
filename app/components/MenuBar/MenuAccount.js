import React, { useContext, useEffect, useState } from 'react'

import "../../styles/MenuBar/VerticalMenu.css"
import Link from 'next/link';
import Cookies from 'js-cookie';
import { LayoutContext } from '@/app/context/LayoutContext';

const MenuAccount = ({listMenuAccount, idItem}) => {

    const {conFirmFun} = useContext(LayoutContext)

    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|.*Tablet.*|.*Touch/i.test(navigator.userAgent);
    const [showItemMenuAccount, setShowItemMenuAccount] = useState(!isMobileDevice);
    
    const pickMenu = (index) => {
        if(index == idItem){  
            return {
                backgroundColor: "rgb(70, 70, 158)",
                color: "white"
            }
        }
    }

    useEffect(() => {

    }, []);

    const logoutBtn = () => {
        conFirmFun('Logout', 'All data will be deleted, do you want to log out?', () => {
            Cookies.remove("token");
            Cookies.remove('thumbnail');
            Cookies.remove('username');
            window.location.replace("/");
        });
    }
    
  return (
    <div class="vertical-menu" onResize={() => {onResizex()}}>

        <button id="expand-vertical-menu" onClick={() => {setShowItemMenuAccount(!showItemMenuAccount)}}><svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="black" class="bi bi-list" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/></svg></button>

        <p>Setting</p>

        <div class="item-vertical-menu" style={{display: showItemMenuAccount ? "block" : "none"}}>
            <ul>
                {listMenuAccount.map((item, index) => 
                    <Link key={index} href={item.url}><li style={pickMenu(index)}>{item.label}</li></Link>
                )}
                <li onClick={() => logoutBtn()} >Logout</li>
            </ul>
        </div>

    </div>
  )
}

export default MenuAccount
