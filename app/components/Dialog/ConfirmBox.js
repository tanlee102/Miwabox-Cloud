import React from 'react'
import { useEffect } from 'react';
import { hideMainScrollBar } from '@/app/helper/hideMainScrollBar';

const ConfirmBox = ({isDisplay,setIsDisplay,objAction}) => {

  useEffect(() => {
    hideMainScrollBar(isDisplay);
  }, [isDisplay]);

  return (
    <div  class={isDisplay ? "dialog-confirm active-confirm" : "dialog-confirm"}>
        {objAction ? 
        <div>
            <div>
            <header>
              <h3> {objAction.titleBox} </h3>
              <i class="fa fa-close" aria-hidden="true" onClick={() => setIsDisplay(false)}></i>
            </header>

            <div class="dialog-msg"> 
              {objAction.contentBox ? <p dangerouslySetInnerHTML={{ __html: String(objAction.contentBox)}}></p> : ""} 
              {objAction.contentBox ? "" : 
              <div class="snippet" data-title=".dot-flashing">
                <div class="stage">
                  <div class="dot-flashing"></div>
                </div>
              </div>
              }

            </div>
            
            {objAction.contentBox ? 
            <footer>
                <div class="controls"> 
                    <button class="button button-danger doAction" onClick={() => {objAction.actionFu ? objAction.actionFu() : setIsDisplay(false)}}>Vâng</button>  
                    {objAction.actionFu ? <button class="button button-default cancelAction" onClick={() => setIsDisplay(false)}>Hủy</button>  : ""}
                </div>
            </footer>
            : ""}
            </div>
        </div>
        : ""}
    </div>
  )
}

export default ConfirmBox
