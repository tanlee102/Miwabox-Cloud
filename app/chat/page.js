'use client';

import React, { useContext, useEffect, useState, useRef } from 'react';
import '../styles/Chat/chat.css';
import '../styles/Chat/chatRes.css';

import { WindowContext } from '../context/WindowContext';
import { converTimeShort } from '../helper/converTime';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import axios from 'axios';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import Link from 'next/link';

const page = () => {
  const { userData } = useContext(WindowContext);

  const [messages, setMessages] = useState([]);
  const [listConversations, setListConversations] = useState([]);
  const [chater, setChater] = useState(null);
  const [currentMessageId, setCurrentMessageId] = useState(null);
  const [loading, setLoading] = useState(false);

  const messageInputRef = useRef(null);
  const chatMessagesRef = useRef(null);
  const currentChatter = useRef(null);

  const [searchUsers, setSearchUsers] = useState("")

  const searchParams = useSearchParams();
  const conversationIdSearch = searchParams.get('conversation');

  let stompClient = useRef(null);

  const loadConversations = async (userId) => {
    try {
      const response = await axios.get('http://localhost:8080/api/conversations?userId=' + userId);
      const myTempList = response.data;
      setListConversations(response.data);
      if(chater == null){
        setChater(myTempList.find(c => c.id === Number(conversationIdSearch)))
        currentChatter.current = myTempList.find(c => c.id === Number(conversationIdSearch))
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadMessages = async (conversationId, size, lastMessageId) => {
    try {
      const url = lastMessageId 
      ? `http://localhost:8080/api/v1/messages?conversationId=${conversationId}&size=${size}&lastMessageId=${lastMessageId}`
      : `http://localhost:8080/api/v1/messages?conversationId=${conversationId}&size=${size}`;
      const response = await axios.get(url);
      let fetchedMessages = response.data.map(msg => ({
        type: msg.senderId === userData.id ? 'outgoing' : 'incoming',
        message: msg.content,
        timestamp: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        id: msg.id,
      }));
      console.log(fetchedMessages)
      fetchedMessages = fetchedMessages.reverse();
      setCurrentMessageId(fetchedMessages[0].id);
      setMessages(prevMessages => [...fetchedMessages, ...prevMessages]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userData?.id) {
      loadConversations(userData.id);
      if(conversationIdSearch){
        loadMessages(conversationIdSearch, 100);
      }
    }
  }, [userData?.id]);


  useEffect(() => {
    setMessages([])
    if (userData?.id) {
      loadMessages(chater?.id, 100);
    }
  }, [chater]);

  // Scroll to bottom when messages are loaded or a new message is sent
  useEffect(() => {
    if (chatMessagesRef.current && messages.length >= 10) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  // WebSocket connection setup
  useEffect(() => {
    const userId = userData?.id;

    const connect = () => {
      const socket = new SockJS('http://localhost:8080/ws');
      stompClient.current = Stomp.over(socket);
      stompClient.current.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.current.subscribe(`/user/${userId}/queue/messages`, function (message) {
          console.log('Received message: ', message);
          const newMessage = JSON.parse(message.body);
          console.log('Received message: ', newMessage);
          console.log(currentChatter.current )
          if(currentChatter.current.id == newMessage.conversationId){
            setMessages((prevMessages) => [...prevMessages, {
              type: 'incoming',
              message: newMessage.content,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
          }else{
              // If the message is for a different conversation, update the conversation list
              setListConversations((prevConversations) => {
                return prevConversations.map((conversation) => {
                  if (conversation.id === newMessage.conversationId) {
                    return {
                      ...conversation,
                      lastMessage: {
                        content: newMessage.content,
                        createdAt: new Date().toISOString() // or newMessage.createdAt if available
                      },
                      readAllMessages: false // Mark as unread
                    };
                  }
                  return conversation;
                });
              });
          }
        });
      }, function (error) {
        console.error('Error connecting: ' + error);
      });
    };
 
    if (userId) {
      connect();
    }

    return () => {
      if (stompClient?.current) {
        try {
          stompClient.current?.disconnect(); 
        } catch (error) {
        }
      }
    };
  }, [userData]);

  const sendMessage = () => {
    const content = messageInputRef.current.textContent;
    if (!content) {
      console.error('Message content is empty');
      return;
    }

    const message = {
      senderId: userData.id,
      receiverId: chater?.otherUser?.userId,
      content: content
    };

    console.log('Sending message: ' + JSON.stringify(message));
    stompClient.current.send("/app/chat", {}, JSON.stringify(message));

    setMessages((prevMessages) => [...prevMessages, {
      type: 'outgoing',
      message: content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);

    messageInputRef.current.textContent = "";
  };

  const handleScroll = async () => {
    if (chatMessagesRef.current.scrollTop === 0 && !loading) {
      setLoading(true);
      await loadMessages(chater?.id, 100, currentMessageId);
      setLoading(false);
    }
  };


  const router = useRouter();


    // Update conversation to mark it as read
    const markConversationAsRead = (index) => {
      setListConversations(prevConversations => {
        const updatedConversations = [...prevConversations];
        updatedConversations[index] = {
          ...updatedConversations[index],
          readAllMessages: true
        };
        return updatedConversations;
      });
    };

  return (
    <div className={`fr-chat fr-content`}>
      <div className="container">
        <div className="chat-list">
          <h3>Đoạn chat</h3>
          <div className="search-app">
            <input placeholder="@Username" type="text" value={searchUsers}  onChange={(e) => setSearchUsers(e.target.value)}/>
            <span>
              <svg viewBox="0 0 24 24" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M4 11C4 7.13401 7.13401 4 11 4C14.866 4 18 7.13401 18 11C18 14.866 14.866 18 11 18C7.13401 18 4 14.866 4 11ZM11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C13.125 20 15.078 19.2635 16.6177 18.0319L20.2929 21.7071C20.6834 22.0976 21.3166 22.0976 21.7071 21.7071C22.0976 21.3166 22.0976 20.6834 21.7071 20.2929L18.0319 16.6177C19.2635 15.078 20 13.125 20 11C20 6.02944 15.9706 2 11 2Z"></path>
              </svg>
            </span>
          </div>
          <ul>
            {listConversations.map((conversation, index) => (
              <li key={conversation.id} onClick={() => {
                setChater(listConversations[index]);
                currentChatter.current = listConversations[index];
                markConversationAsRead(index);
                router.push('/chat?conversation=' + listConversations[index].id)
              }} className={`chat-item ${chater?.id == conversation.id ? "con-reading" : ""}`}>
                <div className='avatar-chat-item'>
                  <img src={conversation.otherUser.profileImageUrl ? 'https://image.lehienthanh.workers.dev/?id=' + conversation.otherUser.profileImageUrl : '/avatar.jpeg'} alt="" />
                </div>
                <div className='content-chat-item'>
                  <div>{conversation.otherUser.username}</div>
                  <div className={`recent-info-chat-item ${conversation.readAllMessages ? "" : "not-read-recent-info-chat-item"}`}>
                    <span>{conversation?.lastMessage?.content ?  conversation?.lastMessage?.content : ""}</span>
                    <span className='delimiter'>•</span>
                    <span>{conversation?.lastMessage?.createdAt ? converTimeShort(conversation?.lastMessage?.createdAt) : ""}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="chat-box">
          <div className="chat-header">
            <Link href={'/'+chater?.otherUser?.username}>
            <h3>{chater?.otherUser?.username}</h3></Link>
            <div className='button-info-of-chat'>
              <svg viewBox="0 0 24 24" aria-hidden="true" className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03">
                <g>
                  <path d="M13.5 8.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5S11.17 7 12 7s1.5.67 1.5 1.5zM13 17v-5h-2v5h2zm-1 5.25c5.66 0 10.25-4.59 10.25-10.25S17.66 1.75 12 1.75 1.75 6.34 1.75 12 6.34 22.25 12 22.25zM20.25 12c0 4.56-3.69 8.25-8.25 8.25S3.75 16.56 3.75 12 7.44 3.75 12 3.75s8.25 3.69 8.25 8.25z"></path>
                </g>
              </svg>
            </div>
          </div>
          <div className="chat-messages" ref={chatMessagesRef} onScroll={handleScroll}>
            {chater?
            <div className='info-user-start-chat'>
              <img src={chater?.otherUser?.profileImageUrl ? 'https://image.lehienthanh.workers.dev/?id=' + chater.otherUser.profileImageUrl : '/avatar.jpeg'} alt="" />
              <div className='name-info-start-chat'>{chater?.otherUser?.username}</div>
              <div>{chater?.otherUser?.bio}</div>
            </div>
            : ""}

            {messages.map((msg, index) => (
              <div key={msg.id} className={`message ${msg.type}`}>
                <span className={messages[index + 1]?.type !== msg?.type ? (msg?.type === "incoming" ? "inlast" : "outlast") : ""}>{msg.message}</span>
                {messages[index + 1]?.type !== msg?.type && <span className="timestamp">{msg.timestamp}</span>}
              </div>
            ))}
          </div>

          {chater && chater.blocked == false && (
          <div className="chat-input">
            <div className="contain-input-thread">
              <div className="input-thread">
                <div className="contain-input-thr">
                  <div ref={messageInputRef} contentEditable='true' className="input-thr" placeholder="Aa"></div>
                  <div className="btn-input-thread">
                    <svg onClick={sendMessage} fill="#000000" viewBox="0 0 24 24" id="send" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg">
                      <path id="primary" d="M21.66,12a2,2,0,0,1-1.14,1.81L5.87,20.75A2.08,2.08,0,0,1,5,21a2,2,0,0,1-1.82-2.82L5.46,13l.45-1-.45-1L3.18,5.87A2,2,0,0,1,5.87,3.25l14.65,6.94A2,2,0,0,1,21.66,12Z"></path>
                      <path id="secondary" d="M12,12a1,1,0,0,1-1,1H5.46l.45-1-.45-1H11A1,1,0,0,1,12,12Z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}

          {chater?.blocked == true ? 
          <div className="info-block-two-chat">The conversation between the two users have been blocked.</div>
          : ""}

        </div>

      </div>
    </div>
  );
};

export default page;
