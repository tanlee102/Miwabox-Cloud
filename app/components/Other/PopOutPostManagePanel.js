import React, { useContext, useState } from 'react'
import { LayoutContext } from '@/app/context/LayoutContext';
import { useOutsideClick } from '@/app/helper/useOutsideClick';
import axios from 'axios';
import Cookies from 'js-cookie';

const PopOutPostManagePanel = ({postId, restricted, muted}) => {

    const {conFirmFun} = useContext(LayoutContext);

    const [Muted, setMuted] = useState(muted);
    const [Restricted, setRestricted] = useState(restricted);

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


    const restrictPost = () => {
      console.log(postId);
  
      conFirmFun("Management", "Do you want to restrict this post?", async () => {
        conFirmFun("Management");
        setTimeout(async () => {
          try {
            const token = Cookies.get('token');
            const response = await axios.post(`https://hoifancuongonepiece.site/api/v1/posts/toggle-restrict/${postId}`, {}, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });
  
            if (response.status === 200) {
              conFirmFun("Management", "The post has been successfully restricted.");
              targetRefExp.current.style.display = 'none';
              setRestricted(!Restricted);
            } else {
              conFirmFun("Management", "Failed to restrict post: " + response.data.message);
            }
          } catch (error) {
            conFirmFun("Management", "Failed to restrict post: " + error.message);
          }
        }, 400);
      });
  };
  
  const mutePost = () => {
      console.log(postId);
  
      conFirmFun("Management", "Do you want to mute this post?", async () => {
        conFirmFun("Management");
        setTimeout(async () => {
          try {
            const token = Cookies.get('token');
            const response = await axios.post(`https://hoifancuongonepiece.site/api/v1/posts/toggle-mute/${postId}`, {}, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });
  
            if (response.status === 200) {
              conFirmFun("Management", "The post has been successfully muted.");
              targetRefExp.current.style.display = 'none';
              setMuted(!Muted);
            } else {
              conFirmFun("Management", "Failed to mute post: " + response.data.message);
            }
          } catch (error) {
            conFirmFun("Management", "Failed to mute post: " + error.message);
          }
        }, 400);
      });
  };
  
  const deletePost = () => {
      console.log(postId)
  
      conFirmFun("Management", "Do you want to delete this post?", async () => {
          conFirmFun("Management");
          setTimeout(async () => {
              try {
                  const token = Cookies.get('token');
                  const response = await axios.delete(`https://hoifancuongonepiece.site/api/v1/posts/${postId}`, {
                      headers: {
                          'Authorization': `Bearer ${token}`,
                          'Content-Type': 'application/json'
                      }
                  });
  
                  if (response.status === 200) {
                      conFirmFun("Management", "The post has been successfully deleted.");
                      targetRefExp.current.style.display = 'none';
                  } else {
                      conFirmFun("Management", "Failed to delete post: " + error.message);
                  }
              } catch (error) {
                  conFirmFun("Management", "Failed to delete post: " + error.message);
              }
          }, 400);
      });
  }
  

  return (
    <span class="btn-icon-member-tab btn-member-tab un-btn-member-tab" onClick={() => handleClick()}>
    <svg version="1.1"  x="0px" y="0px" viewBox="0 0 472.576 472.576">
    <circle cx="65.142" cy="236.288" r="65.142"/>
    <circle cx="236.308" cy="236.288" r="65.142"/>
    <circle cx="407.434" cy="236.288" r="65.142"/>
    </svg>
        <div class="pop-out-member-panel pop-out-member-panel-right pop-out-member-panel-admin" ref={targetRefExp} style={{display: "none"}}>
            <div onClick={() => {}}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 30 30"><path stroke='none' d="M 15 3 C 11.783059 3 8.8641982 4.2807926 6.7070312 6.3496094 A 1.0001 1.0001 0 0 0 6.3476562 6.7070312 C 4.2793766 8.8641071 3 11.783531 3 15 C 3 21.615572 8.3844276 27 15 27 C 18.210007 27 21.123475 25.724995 23.279297 23.664062 A 1.0001 1.0001 0 0 0 23.662109 23.28125 C 25.724168 21.125235 27 18.210998 27 15 C 27 8.3844276 21.615572 3 15 3 z M 15 5 C 20.534692 5 25 9.4653079 25 15 C 25 17.40637 24.155173 19.609062 22.746094 21.332031 L 8.6679688 7.2539062 C 10.390938 5.8448274 12.59363 5 15 5 z M 7.2539062 8.6679688 L 21.332031 22.746094 C 19.609062 24.155173 17.40637 25 15 25 C 9.4653079 25 5 20.534692 5 15 C 5 12.59363 5.8448274 10.390938 7.2539062 8.6679688 z"></path></svg>                
                <p>Ban User</p>
            </div>

            <div onClick={() => {deletePost()}}>
                <svg  viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M352 480h320a32 32 0 1 1 0 64H352a32 32 0 0 1 0-64z"/><path fill="#000000" d="M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"/></svg>
                <p>Delete Post</p>
            </div>

            <div onClick={() => {mutePost()}}>

            <svg fill="#000000" viewBox="0 0 256 256"><path d="M208.552 206.834h-25v-92.492l-43.987 87.835c-1.081 2.238-2.592 3.935-4.532 5.09-1.94 1.155-4.024 1.733-6.25 1.733-2.163 0-4.183-.578-6.06-1.733-1.876-1.155-3.355-2.852-4.436-5.09l-44.179-87.835v92.492H49.3V63.548c0-3.25.843-6.137 2.528-8.665 1.686-2.527 3.896-4.223 6.632-5.09a11.647 11.647 0 0 1 4.007-.379 12.01 12.01 0 0 1 3.865.975c1.24.541 2.37 1.3 3.387 2.274 1.018.975 1.877 2.148 2.576 3.52l56.488 111.445L185.27 56.183c1.463-2.744 3.483-4.693 6.06-5.848 2.576-1.156 5.263-1.336 8.062-.542 2.672.867 4.867 2.563 6.584 5.09 1.718 2.528 2.576 5.416 2.576 8.665v143.286z" fill-rule="evenodd"/></svg>
                {Muted ? 
                <p>UnMute</p>
                : <p>Mute</p>
                }
            </div>
            
            <div onClick={() => {restrictPost()}}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 30 30"><path stroke='none' d="M 15 3 C 11.783059 3 8.8641982 4.2807926 6.7070312 6.3496094 A 1.0001 1.0001 0 0 0 6.3476562 6.7070312 C 4.2793766 8.8641071 3 11.783531 3 15 C 3 21.615572 8.3844276 27 15 27 C 18.210007 27 21.123475 25.724995 23.279297 23.664062 A 1.0001 1.0001 0 0 0 23.662109 23.28125 C 25.724168 21.125235 27 18.210998 27 15 C 27 8.3844276 21.615572 3 15 3 z M 15 5 C 20.534692 5 25 9.4653079 25 15 C 25 17.40637 24.155173 19.609062 22.746094 21.332031 L 8.6679688 7.2539062 C 10.390938 5.8448274 12.59363 5 15 5 z M 7.2539062 8.6679688 L 21.332031 22.746094 C 19.609062 24.155173 17.40637 25 15 25 C 9.4653079 25 5 20.534692 5 15 C 5 12.59363 5.8448274 10.390938 7.2539062 8.6679688 z"></path></svg>                
                {Restricted ? 
                <p>Unrestrict</p>
                : <p>Restrict</p>
                }
            </div>
        </div>
</span>
  )
}

export default PopOutPostManagePanel
