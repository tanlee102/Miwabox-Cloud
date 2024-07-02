import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { checkHasClass } from '../../helper/checkHasClass';
import { hideMainScrollBar } from '../../helper/hideMainScrollBar';

const Modal = ({displayModel, setDisplayModel, title, body, footer, displayfooter}) => {

    const closeModal = function(event) {
        var x = event.target;
        if(!checkHasClass(x, 'modal-content')){
            setDisplayModel(false);
        }
    };

    useEffect(() => {
      hideMainScrollBar(displayModel);
    }, [displayModel]);

  return (
    <div id="myModal" class="modal" style={{display: displayModel ? "block" : "none"}} onClick={(event) => {closeModal(event)}}>
        <div class="modal-content">
          <div class="modal-header">
            <div>{title}</div>
            <span class="close-modal" onClick={() => setDisplayModel(false)}>&times;</span>
          </div>
          <div class="modal-body">
            {body}
          </div>
          {displayfooter ? <div class="modal-footer">{footer}</div> : ""}
        </div>
    </div>
  )
}

export default Modal
