import React from 'react'

const AddPostButton = () => {
  return (
    <div className='group-button-modal non-select' style={{float: 'left'}}>
        <span> 
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 30 30"> <path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M21,16h-5v5 c0,0.553-0.448,1-1,1s-1-0.447-1-1v-5H9c-0.552,0-1-0.447-1-1s0.448-1,1-1h5V9c0-0.553,0.448-1,1-1s1,0.447,1,1v5h5 c0.552,0,1,0.447,1,1S21.552,16,21,16z"></path></svg>
            Create Post
        </span>
    </div>
  )
}

export default AddPostButton
