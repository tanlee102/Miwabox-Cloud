'use client'

import React from 'react'
import CreateLoginModal from '../../components/Login/CreateLoginModal'


const page = () => {
  return (
    <main className="content">
    <div className='contain-login-layout'>
      <CreateLoginModal></CreateLoginModal>
    </div>
    </main>
  )
}

export default page
