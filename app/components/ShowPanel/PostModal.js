'use client'

import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { checkHasClass } from '../../helper/checkHasClass';
import { hideMainScrollBar } from '../../helper/hideMainScrollBar';

const PostModal = ({displayModel, setDisplayModel, title, body, footer, displayfooter}) => {

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
        <div class="modal-content modal-content-post">
          <div class="modal-header">
            <div>{title}</div>
            <span class="close-modal" onClick={() => setDisplayModel(false)}>&times;</span>
          </div>
          <div class="modal-body modal-body-post">
            {body}
          </div>
          {displayfooter ? <div class="modal-footer">{footer}</div> : ""}
        </div>
    </div>
  )
}

export default PostModal
