import React from 'react'

const ProfileHeader = () => {
  return (
    <div className='profile-header'>
        <div className='profile-avatar-container'>
            <img src='https://m.media-amazon.com/images/S/pv-target-images/16627900db04b76fae3b64266ca161511422059cd24062fb5d900971003a0b70.jpg' />
        </div>

        <div className='profile-name-container'>
            <p>tanlee23.0</p>
            <span>Be yourself</span>
        </div>

        <div className='profile-follow-container'>
            <div className='item-follow'>
                <span>23</span>
                <span> Posts</span>
            </div>
            <div className='item-follow'>
                <span>23N</span>
                <span> Followers</span>
            </div>
            <div className='item-follow'>
                <span>23K</span>
                <span> Following</span>
            </div>
        </div>
        
    </div>
  )
}

export default ProfileHeader
