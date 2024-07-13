'use client'

import React from 'react'
import MenuAccount from '../../components/MenuBar/MenuAccount'

import "../../styles/Account/Account.css"
import "../../styles/Account/AccountRes.css"
import "../../styles/Account/FormAccount.css"

import DetailAccount from '../../components/Account/DetailAccount'
import SecureAccount from '../../components/Account/SecureAccount'
import LoggedAccount from '../../components/Account/LoggedAccount'
import NotificationAccount from '../../components/Account/NotificationAccount'


const page = ({ params }) => {

  const currentTypePath = params.type

  const listMenuAccount = [
    {label:'Account', url: '/xemtua23'},
    {label:'Account Detail', url: '/account/details'},
    {label:'Password & Email', url: '/account/security'},
    // {label:'Login History', url: '/account/logged'},
    {label:'Notification', url: '/account/notification'},
  ]
  const components = {
    details: <DetailAccount />,
    security: <SecureAccount />,
    logged: <LoggedAccount />,
    notification: <NotificationAccount />
  };

  const index = listMenuAccount.findIndex(menuItem => menuItem.url.includes(currentTypePath));

  return (

      <div className="fr-account fr-content">
        <MenuAccount listMenuAccount={listMenuAccount} idItem={index}/>
        <div className="setting-account">
            {components[currentTypePath] || null}
        </div>    

      </div>

  )
}

export default page
