import Link from 'next/link'
import React, { useContext } from 'react'

import { converTime } from '@/app/helper/converTime'

const NotificationAccount = ({}) => {

    const data = [
        {
            user_name: 'john_doe',
            thumbnail: 'https://example.com/images/john_doe.jpg',
            name: 'Post',
            name_actor: 'John Doe',
            total_actor: 2,
            first_state: 'commented on your post',
            last_state: '',
            post_entityid: '12345',
            Thread_Title: 'New Thread on Technology',
            update_time: '2023-06-15T10:00:00Z'
        },
        {
            user_name: 'jane_doe',
            thumbnail: 'https://example.com/images/jane_doe.jpg',
            name: 'SubForum',
            name_actor: 'Jane Doe',
            total_actor: 1,
            first_state: 'replied to your thread in',
            last_state: '',
            post_entityid: '67890',
            EntityID: '54321',
            SubForum_Title: 'Programming Discussions',
            update_time: '2023-06-16T12:30:00Z'
        },
        {
            user_name: 'alex_smith',
            thumbnail: 'https://example.com/images/alex_smith.jpg',
            name: 'Follower',
            name_actor: 'Alex Smith',
            total_actor: 1,
            first_state: 'started following you',
            last_state: '',
            update_time: '2023-06-17T14:45:00Z'
        },
        {
            user_name: 'michael_johnson',
            thumbnail: 'https://example.com/images/michael_johnson.jpg',
            name: 'msgs',
            name_actor: 'Michael Johnson',
            total_actor: 3,
            first_state: 'mentioned you in a message',
            last_state: '',
            update_time: '2023-06-18T16:20:00Z'
        }
    ];

  
  return (
    <div class="member-hub notification-hub form-account">

    {
        data.map((ite, index) => (

        <div key={index} class="item-tab notification-tab">

            <Link href={"/u/"+ite.user_name}>
            <div class="ava-notification-tab">
                <span>
                    <img src={""} alt=""/>
                </span>
            </div>
            </Link>
    

            <div class="content-notification-tab">

                {(ite.name === 'Post' || ite.name === 'Thread')?
                <Link href={"/threads/data/go?post_id="+ite.post_entityid}>
                <div>
                    <div class="text-notification-tab">
                        <a>{ite.name_actor}</a>
                        <span>{ite.total_actor > 1 ? " và " : ""} </span>
                        <a>{ite.total_actor > 1 ? ((Number(ite.total_actor) - 1) + " người khác ") : ""} </a>
                        <span>{ite.first_state} </span>
                        <a>{ite.Thread_Title} </a>
                        <span>{ite.last_state} </span>
                    </div>
                    <div class="time-notification-tab">
                        {converTime(ite.update_time)}
                    </div>
                </div>
                </Link>
                :""
                }


                {(ite.name === 'SubForum')?
                <Link href={ite.post_entityid ? "/threads/data/go?post_id="+ite.post_entityid : "/forums/"+ite.EntityID}>
                <div>
                    <div class="text-notification-tab">
                        <a>{ite.name_actor}</a>
                        <span>{ite.total_actor > 1 ? " và " : ""} </span>
                        <a>{ite.total_actor > 1 ? ((Number(ite.total_actor) - 1) + " người khác ") : ""} </a>
                        <span>{ite.first_state} </span>
                        <a>{ite.SubForum_Title} </a>
                        <span>{ite.last_state} </span>
                    </div>
                    <div class="time-notification-tab">
                        {converTime(ite.update_time)}
                    </div>
                </div>
                </Link>
                :""
                }


                {(ite.name === 'Follower') ?
                <Link href={"/u/"+ite.user_name}>
                <div>
                    <div class="text-notification-tab">
                        <a>{ite.name_actor}</a>
                        <span>{ite.total_actor > 1 ? " và " : ""} </span>
                        <a>{ite.total_actor > 1 ? ((Number(ite.total_actor) - 1) + " người khác ") : ""} </a>
                        <span>{ite.first_state} </span>
                    </div>
                    <div class="time-notification-tab">
                        {converTime(ite.update_time)}
                    </div>
                </div>
                </Link>
                :""
                }


                {(ite.name === 'msgs') ?
                <Link href={"/u/"}>
                <div>
                    <div class="text-notification-tab">
                        <a>{ite.name_actor}</a>
                        <span>{ite.total_actor > 1 ? " và " : ""} </span>
                        <a>{ite.total_actor > 1 ? ((Number(ite.total_actor) - 1) + " người khác ") : ""} </a>
                        <span>{ite.first_state} </span>
                    </div>
                    <div class="time-notification-tab">
                        {converTime(ite.update_time)}
                    </div>
                </div>
                </Link>
                :""
                }

            </div>

        </div>
        
        ))
    }


  </div>
  )
}

export default NotificationAccount
