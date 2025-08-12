
import { Link } from "react-router-dom";
import "./chatList.css";
import { useQuery } from "@tanstack/react-query";
import { useAuth, useUser, SignedIn, UserButton } from '@clerk/clerk-react';
import { useState } from 'react';

const ChatList = () => {
  const { getToken } = useAuth();
  const { user } = useUser();
  const [isChatsOpen, setIsChatsOpen] = useState(false);

  const { isPending, error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: async () => {
      const token = await getToken();
      return fetch(`${import.meta.env.VITE_API_URL}/api/userchats/user`, {
        credentials: "include",
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }).then((res) => res.json());
    },
  });

  const toggleChats = () => {
    setIsChatsOpen(!isChatsOpen);
  };

  return (
    <div className="chatList">
      <Link to="/dashboard">Start a new Chat</Link>
      <Link to="/">Explore Chatt AI</Link>
      
      <hr />
      
      <div className="recentChatsHeader">
        <span className="title">ALL YOUR CHATS</span>
        <button 
          className="toggleButton"
          onClick={toggleChats}
          aria-label={isChatsOpen ? "Close chat history" : "Open chat history"}
        >
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={`chevron ${isChatsOpen ? 'open' : ''}`}
          >
            <polyline points="6,9 12,15 18,9"></polyline>
          </svg>
        </button>
      </div>

      <div className={`list ${isChatsOpen ? 'open' : 'closed'}`}>
        {isPending
          ? "Loading..."
          : error
          ? "Something went wrong!"
          : data?.map((chat) => (
            <div key={chat._id} className="chat-message" >
              <Link to={`/dashboard/chats/${chat._id}`}>
                <div>
                  {chat.title}
                </div>
              </Link>
            </div>
          ))}
      </div>
      
      <hr />
    
    </div>
  );
};

export default ChatList;
