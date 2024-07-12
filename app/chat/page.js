'use client';

import React, { useEffect, useState } from 'react'

import '../styles/Chat/chat.css'
import '../styles/Chat/chatRes.css'


const ChatMessage = ({ type, message, timestamp }) => (
    <div className={`message ${type}`}>
      <p>{message}</p>
      {timestamp && <span className="timestamp">{timestamp}</span>}
    </div>
  );
  
const page = () => {

  const loadSending = false;

    const [messages, setMessages] = useState([
        { type: 'incoming', message: 'Hello!', timestamp: '10:00 AM' },
        { type: 'outgoing', message: 'Hi there!', timestamp: '10:01 AM' },
        { type: 'incoming', message: 'How are you?' },
        { type: 'outgoing', message: "I'm good, thanks! And you?", timestamp: '10:11 AM' },
      ]);
    
      useEffect(() => {
        const processedMessages = [];
        let lastTimestamp = null;
    
        messages.forEach(msg => {
          const timestamp = msg.timestamp ? new Date(`1970-01-01T${msg.timestamp.replace(' ', 'T')}:00Z`) : null;
          if (timestamp && lastTimestamp && (timestamp - lastTimestamp) / (1000 * 60) <= 10) {
            processedMessages.push({ ...msg, timestamp: null });
          } else {
            processedMessages.push(msg);
            if (timestamp) lastTimestamp = timestamp;
          }
        });
    
        setMessages(processedMessages);
      }, []);



  return (
    <div className={`fr-chat fr-content`}>
    <div className="container">
      <div className="chat-list">
        <h2>Chats</h2>
        <ul>
          <li className="chat-item">Chat 1</li>
          <li className="chat-item">Chat 2</li>
          <li className="chat-item">Chat 3</li>
        </ul>
      </div>
      <div className="chat-box">
        <div className="chat-header">
          <h2>Chat with User</h2>
        </div>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <ChatMessage
              key={index}
              type={msg.type}
              message={msg.message}
              timestamp={msg.timestamp}
            />
          ))}
        </div>
        <div className="chat-input">
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
      </div>
    </div>
    </div>
  )
}

export default page
