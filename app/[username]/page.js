import React from 'react'
import ProfileHeader from '../components/Profile/ProfileHeader'
import ProfileMenu from '../components/Profile/ProfileMenu'

const page = () => {
  return (
    <div className='fr-profile fr-content'>
        <ProfileHeader></ProfileHeader>
        <ProfileMenu></ProfileMenu>
    </div>
  )
}

export default page
