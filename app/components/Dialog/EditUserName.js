import React from 'react'
import { useState, useEffect } from 'react';

import { env_variable } from '../../env';
import { hideMainScrollBar } from '@/app/helper/hideMainScrollBar';


const EditUserName = ({isDisplay,setIsDisplay}) => {

    const [textIn, setTextIn] = useState('');

    useEffect(() => {
        setTextIn("xemtua213");
    }, [])

    const [checkSame, setCheckSame] = useState(false);

    const handleChange = event => {
        const result = event.target.value.replace(/[^a-z0-9]/gi, '').replace(/\s/g,'').toLowerCase();
        setTextIn(result);
    };
    

    const checkUserNameBtn = () =>{

    }    
    const updateUserNameBtn = () => {

    }


  useEffect(() => {
    hideMainScrollBar(isDisplay);
  }, [isDisplay]);

  return (
    <div  class={isDisplay ? "dialog-confirm active-confirm" : "dialog-confirm"}>
  
        <div>
            <div>
                <header> 
                    <h3> Chỉnh sửa tên tài khoảng </h3> 
                    <i class="fa fa-close" aria-hidden="true" onClick={() => setIsDisplay(false)}></i>
                </header>

                <div class="dialog-msg dialog-user-name"> 

                    <input value={textIn} onChange={handleChange} placeholder='Nhập tên tài khoảng' id='input-dialog-user-name' type="text" maxLength={env_variable.MAX_NAME_USER_LENGTH}
                    onBlur={(e) => checkUserNameBtn()}/>
                    {checkSame ? <span>Tên này đã được sử dụng.</span> : "" }

                </div>
                

                <footer>
                    <div class="controls"> 
                        <button class="button button-danger doAction" onClick={() => {updateUserNameBtn()}}>Vâng</button>  
                         <button class="button button-default cancelAction" onClick={() => setIsDisplay(false)}>Hủy</button> 
                    </div>
                </footer>

            </div>
        </div>

    </div>
  )
}

export default EditUserName
