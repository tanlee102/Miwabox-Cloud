'use client'

import React, { useState, useEffect, useLayoutEffect, useContext } from 'react'
import Link from 'next/link';
import Cookies from 'js-cookie';


import { env_variable } from '../env';
import { checkHasClass } from '../helper/checkHasClass';
import { WindowContext } from "../context/WindowContext";


const checkType = _width => 
    _width <= 480 ? 1 :
    _width <= 768 ? 2 :
    _width <= 1024 ? 3 :
    _width <= 1440 ? 4 :
    5;                   

function useWindowDimensions() {
    const [width, setWidth] = useState(window?.innerWidth);
    const updateWidth = () => {
        setWidth(window?.innerWidth);
    };
    useEffect(() => {
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);
    return { width };
}

const Nav = ({}) => {


    const config = {
        userData: {},
        logged: false,
        countNot: 0
    };
    const { userData, logged, countNot} = config;


    const {darkMode, setDarkMode, setDisplayLoginModel} = useContext(WindowContext);


    const { width } = useWindowDimensions();
    const [typeWindow, setTypeWindow] = useState(() => checkType(width));
    useLayoutEffect(() => {
        if(typeWindow > 2){
            setShowListItems(false)
        }else{
            setShowSearchItem(false)
        }
    }, []);
    useEffect(() => {
        const newType = checkType(width);
        if (typeWindow !== newType) {
            setTypeWindow(newType);
            if(newType > 2){
                setShowListItems(false)
                setShowSearchItem(true)
            }else{
                setShowSearchItem(false)
            }
        }
    }, [width, typeWindow]);


    



    const [showListItems, setShowListItems] = useState(false);
    const [showSearchItem, setShowSearchItem] = useState(true);
    const [isFocus,setIsFocus] = useState(false);
    const [searchBorder, setSearchBorder] = useState("");


    var MenuClick = function(event) {
        var x = event.target;
        if(checkHasClass(x, 'mark-item')){
            setMenuProfile(false);  
        }else if(checkHasClass(x, 'mark-search')){
            setMenuProfile(false);  
        }else if(checkHasClass(x, 'search-button')){
            //No ACT
        }else if(checkHasClass(x, 'wrap-item-mb')){
            //No ACT
        }else if(checkHasClass(x, 'wrap-search')){
            //No ACT
        }else if(checkHasClass(x, 'wrap-profile')){
            //No ACT
        }else{
            if(typeWindow <= 2){
                setShowSearchItem(false)
            }
            setShowListItems(false)
            setMenuProfile(false);  
        }
    };


    const focus_searchBorder_Fu = () => {
        setSearchBorder("1pt solid cornflowerblue");
    }
    const out_searchBorder_Fu = () => {
        if(darkMode) setSearchBorder("1pt solid black");
        else setSearchBorder("1pt solid whitesmoke");
    }
    useEffect(() => {
        if(darkMode) setSearchBorder("1pt solid black");
        else setSearchBorder("1pt solid whitesmoke");
    }, [darkMode])




    const [menuProfile, setMenuProfile] = useState(false);
    const _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            getSearch();
        }
    }
    const getSearch = () => {
    }
    const changeMode = () => {
        Cookies.set('dark_mode', !darkMode, {path: '/', expires: 365});
        setDarkMode(!darkMode);
    }



return (
    <div className="wrap-bar" style={{position: 'fixed'}} onClick={(e) => {MenuClick(e);}}>
        <div className="nav-bar" >

            <div class="fr-nav-bar">

                {/*LOGO*/}
                <Link href="/">
                    <div className="wrap-logo"><svg viewBox="0 0 184.48 160.05"><rect class="cls-1" x="76.24" y="-7.48" width="82.8" height="175.02" rx="41.4" transform="translate(-24.63 78.17) rotate(-33.48)"/><rect class="cls-2" x="25.19" y="-7.48" width="82.8" height="175.02" rx="41.4" transform="matrix(0.84, 0.55, -0.55, 0.84, 54.53, -23.38)"/></svg></div>
                </Link>

                {/*ITEM DESKTOP*/}
                <div className="wrap-item">
                    <Link href='/news/'><div>Posts</div></Link>
                    <Link href='/members/'><div>Reels</div></Link>
                    <div onClick={() => {changeMode()}} className='light-bulb'> <svg viewBox="0 0 512 512"><path d="m256,105.5c-83.9,0-152.2,68.3-152.2,152.2 0,83.9 68.3,152.2 152.2,152.2 83.9,0 152.2-68.3 152.2-152.2 0-84-68.3-152.2-152.2-152.2zm0,263.5c-61.4,0-111.4-50-111.4-111.4 0-61.4 50-111.4 111.4-111.4 61.4,0 111.4,50 111.4,111.4 0,61.4-50,111.4-111.4,111.4z"/><path d="m256,74.8c11.3,0 20.4-9.1 20.4-20.4v-23c0-11.3-9.1-20.4-20.4-20.4-11.3,0-20.4,9.1-20.4,20.4v23c2.84217e-14,11.3 9.1,20.4 20.4,20.4z"/><path d="m256,437.2c-11.3,0-20.4,9.1-20.4,20.4v22.9c0,11.3 9.1,20.4 20.4,20.4 11.3,0 20.4-9.1 20.4-20.4v-22.9c0-11.2-9.1-20.4-20.4-20.4z"/><path d="m480.6,235.6h-23c-11.3,0-20.4,9.1-20.4,20.4 0,11.3 9.1,20.4 20.4,20.4h23c11.3,0 20.4-9.1 20.4-20.4 0-11.3-9.1-20.4-20.4-20.4z"/><path d="m54.4,235.6h-23c-11.3,0-20.4,9.1-20.4,20.4 0,11.3 9.1,20.4 20.4,20.4h22.9c11.3,0 20.4-9.1 20.4-20.4 0.1-11.3-9.1-20.4-20.3-20.4z"/><path d="M400.4,82.8L384.1,99c-8,8-8,20.9,0,28.9s20.9,8,28.9,0l16.2-16.2c8-8,8-20.9,0-28.9S408.3,74.8,400.4,82.8z"/><path d="m99,384.1l-16.2,16.2c-8,8-8,20.9 0,28.9 8,8 20.9,8 28.9,0l16.2-16.2c8-8 8-20.9 0-28.9s-20.9-7.9-28.9,0z"/><path d="m413,384.1c-8-8-20.9-8-28.9,0-8,8-8,20.9 0,28.9l16.2,16.2c8,8 20.9,8 28.9,0 8-8 8-20.9 0-28.9l-16.2-16.2z"/><path d="m99,127.9c8,8 20.9,8 28.9,0 8-8 8-20.9 0-28.9l-16.2-16.2c-8-8-20.9-8-28.9,0-8,8-8,20.9 0,28.9l16.2,16.2z"/></svg></div>
                </div>

                {/*BUTT0N DISPLAY ITEM*/}
                <div className="mark-item" >
                    <div id="mark-item" onClick={() => {{!showListItems ? setShowSearchItem(false) : null }; setShowListItems(!showListItems)}}>
                        {
                            !showListItems ? 
                                <svg height="100%" viewBox="0 0 512 512" width="100%" ><path d="m464.883 64.267h-417.766c-25.98 0-47.117 21.136-47.117 47.149 0 25.98 21.137 47.117 47.117 47.117h417.766c25.98 0 47.117-21.137 47.117-47.117 0-26.013-21.137-47.149-47.117-47.149z"/><path d="m464.883 208.867h-417.766c-25.98 0-47.117 21.136-47.117 47.149 0 25.98 21.137 47.117 47.117 47.117h417.766c25.98 0 47.117-21.137 47.117-47.117 0-26.013-21.137-47.149-47.117-47.149z"/><path d="m464.883 353.467h-417.766c-25.98 0-47.117 21.137-47.117 47.149 0 25.98 21.137 47.117 47.117 47.117h417.766c25.98 0 47.117-21.137 47.117-47.117 0-26.012-21.137-47.149-47.117-47.149z"/></svg>
                            :
                                <svg height="100%" viewBox="-41 -41 448 448" width="100%" ><path d="m243.1875 182.859375 113.132812-113.132813c12.5-12.5 12.5-32.765624 0-45.246093l-15.082031-15.082031c-12.503906-12.503907-32.769531-12.503907-45.25 0l-113.128906 113.128906-113.132813-113.152344c-12.5-12.5-32.765624-12.5-45.246093 0l-15.105469 15.082031c-12.5 12.503907-12.5 32.769531 0 45.25l113.152344 113.152344-113.128906 113.128906c-12.503907 12.503907-12.503907 32.769531 0 45.25l15.082031 15.082031c12.5 12.5 32.765625 12.5 45.246093 0l113.132813-113.132812 113.128906 113.132812c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082031c12.5-12.503906 12.5-32.769531 0-45.25zm0 0"/></svg>
                        }
                    </div>
                </div>

                {/*BUTT0N DISPLAY ITEM*/}
                {logged ?
                <div className="mark-search" >
                    <div id="mark-search" onClick={() => {{!showSearchItem ? setShowListItems(false) : null }; setShowSearchItem(!showSearchItem);}}>
                        {
                            !showSearchItem ?
                            <svg id="mark-show-search" x="0px" y="0px" width="100%" height="100%" viewBox="-5 -5 135 135" stroke="#000000" ><path  d="M51,102.05c10.5,0,20.2-3.2,28.3-8.6l29.3,29.3c2.301,2.3,6.101,2.3,8.5,0l5.7-5.7c2.3-2.3,2.3-6.1,0-8.5L93.4,79.35 c5.399-8.1,8.6-17.8,8.6-28.3c0-28.1-22.9-51-51-51c-28.1,0-51,22.9-51,51C0,79.149,22.8,102.05,51,102.05z M51,20.05 c17.1,0,31,13.9,31,31c0,17.1-13.9,31-31,31c-17.1,0-31-13.9-31-31C20,33.95,33.9,20.05,51,20.05z"></path> </svg>
                            :
                            <svg id="mark-close-search" height="100%" viewBox="-41 -41 448 448" width="100%" ><path d="m243.1875 182.859375 113.132812-113.132813c12.5-12.5 12.5-32.765624 0-45.246093l-15.082031-15.082031c-12.503906-12.503907-32.769531-12.503907-45.25 0l-113.128906 113.128906-113.132813-113.152344c-12.5-12.5-32.765624-12.5-45.246093 0l-15.105469 15.082031c-12.5 12.503907-12.5 32.769531 0 45.25l113.152344 113.152344-113.128906 113.128906c-12.503907 12.503907-12.503907 32.769531 0 45.25l15.082031 15.082031c12.5 12.5 32.765625 12.5 45.246093 0l113.132813-113.132812 113.128906 113.132812c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082031c12.5-12.503906 12.5-32.769531 0-45.25zm0 0"/></svg>
                        }
                    </div>
                </div>
                : ""}

                
                {/* NOTIFICATION */}
                {logged ? 
                <Link href="/account/notification">
                    <div className="wrap-notification" >
                        <div>
                            {countNot>-1 ? <p>{countNot}</p> : ""}
                            <svg viewBox="0 -10 448 512"><path d="M222.987,510c31.418,0,57.529-22.646,62.949-52.5H160.038C165.458,487.354,191.569,510,222.987,510z"/><path d="M432.871,352.059c-22.25-22.25-49.884-32.941-49.884-141.059c0-79.394-57.831-145.269-133.663-157.83h-4.141c4.833-5.322,7.779-12.389,7.779-20.145c0-16.555-13.42-29.975-29.975-29.975s-29.975,13.42-29.975,29.975c0,7.755,2.946,14.823,7.779,20.145h-4.141C120.818,65.731,62.987,131.606,62.987,211c0,108.118-27.643,118.809-49.893,141.059C-17.055,382.208,4.312,434,47.035,434H398.93C441.568,434,463.081,382.269,432.871,352.059z"/></svg>
                        </div>
                    </div>
                </Link>
                : ""}
                
                
                {/* PROFILE ITEM */}
                {logged ? 
                <div  className="wrap-profile"  >
                    <div className='ava-profile' onClick={() => {setMenuProfile(!menuProfile)}}>
                        <img src="https://hobiverse.com.vn/cdn/shop/articles/gojo-satoru-cung-chieu-thuc-huy-diet_thumbnail_hobi_0f3f1d7307e24f76993db251b315a389.jpg?v=1716181133"/>
                    </div>
                    {menuProfile ? 
                        <div className='menu-profile' onClick={() => {setMenuProfile(false)}}>
                            <span class="mark-head-sheet-profile"></span>
                            <Link href={'/u/'+userData.user_name}><div>Trang cá nhân</div></Link>
                            {userData.admin ?  
                            <>
                                <Link href='/manage/1'><div>Quản lý</div></Link>
                                <Link href='/images/main'><div>Ảnh</div></Link>  
                            </>
                            : ""}
                            <Link href='/account/detail'><div>Tài khoản</div></Link>
                        </div>
                    : ""}
                </div>
                : ""}


                {/*LOGIN BTN*/}
                {!logged ?
                <>
                    <div onClick={() => {setDisplayLoginModel(true)}} className='wrap-login-btn' >
                        <div>Đăng nhập</div>
                    </div>
                    <Link href={"/rules/terms-and-rules"}>
                        <div style={{display: "flex", marginRight: '7px'}} className='wrap-login-btn' >
                            <div>Terms of Use</div>
                        </div>
                    </Link>
                </>
                : ""}
            

                {/*ITEM MOBILE*/}
                {showListItems ?
                <div className="wrap-item-mb" >
                    <Link href='/news/'><div>Posts</div></Link>
                    <Link href='/members/'><div>Reels</div></Link>
                    <div className='light-bulb' onClick={() => {changeMode()}}> 
                        <svg viewBox="0 0 512 512"><path d="m256,105.5c-83.9,0-152.2,68.3-152.2,152.2 0,83.9 68.3,152.2 152.2,152.2 83.9,0 152.2-68.3 152.2-152.2 0-84-68.3-152.2-152.2-152.2zm0,263.5c-61.4,0-111.4-50-111.4-111.4 0-61.4 50-111.4 111.4-111.4 61.4,0 111.4,50 111.4,111.4 0,61.4-50,111.4-111.4,111.4z"/><path d="m256,74.8c11.3,0 20.4-9.1 20.4-20.4v-23c0-11.3-9.1-20.4-20.4-20.4-11.3,0-20.4,9.1-20.4,20.4v23c2.84217e-14,11.3 9.1,20.4 20.4,20.4z"/><path d="m256,437.2c-11.3,0-20.4,9.1-20.4,20.4v22.9c0,11.3 9.1,20.4 20.4,20.4 11.3,0 20.4-9.1 20.4-20.4v-22.9c0-11.2-9.1-20.4-20.4-20.4z"/><path d="m480.6,235.6h-23c-11.3,0-20.4,9.1-20.4,20.4 0,11.3 9.1,20.4 20.4,20.4h23c11.3,0 20.4-9.1 20.4-20.4 0-11.3-9.1-20.4-20.4-20.4z"/><path d="m54.4,235.6h-23c-11.3,0-20.4,9.1-20.4,20.4 0,11.3 9.1,20.4 20.4,20.4h22.9c11.3,0 20.4-9.1 20.4-20.4 0.1-11.3-9.1-20.4-20.3-20.4z"/><path d="M400.4,82.8L384.1,99c-8,8-8,20.9,0,28.9s20.9,8,28.9,0l16.2-16.2c8-8,8-20.9,0-28.9S408.3,74.8,400.4,82.8z"/><path d="m99,384.1l-16.2,16.2c-8,8-8,20.9 0,28.9 8,8 20.9,8 28.9,0l16.2-16.2c8-8 8-20.9 0-28.9s-20.9-7.9-28.9,0z"/><path d="m413,384.1c-8-8-20.9-8-28.9,0-8,8-8,20.9 0,28.9l16.2,16.2c8,8 20.9,8 28.9,0 8-8 8-20.9 0-28.9l-16.2-16.2z"/><path d="m99,127.9c8,8 20.9,8 28.9,0 8-8 8-20.9 0-28.9l-16.2-16.2c-8-8-20.9-8-28.9,0-8,8-8,20.9 0,28.9l16.2,16.2z"/></svg>
                    </div>
                </div>
                : ""}


                {/*SEARCH BAR*/}
                {logged ?
                <div className="wrap-search"  style={{display: showSearchItem ? "block" : "none"}}   >
                    <div className="search-wall" onFocus={() => {focus_searchBorder_Fu()}} onBlur={() => {out_searchBorder_Fu()}} style={{border: searchBorder}}>
                        <div onClick={() => getSearch()} className="search-button" ><svg x="0px" y="0px" width="100%" height="100%" viewBox="-5 -5 135 135"  stroke="#000000" ><path d="M51,102.05c10.5,0,20.2-3.2,28.3-8.6l29.3,29.3c2.301,2.3,6.101,2.3,8.5,0l5.7-5.7c2.3-2.3,2.3-6.1,0-8.5L93.4,79.35 c5.399-8.1,8.6-17.8,8.6-28.3c0-28.1-22.9-51-51-51c-28.1,0-51,22.9-51,51C0,79.149,22.8,102.05,51,102.05z M51,20.05 c17.1,0,31,13.9,31,31c0,17.1-13.9,31-31,31c-17.1,0-31-13.9-31-31C20,33.95,33.9,20.05,51,20.05z"></path> </svg></div>      
                        <div className="search-bar">
                            <input onBlur={() => setIsFocus(false)} onFocus={() => setIsFocus(true)} id="search-bar" onKeyDown={(e) => {_handleKeyDown(e)}} type="text" placeholder="Tìm kiếm" spellCheck="false" enterKeyHint="done" autoComplete='off' maxLength={env_variable.MAX_DEFAULT_SEARCH_LENGTH}/>
                        </div> 
                    </div>
                </div>
                : ""}


            </div>

        </div>

    </div>
  )
}

export default Nav