import React from 'react'
import OptionPanelPart from '../Other/OptionPanelPart'
import Link from 'next/link'

const Roles = () => {
  return (
    <div className="member-hub">


        <div className="item-tab member-tab">
          <div className="content-member-tab">
            <div className="ava-item-tab">
              <img src={"https://play-lh.googleusercontent.com/hYdIazwJBlPhmN74Yz3m_jU9nA6t02U7ZARfKunt6dauUAB6O3nLHp0v5ypisNt9OJk"} alt="" />
            </div>

            <div class="content-item-tab">
                <div class="title-item-tab set-bold set-black-white">Hella</div>
                <div class="list-in-line set-anchor-gray-color">
                    <ul>
                        <li>Supreme Admin </li>
                    </ul>
                </div>
            </div>

          </div>
          <OptionPanelPart isAdmin={true}></OptionPanelPart>
        </div>



        <div className="item-tab member-tab">
          <div className="content-member-tab">
            <div className="ava-item-tab">
              <img src={"https://play-lh.googleusercontent.com/hYdIazwJBlPhmN74Yz3m_jU9nA6t02U7ZARfKunt6dauUAB6O3nLHp0v5ypisNt9OJk"} alt="" />
            </div>

            <div class="content-item-tab">
                <div class="title-item-tab set-bold set-black-white">Hella</div>
                <div class="list-in-line set-anchor-gray-color">
                    <ul>
                        <li> Admin </li>
                    </ul>
                </div>
            </div>

          </div>
          <OptionPanelPart isAdmin={true}></OptionPanelPart>
        </div>


        <div className="item-tab member-tab">
          <div className="content-member-tab">
            <div className="ava-item-tab">
              <img src={"https://play-lh.googleusercontent.com/hYdIazwJBlPhmN74Yz3m_jU9nA6t02U7ZARfKunt6dauUAB6O3nLHp0v5ypisNt9OJk"} alt="" />
            </div>

            <div class="content-item-tab">
                <div class="title-item-tab set-bold set-black-white">Hella</div>
                <div class="list-in-line set-anchor-gray-color">
                    <ul>
                        <li> Admin </li>
                    </ul>
                </div>
            </div>

          </div>
          <OptionPanelPart isAdmin={true}></OptionPanelPart>
        </div>

  </div>
  )
}

export default Roles
