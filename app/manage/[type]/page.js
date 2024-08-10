'use client'

import MenuAccount from '@/app/components/MenuBar/MenuAccount';
import { WindowContext } from '@/app/context/WindowContext';
import React, { useContext, useState } from 'react'

import "../../styles/Account/Account.css"
import "../../styles/Account/AccountRes.css"
import "../../styles/Account/FormAccount.css"
import "../../styles/Manage/Posts.css"

import DropdownTrans from '@/app/components/DropDown/DropDownTrans';

import Posts from '@/app/components/Manage/Posts';
import Members from '@/app/components/Manage/Members';
import Roles from '@/app/components/Manage/Roles';

const page = ({params}) => {

    const currentTypePath = params.type;
    const {userData} = useContext(WindowContext);

    const [sortingIndex, setSortingIndex] = useState(0)
  
    const listMenuAccount = [
      {label:'Posts', url: '/manage/posts'},
      {label:'Members', url: '/manage/members'},
      {label:'Roles', url: '/manage/roles'},
    ]
    const components = {
        posts: <Posts sortingIndex={sortingIndex}></Posts>,
        members: <Members sortingIndex={sortingIndex}></Members>,
        roles: <Roles></Roles>,
    };
  
    const index = listMenuAccount.findIndex(menuItem => menuItem.url.includes(currentTypePath));
  
    const [loadState, setLoadState] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const [search, setSearch] = useState("");

    const _handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        setSearch(e.target.value)
      }
    }

  return (
    <div className="fr-account fr-content">
      <MenuAccount listMenuAccount={listMenuAccount} idItem={index}/>
      <div className="setting-manage" style={{overflowX: index == 0 ? "auto" : "visible", overflowY: "visible", paddingBottom: "000px"}}>

          { 1 == index ?
            <div class="wrap-search-manage-account">
                <div class="manage-search-bar">
                  <input type="text" class="searchTerm-manage-account" value={search} 
                  onChange={e => {
                    setSearch(e.target.value);
                  }}  placeholder="Nhập từ khóa bạn cần tìm?" onKeyDown={_handleKeyDown}/>
                  <button type="submit" class="searchButton-manage-account" onClick={() => {}}>
                  <svg x="0px" y="0px" width="100%" height="100%" viewBox="-5 -5 135 135" stroke="#000000"><path d="M51,102.05c10.5,0,20.2-3.2,28.3-8.6l29.3,29.3c2.301,2.3,6.101,2.3,8.5,0l5.7-5.7c2.3-2.3,2.3-6.1,0-8.5L93.4,79.35 c5.399-8.1,8.6-17.8,8.6-28.3c0-28.1-22.9-51-51-51c-28.1,0-51,22.9-51,51C0,79.149,22.8,102.05,51,102.05z M51,20.05 c17.1,0,31,13.9,31,31c0,17.1-13.9,31-31,31c-17.1,0-31-13.9-31-31C20,33.95,33.9,20.05,51,20.05z"></path> </svg>
                  </button>
                </div>
            </div>
          : ""}

          {1 == index ?
            <DropdownTrans options={['Chronology', 'Banned']} indexOption={sortingIndex} setIndexOption={setSortingIndex} />
          : ""}

          {0 == index ?
          <>
              <div style={{marginTop:'10px'}}></div>
              <DropdownTrans options={['Chronology', 'Restricted', 'Muted']} indexOption={sortingIndex} setIndexOption={setSortingIndex} />
          </>
          : ""}

          {components[currentTypePath] || null}

      </div>    
    </div>
  )
}

export default page
