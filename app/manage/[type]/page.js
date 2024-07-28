'use client'

import MenuAccount from '@/app/components/MenuBar/MenuAccount';
import { WindowContext } from '@/app/context/WindowContext';
import React, { useContext, useState } from 'react'

import "../../styles/Account/Account.css"
import "../../styles/Account/AccountRes.css"
import "../../styles/Account/FormAccount.css"
import "../../styles/Manage/Posts.css"

import OptionPanelPart from '@/app/components/Other/OptionPanelPart';
import DropdownTrans from '@/app/components/DropDown/DropDownTrans';
import LoadMore from '@/app/components/Other/LoadMore';

import Posts from '@/app/components/Manage/Posts';
import Members from '@/app/components/Manage/Members';
import Roles from '@/app/components/Manage/Roles';

const page = ({params}) => {

    const currentTypePath = params.type;
    const {userData} = useContext(WindowContext);
  
    const listMenuAccount = [
      {label:'Posts', url: '/manage/posts'},
      {label:'Members', url: '/manage/members'},
      {label:'Roles', url: '/manage/roles'},
    ]
    const components = {
        posts: <Posts></Posts>,
        members: <Members></Members>,
        roles: <Roles></Roles>,
    };
  
    const index = listMenuAccount.findIndex(menuItem => menuItem.url.includes(currentTypePath));
  
    const [loadState, setLoadState] = useState(false);
    const [hasMore, setHasMore] = useState(true);

  return (
    <div className="fr-account fr-content">
    <MenuAccount listMenuAccount={listMenuAccount} idItem={index}/>
    <div className="setting-manage" style={{overflowX: index == 0 ? "auto" : "visible", overflowY: "visible", paddingBottom: "000px"}}>

        {/* <div style={{height: "500px"}}>
            <OptionPanelPart isAdmin={true}></OptionPanelPart>
            <DropdownTrans options={['Chronology', 'Top Posts']} indexOption={1} setIndexOption={null} />
            {hasMore && <LoadMore loadState={loadState} setLoadState={setLoadState} btnAct={null} />}
        </div> */}

        {components[currentTypePath] || null}
    </div>    

  </div>
  )
}

export default page
