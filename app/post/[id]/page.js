'use client'
import React from 'react'

import '../../styles/Post/FullPost.css'
import '../../styles/Post/FullPostRes.css'
import Link from 'next/link';
import { converTime } from '@/app/helper/converTime';

const page = () => {


    const loadSending = false;

    const sampleData = {
      ite: {
          user_name: "john_doe",
          thumbnail: "https://vcdn1-giaitri.vnecdn.net/2022/12/15/avatar-2-1-jpeg-2238-1671050566.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=xPmtakLGIw47TFSMDaI2fw",
          name: "John Doe",
          time: "2024-03-10T10:00:00Z",
          text: "This is a sample comment.",
          Member_ID: 1,
          ID: 123,
          isMore: true,
          replydata: [
              {
                  user_name: "jane_doe",
                  thumbnail: "https://vcdn1-giaitri.vnecdn.net/2022/12/15/avatar-2-1-jpeg-2238-1671050566.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=xPmtakLGIw47TFSMDaI2fw",
                  name: "Jane Doe",
                  time: "2024-03-10T10:05:00Z",
                  text: "This is a reply.",
                  Member_ID: 2,
                  ID_: 456
              }
          ],
          curLoadID: 789
      },
      userData: {
          id: 1,
          admin: 0,
          avatar: "https://vcdn1-giaitri.vnecdn.net/2022/12/15/avatar-2-1-jpeg-2238-1671050566.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=xPmtakLGIw47TFSMDaI2fw"
      },
      isYourProfile: true,
      curID: 123,
      allowed: true
    };


  return (
    <div className='fr-full-post fr-content'>
      <div className='full-post'>

            <div className='post-content'>

                <div className='post-info'>
                <div className='post-user-info'>
                    <span className='post-avatar-user'>
                    <img src='https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_863/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/v6bwf3e8qhdfhrgq7lv3/V%C3%A9C%C3%B4ngVi%C3%AAnGi%E1%BA%A3iTr%C3%ADIMGWorldsofAdventure%E1%BB%9FDubai.jpg' />
                    </span>
                    <span className='contain-post-name-user'>
                    <div className='post-name-user'>Le Quoc Tan</div>
                    <div className='post-tm-user'>
                        <span>1,634 views</span><span className='delimiter'>•</span><span>3h</span>
                    </div>
                    </span>
                </div>
                </div>

                <div className='post-title'>
                Hello, this is Luffy basatard.
                </div>

                <div className='post-list-tags'>
                    <span>#posts</span>
                    <span>#Eating</span>
                    <span>#Healty</span>
                </div>


                <div className='post-main-content'>
                <div className='post-content-media'>
                    <img src='https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_863/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/v6bwf3e8qhdfhrgq7lv3/V%C3%A9C%C3%B4ngVi%C3%AAnGi%E1%BA%A3iTr%C3%ADIMGWorldsofAdventure%E1%BB%9FDubai.jpg' />
                </div>
                <div className='post-content-media-description'>
                    words that describe something or someone. [count] Reporters called the scene “a disaster area,” and I think that was an accurate description. I applied for the position after reading the job description.
                </div>
                <div className='post-content-media'>
                    <img src='https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_863/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/v6bwf3e8qhdfhrgq7lv3/V%C3%A9C%C3%B4ngVi%C3%AAnGi%E1%BA%A3iTr%C3%ADIMGWorldsofAdventure%E1%BB%9FDubai.jpg' />
                </div>
                <div className='post-content-media-description'>
                    words that describe something or someone. [count] Reporters called the scene “a disaster area,” and I think that was an accurate description. I applied for the position after reading the job description.
                </div>
                
                <div className='post-content-like'>
                    <span>
                    <svg aria-label="Thích" class="x1lliihq x1n2onr6 xyb1xck" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Thích</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
                    <span>123</span>
                    </span>
                    <span>
                    <svg aria-label="Bình luận" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Bình luận</title><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>
                    <span>12</span>
                    </span>
                    <span>
                    <svg aria-label="Lưu" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Lưu</title><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg>
                    </span>
                </div>

                </div>


                <div className='full-post-input-comment post-input-comment'>
                <div className="contain-input-thread">
                    <div className="input-thread">
                    <div className="contain-input-thr">
                        <div onPaste={(e) => onPaste(e)} onKeyDown={null} contentEditable='true' className="input-thr"  placeholder="Aa"></div>
                        <div className="btn-input-thread">
                            {loadSending ? <div className="loader-roundo"></div> : ""}
                            {loadSending ? "" : <svg onClick={() => {}} fill="#000000" viewBox="0 0 24 24" id="send" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg"><path id="primary" d="M21.66,12a2,2,0,0,1-1.14,1.81L5.87,20.75A2.08,2.08,0,0,1,5,21a2,2,0,0,1-1.82-2.82L5.46,13l.45-1-.45-1L3.18,5.87A2,2,0,0,1,5.87,3.25l14.65,6.94A2,2,0,0,1,21.66,12Z"></path><path id="secondary" d="M12,12a1,1,0,0,1-1,1H5.46l.45-1-.45-1H11A1,1,0,0,1,12,12Z"></path></svg>
                            }
                        </div>
                    </div>
                    </div>
                </div>
            </div>


                <div className='post-comments'>

                {sampleData.ite ? 
                    <div class="item-comment">
                        <Link href={"/u/" + sampleData.ite.user_name + "/"}>
                            <span class="fr-image-item-comment">
                                <img src={(sampleData.ite.thumbnail ? sampleData.ite.thumbnail : sampleData.userData.avatar)} alt=""/>
                            </span>
                        </Link>
                        <span class="fr-text-item-comment">
                            <div class="list-in-line">
                                <ul>
                                    <Link href={"/u/" + sampleData.ite.user_name + "/"}>
                                        <li className='set-bold'> {sampleData.ite.name} </li>
                                    </Link>
                                    <li className='set-slight'> {converTime(sampleData.ite.time)} </li>
                                </ul>
                            </div>
                            <div class="fr-ms-item-comment">
                                <span>{sampleData.ite.text}</span>
                                <span>
                                    <span>
                                        <p>Báo cáo</p>
                                    </span>
                                    {Number(sampleData.userData.id) === Number(sampleData.ite.Member_ID) || sampleData.userData.admin > 0 || sampleData.isYourProfile ? 
                                    <span onClick={null} className='delete-btn-ms-item-comment'>
                                        <svg viewBox="0 -1.5 19 19">
                                            <path d="M14,3 C14.5522847,3 15,3.44771525 15,4 C15,4.55228475 14.5522847,5 14,5 L13.846,5 L13.1420511,14.1534404 C13.0618518,15.1954311 12.1930072,16 11.1479,16 L4.85206,16 C3.80698826,16 2.93809469,15.1953857 2.8579545,14.1533833 L2.154,5 L2,5 C1.44771525,5 1,4.55228475 1,4 C1,3.44771525 1.44771525,3 2,3 L5,3 L5,2 C5,0.945642739 5.81588212,0.0818352903 6.85073825,0.00548576453 L7,0 L9,0 C10.0543573,0 10.9181647,0.815882118 10.9945142,1.85073825 L11,2 L11,3 L14,3 Z M11.84,5 L4.159,5 L4.85206449,14.0000111 L11.1479,14.0000111 L11.84,5 Z M9,2 L7,2 L7,3 L9,3 L9,2 Z"/>
                                        </svg>
                                        <p>Xóa</p>
                                    </span>
                                    : ""}
                                    <span onClick={null}>
                                        <svg viewBox="1 1 22 22" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21.71,4.72,19.28,2.29a1,1,0,0,0-1.41,0L12.29,7.87a1,1,0,0,0-.29.71V11a1,1,0,0,0,1,1h2.42a1,1,0,0,0,.71-.29l5.58-5.58A1,1,0,0,0,21.71,4.72ZM15,10H14V9l4.58-4.58,1,1Zm4,2h0a1,1,0,0,0-1,1,7,7,0,0,1-7,7H5.41l.64-.63a1,1,0,0,0,0-1.42A7,7,0,0,1,11,6a1,1,0,0,0,0-2h0A9,9,0,0,0,4,18.62L2.29,20.29a1,1,0,0,0-.21,1.09A1,1,0,0,0,3,22h8a9,9,0,0,0,9-9A1,1,0,0,0,19,12Z"/>
                                        </svg>                            
                                        <p>Trả lời</p>
                                    </span>
                                </span>
                                {sampleData.ite.isMore === true ?
                                <span className='btn-more-reply-comment' onClick={null}>
                                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21" enable-background="new 0 0 512 512">
                                        <path d="M9 16h7.2l-2.6 2.6L15 20l5-5-5-5-1.4 1.4 2.6 2.6H9c-2.2 0-4-1.8-4-4s1.8-4 4-4h2V4H9c-3.3 0-6 2.7-6 6s2.7 6 6 6z"/>
                                    </svg> 
                                    <span>xem thêm trả lời</span>
                                </span>
                                : ""}
                                <span>
                                    {sampleData.ite.replydata.length > 0 ?
                                    sampleData.ite.replydata.map((item, index_) => (  
                                    <>
                                    <div class="item-comment item-reply-comment">
                                        <Link href={"/u/" + item.user_name + "/"}>
                                            <span class="fr-image-item-comment">
                                                <img src={(item.thumbnail ? item.thumbnail : sampleData.userData.avatar)} alt=""/>
                                            </span>
                                        </Link>
                                        <span class="fr-text-item-comment">
                                            <div class="list-in-line">
                                                <ul>
                                                    <Link href={"/u/" + item.user_name + "/"}>
                                                        <li class="set-bold">{item.name} </li>
                                                    </Link>
                                                    <li class="set-slight">{converTime(item.time)}</li>
                                                </ul>
                                            </div>
                                            <div class="fr-ms-item-comment">
                                                <span>{item.text}</span>
                                                <span> 
                                                    <span>
                                                        <p>Báo cáo</p>
                                                    </span>
                                                    {Number(sampleData.userData.id) === Number(item.Member_ID) || sampleData.userData.admin > 0 || sampleData.isYourProfile ? 
                                                    <span className='delete-btn-ms-item-comment' onClick={null}>
                                                        <svg viewBox="0 -1.5 19 19">
                                                            <path d="M14,3 C14.5522847,3 15,3.44771525 15,4 C15,4.55228475 14.5522847,5 14,5 L13.846,5 L13.1420511,14.1534404 C13.0618518,15.1954311 12.1930072,16 11.1479,16 L4.85206,16 C3.80698826,16 2.93809469,15.1953857 2.8579545,14.1533833 L2.154,5 L2,5 C1.44771525,5 1,4.55228475 1,4 C1,3.44771525 1.44771525,3 2,3 L5,3 L5,2 C5,0.945642739 5.81588212,0.0818352903 6.85073825,0.00548576453 L7,0 L9,0 C10.0543573,0 10.9181647,0.815882118 10.9945142,1.85073825 L11,2 L11,3 L14,3 Z M11.84,5 L4.159,5 L4.85206449,14.0000111 L11.1479,14.0000111 L11.84,5 Z M9,2 L7,2 L7,3 L9,3 L9,2 Z"/>
                                                        </svg>
                                                        <p>Xóa</p>
                                                    </span>
                                                    : ""}  
                                                    <span onClick={null}>
                                                        <svg viewBox="1 1 22 22" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M21.71,4.72,19.28,2.29a1,1,0,0,0-1.41,0L12.29,7.87a1,1,0,0,0-.29.71V11a1,1,0,0,0,1,1h2.42a1,1,0,0,0,.71-.29l5.58-5.58A1,1,0,0,0,21.71,4.72ZM15,10H14V9l4.58-4.58,1,1Zm4,2h0a1,1,0,0,0-1,1,7,7,0,0,1-7,7H5.41l.64-.63a1,1,0,0,0,0-1.42A7,7,0,0,1,11,6a1,1,0,0,0,0-2h0A9,9,0,0,0,4,18.62L2.29,20.29a1,1,0,0,0-.21,1.09A1,1,0,0,0,3,22h8a9,9,0,0,0,9-9A1,1,0,0,0,19,12Z"/>
                                                        </svg>                            
                                                        <p>Trả lời</p>
                                                    </span>
                                                </span>
                                            </div>
                                        </span>
                                    </div>
                                    </>
                                    )):""}
                                    {sampleData.allowed ? 
                                    <div class="item-input-comment item-input-reply-comment" style= {{display: sampleData.curID === sampleData.ite.ID ? 'flex' : 'none'}}>
                                        <span class="fr-image-item-comment"></span>
                                        <span>
                                            <textarea onKeyDown={null} id={sampleData.curID === sampleData.ite.ID ? 're-comment-input' : ''} placeholder="Viết bình luận..." rows="1"></textarea>
                                            <button onClick={null}>Viết</button>
                                        </span>
                                    </div>
                                    :""}
                                </span>
                            </div>
                        </span>
                    </div>
                : ""}
                </div>

            </div>

      </div>
      <div className='fr-suggestion-posts'>

        <div className='item-suggestion-post'>
            <div className='image-suggestion-post'>
                <img src='https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_863/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/v6bwf3e8qhdfhrgq7lv3/V%C3%A9C%C3%B4ngVi%C3%AAnGi%E1%BA%A3iTr%C3%ADIMGWorldsofAdventure%E1%BB%9FDubai.jpg' />
            </div>
            <div className='text-suggestion-post'>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </div>
        </div>

        <div className='item-suggestion-post'>
            <div className='image-suggestion-post'>
                <img src='https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_863/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/v6bwf3e8qhdfhrgq7lv3/V%C3%A9C%C3%B4ngVi%C3%AAnGi%E1%BA%A3iTr%C3%ADIMGWorldsofAdventure%E1%BB%9FDubai.jpg' />
            </div>
            <div className='text-suggestion-post'>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </div>
        </div>

        <div className='item-suggestion-post'>
            <div className='image-suggestion-post'>
                <img src='https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_863/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/v6bwf3e8qhdfhrgq7lv3/V%C3%A9C%C3%B4ngVi%C3%AAnGi%E1%BA%A3iTr%C3%ADIMGWorldsofAdventure%E1%BB%9FDubai.jpg' />
            </div>
            <div className='text-suggestion-post'>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </div>
        </div>

        <div className='item-suggestion-post'>
            <div className='image-suggestion-post'>
                <img src='https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_863/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/v6bwf3e8qhdfhrgq7lv3/V%C3%A9C%C3%B4ngVi%C3%AAnGi%E1%BA%A3iTr%C3%ADIMGWorldsofAdventure%E1%BB%9FDubai.jpg' />
            </div>
            <div className='text-suggestion-post'>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </div>
        </div>

        <div className='item-suggestion-post'>
            <div className='image-suggestion-post'>
                <img src='https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_863/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/v6bwf3e8qhdfhrgq7lv3/V%C3%A9C%C3%B4ngVi%C3%AAnGi%E1%BA%A3iTr%C3%ADIMGWorldsofAdventure%E1%BB%9FDubai.jpg' />
            </div>
            <div className='text-suggestion-post'>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </div>
        </div>

      </div>
    </div>
  )
}

export default page
