import React, { useState, useEffect, useContext } from 'react'

import PopOut from '@/app/Fun/PopOut';
import { LayoutContext } from '@/app/context/LayoutContext';
import { WindowContext } from '@/app/context/WindowContext';

const PopOutMemberPanel = ({isAdmin=false,isBlock=false,isBan=false, idMember, dataProfile}) => {

    const {conFirmFun} = useContext(LayoutContext);
    const {userData} = useContext(WindowContext);

    const [Pop, setPop] = useState(null);

    useEffect(() => {
        if(dataProfile?.id){
            setPop(new PopOut(isBlock, isBan, conFirmFun, dataProfile?.id, userData));
            setBlock(dataProfile?.blocked);
        }
    }, [dataProfile])

    const copyLink = () => {
        conFirmFun('Copy Link');
        navigator.clipboard.writeText(window.location.href);
        setTimeout(() => {
            conFirmFun();
        }, 200);
    }

    const [Block, setBlock] = useState(Pop?.Block);
    const [Ban, setBan] = useState(Pop?.Ban);
    useEffect(() => {
        setBlock(Pop?.Block);
        setBan(Pop?.Ban);
    },[Pop?.Block, Pop?.Ban])

  return (
    <>
        { Block && Block != -1 ?
        <div onClick={() => {Pop.removeBlock()}}>
            <svg viewBox="-3.5 -4 32 32"><path d="M12 1c6.065 0 11 4.935 11 11s-4.935 11-11 11-11-4.935-11-11 4.935-11 11-11zm0-1c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12z"/></svg>
            <p>Unblock</p>
        </div>
        :
        <div onClick={() => {Pop.addBlock()}}>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 30 30"><path stroke='none' d="M 15 3 C 11.783059 3 8.8641982 4.2807926 6.7070312 6.3496094 A 1.0001 1.0001 0 0 0 6.3476562 6.7070312 C 4.2793766 8.8641071 3 11.783531 3 15 C 3 21.615572 8.3844276 27 15 27 C 18.210007 27 21.123475 25.724995 23.279297 23.664062 A 1.0001 1.0001 0 0 0 23.662109 23.28125 C 25.724168 21.125235 27 18.210998 27 15 C 27 8.3844276 21.615572 3 15 3 z M 15 5 C 20.534692 5 25 9.4653079 25 15 C 25 17.40637 24.155173 19.609062 22.746094 21.332031 L 8.6679688 7.2539062 C 10.390938 5.8448274 12.59363 5 15 5 z M 7.2539062 8.6679688 L 21.332031 22.746094 C 19.609062 24.155173 17.40637 25 15 25 C 9.4653079 25 5 20.534692 5 15 C 5 12.59363 5.8448274 10.390938 7.2539062 8.6679688 z"></path></svg>                
            <p>Block</p>
        </div>
        }

        {isAdmin ? 
        <>

        { Ban ?
        <div  onClick={() => {Pop.removeBan()}}>
            <svg viewBox="-3.5 -4 32 32"><path d="M12 1c6.065 0 11 4.935 11 11s-4.935 11-11 11-11-4.935-11-11 4.935-11 11-11zm0-1c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12z"/></svg>
            <p>Remove Ban</p>
        </div>
        :
        <div  onClick={() => {Pop.addBan()}}>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 30 30"><path stroke='none' d="M 15 3 C 11.783059 3 8.8641982 4.2807926 6.7070312 6.3496094 A 1.0001 1.0001 0 0 0 6.3476562 6.7070312 C 4.2793766 8.8641071 3 11.783531 3 15 C 3 21.615572 8.3844276 27 15 27 C 18.210007 27 21.123475 25.724995 23.279297 23.664062 A 1.0001 1.0001 0 0 0 23.662109 23.28125 C 25.724168 21.125235 27 18.210998 27 15 C 27 8.3844276 21.615572 3 15 3 z M 15 5 C 20.534692 5 25 9.4653079 25 15 C 25 17.40637 24.155173 19.609062 22.746094 21.332031 L 8.6679688 7.2539062 C 10.390938 5.8448274 12.59363 5 15 5 z M 7.2539062 8.6679688 L 21.332031 22.746094 C 19.609062 24.155173 17.40637 25 15 25 C 9.4653079 25 5 20.534692 5 15 C 5 12.59363 5.8448274 10.390938 7.2539062 8.6679688 z"></path></svg>                
            <p>Ban user</p>
        </div>
        }

        <div onClick={() => {Pop.removeActivity(2)}}>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="3 0 28 28">
            <path fill="none" stroke-width="1.5" stroke-miterlimit="5" d="M26.4,11.7l-6-6c-0.8-0.8-2.2-0.8-3.1,0L5.6,17.3 c-0.8,0.8-0.8,2.2,0,3.1l6,6c0.8,0.8,2.2,0.8,3.1,0l11.6-11.6C27.2,13.9,27.2,12.5,26.4,11.7z"/><line fill="none" stroke-width="2" stroke-miterlimit="10" x1="12" y1="12" x2="20" y2="20"/>
            </svg>                
            <p>Delete user activity</p>
        </div>


        <div onClick={() => {Pop.setAdminRole()}}>
            <svg viewBox="0 0 1920 1920">
                <path d="M276.941 440.584v565.722c0 422.4 374.174 625.468 674.71 788.668l8.02 4.292 8.131-4.292c300.537-163.2 674.71-366.268 674.71-788.668V440.584l-682.84-321.657L276.94 440.584Zm682.73 1479.529c-9.262 0-18.523-2.372-26.993-6.89l-34.9-18.974C588.095 1726.08 164 1495.906 164 1006.306V404.78c0-21.91 12.65-41.788 32.414-51.162L935.727 5.42c15.134-7.228 32.866-7.228 48 0l739.313 348.2c19.765 9.374 32.414 29.252 32.414 51.162v601.525c0 489.6-424.207 719.774-733.779 887.943l-34.899 18.975c-8.47 4.517-17.731 6.889-27.105 6.889Zm467.158-547.652h-313.412l-91.595-91.482v-83.803H905.041v-116.78h-83.69l-58.503-58.504c-1.92.113-3.84.113-5.76.113-176.075 0-319.285-143.21-319.285-319.285 0-176.075 143.21-319.398 319.285-319.398 176.075 0 319.285 143.323 319.285 319.398 0 1.92 0 3.84-.113 5.647l350.57 350.682v313.412Zm-266.654-112.941h153.713v-153.713L958.462 750.155l3.953-37.27c1.017-123.897-91.595-216.621-205.327-216.621S550.744 588.988 550.744 702.72c0 113.845 92.612 206.344 206.344 206.344l47.21-5.309 63.811 63.7h149.873v116.78h116.781v149.986l25.412 25.299Zm-313.4-553.57c0 46.758-37.949 84.706-84.706 84.706-46.758 0-84.706-37.948-84.706-84.706s37.948-84.706 84.706-84.706c46.757 0 84.706 37.948 84.706 84.706" fill-rule="evenodd"/>
            </svg>               
            <p>Appointed as Admin</p>
        </div>

        </>: ""}



        <div onClick={() => copyLink()}>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="-13 -13 240 240">
            <path d="M179.617,15.453c-0.051-0.05-0.102-0.1-0.154-0.149c-18.689-18.549-48.477-20.463-69.37-4.441
                c-2.091,1.599-3.776,3.053-5.302,4.575c-0.044,0.044-0.087,0.088-0.13,0.133L71.224,49.012c-2.929,2.929-2.929,7.678,0.001,10.606
                c2.93,2.93,7.679,2.929,10.606-0.001l33.561-33.566c0.035-0.035,0.069-0.07,0.104-0.105c1.023-1.01,2.205-2.02,3.715-3.174
                c15.008-11.508,36.411-10.098,49.789,3.281c0.044,0.044,0.089,0.088,0.134,0.131c14.652,14.786,14.611,38.742-0.124,53.483
                l-33.559,33.563c-2.929,2.929-2.929,7.678,0.001,10.606c1.465,1.464,3.384,2.196,5.303,2.196c1.919,0,3.839-0.732,5.304-2.197
                l33.56-33.563C200.241,69.641,200.241,36.077,179.617,15.453z"/>
            <path d="M113.23,135.437l-33.541,33.542c-0.066,0.067-0.132,0.136-0.196,0.205c-3.708,3.648-8.059,6.449-12.945,8.333
                c-13.995,5.418-29.888,2.07-40.481-8.524c-14.768-14.784-14.768-38.84,0-53.619L59.624,81.83c1.406-1.407,2.197-3.315,2.197-5.305
                v-0.013c0-4.143-3.357-7.494-7.5-7.494c-2.135,0-4.062,0.895-5.428,2.328l-33.435,33.422c-20.61,20.628-20.612,54.195-0.002,74.828
                c10.095,10.097,23.628,15.479,37.411,15.479c6.414-0.001,12.884-1.167,19.084-3.566c6.922-2.667,13.088-6.67,18.326-11.896
                c0.076-0.075,0.15-0.153,0.223-0.232l33.337-33.337c2.929-2.93,2.929-7.678-0.001-10.607
                C120.909,132.509,116.16,132.509,113.23,135.437z"/>
            <path d="M59.15,135.908c1.465,1.465,3.384,2.197,5.304,2.197c1.919,0,3.839-0.732,5.303-2.196l66.164-66.161
                c2.93-2.929,2.93-7.678,0.001-10.606c-2.929-2.93-7.678-2.929-10.606-0.001l-66.164,66.161
                C56.221,128.23,56.221,132.979,59.15,135.908z"/>
            </svg>                
            <p>Copy link</p>
        </div>

        {isAdmin ? 
        ""
        :
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="-60 -60 620 620">

                <path d="M442.133,57.6c-26.667-14.933-54.4-21.333-86.4-21.333c-37.333,0-74.667,9.6-109.867,19.2
                    c-34.133,9.6-67.2,18.133-99.2,18.133c-20.267,0-38.4-4.267-55.467-10.667v-41.6C91.2,9.6,81.6,0,69.867,0
                    S48.533,9.6,48.533,21.333V480c0,11.733,9.6,21.333,21.333,21.333s21.333-9.6,21.333-20.267v-147.2
                    c18.133,5.333,36.267,8.533,55.467,8.533c38.4,0,74.667-9.6,109.867-18.133c34.133-9.6,67.2-18.133,99.2-18.133
                    c24.533,0,45.867,5.333,66.133,16c6.4,3.2,14.933,3.2,21.333,0c5.333-4.267,9.6-10.667,9.6-18.133V75.733
                    C452.8,68.267,448.533,60.8,442.133,57.6z M411.2,272c-17.067-6.4-36.267-8.533-55.467-8.533c-37.333,0-74.667,9.6-109.867,19.2
                    c-34.133,9.6-67.2,18.133-99.2,18.133c-20.267,0-38.4-3.2-55.467-10.667v-182.4c17.067,6.4,36.267,8.533,55.467,8.533
                    c37.333,0,74.667-9.6,109.867-19.2c34.133-9.6,67.2-18.133,99.2-18.133c20.267,0,38.4,3.2,55.467,10.667V272z"/>
                </svg>                
            <p>Report</p>
        </div>
        }
      
    </>
  )
}

export default PopOutMemberPanel
