import { WindowContext } from '@/app/context/WindowContext';
import { converTime } from '@/app/helper/converTime';
import React, { useContext } from 'react'

const LoggedAccount = ({}) => {

    let url_apple = "https://i.ibb.co/r4BKSgh/apple-icon-1.jpg";
    let url_android = "https://i.ibb.co/5Y0rQQ5/android-1.jpg";
    let url_another = "https://i.ibb.co/nLm1Syx/cq5dam-web-1280-1280.jpg"

    function checkDevice(name){
        if(name.includes("Apple") || name.includes("Mac"))
        return url_apple
        else if(name.includes("Android"))
        return url_android
        else return url_another
    }

    const data = [
        {
            device: 'Apple iPhone',
            time: '2023-06-15T10:00:00Z'
        },
        {
            device: 'Android Phone',
            time: '2023-06-16T12:30:00Z'
        },
        {
            device: 'MacBook Pro',
            time: '2023-06-17T14:45:00Z'
        },
        {
            device: 'Windows Laptop',
            time: '2023-06-18T16:20:00Z'
        }
    ];


  return (
    <div  class="member-hub member-hub">
      
      {data.map((ite, index) => (

        <div key={index} class="item-tab member-tab set-border-box-1 set-margin-top-1px">

            <div class="content-member-tab">
                <div class="ava-item-tab">
                    <img src={checkDevice(ite.device)}  alt=""/>
                </div>
                <div class="content-item-tab">
                    <div class="title-item-tab set-bold set-black-white"> {ite.device}</div>

                    <div class="extra-item-tab set-black-white">
                        {converTime(ite.time)}
                    </div>
                </div>

                
            </div>

            { index != 0 ?
            <span  onClick={() => {}}  class="btn-member-tab un-btn-member-tab">
                <p>Đăng xuất</p>
            </span> : ""
            }

        </div>
    ))}

    </div>
  )
}

export default LoggedAccount