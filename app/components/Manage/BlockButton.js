import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const BlockButton = ({ user }) => {
  const [isBlocked, setIsBlocked] = useState(true); // Initial state is true (blocked)

  // Function to handle blocking the user
  const handleBlock = async () => {
    try {
      const token = Cookies.get('token');
      const response = await axios.post(
        `https://hoifancuongonepiece.site/api/v1/blocks/block?blockedId=${user.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setIsBlocked(true);
      } else {
        console.error("Failed to block the user.");
      }
    } catch (error) {
      console.error("Error occurred:", error.message);
    }
  };

  // Function to handle unblocking the user
  const handleUnblock = async () => {
    try {
      const token = Cookies.get('token');
      const response = await axios.delete(
        `https://hoifancuongonepiece.site/api/v1/blocks/unblock?blockedId=${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setIsBlocked(false);
      } else {
        console.error("Failed to unblock the user.");
      }
    } catch (error) {
      console.error("Error occurred:", error.message);
    }
  };

  // Handle the button click event
  const handleClick = async (e) => {
    e.preventDefault();
    if (isBlocked) {
      await handleUnblock();
    } else {
      await handleBlock();
    }
  };

  // Fetch the initial block status (optional, if you want to fetch the status from the server)
  useEffect(() => {
    const fetchBlockStatus = async () => {
      try {
        const token = Cookies.get('token');
        const response = await axios.get(
          `https://hoifancuongonepiece.site/api/v1/blocks/status?blockedId=${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        setIsBlocked(response.data.isBlocked);
      } catch (error) {
        console.error("Error occurred:", error.message);
      }
    };

    fetchBlockStatus();
  }, [user.id]);

  return (
    <span
      onClick={handleClick}
      className={isBlocked ? 'btn-member-tab un-btn-member-tab' : 'btn-member-tab'}
    >
      <p>{isBlocked ? 'UnBlock' : 'Block'}</p>
    </span>
  );
};

export default BlockButton;
