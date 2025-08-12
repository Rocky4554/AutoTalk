
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "./dashboardPage.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ChatList from "../../components/chatList/ChatList";
import Upload from "../../components/upload/Upload";
import PicHubModal from "../../components/GlowModal/Glow.jsx";

const DashboardPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });

  const mutation = useMutation({
    mutationFn: (text) => {
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      }).then((res) => res.json());
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ["userChats"] });
      navigate(`/dashboard/chats/${id}`);
    },
  });

  const suggestions = [
    "Ask me anything...",
    "Explain this code",
    "Generate an image of a robot",
    "Fix my JavaScript bug",
    "Write a blog intro paragraph",
    "Help me plan my day",
    "Create a story outline",
    "Debug my Python script"
  ];

  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      
      setTimeout(() => {
        setPlaceholderIndex((prev) => (prev + 1) % suggestions.length);
        setIsAnimating(false);
      }, 300); // Half of transition duration
    }, 3000);

    return () => clearInterval(interval);
  }, [suggestions.length]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text.trim()) return;

    mutation.mutate(text);
    e.target.text.value = ""; // Clear input after submission
  };

  return (
    <div className="dashboardPage">
      {/* Add the PicHub Modal - it will automatically show after 10 seconds */}
      <PicHubModal isLoggedIn={true} isDashboard={true} />
      
      <div className="texts">
        <div className="logo">
          <img src="/bot4.png" alt="Chatt AI Logo" />
          <h1>Chatt AI</h1>
        </div>
        
        <div className="options">
          <div className="option">
            <img src="/chat.png" alt="Chat icon" />
            <span>Create a New Chat</span>
          </div>
          <div className="option">
            <img src="/image.png" alt="Image icon" />
            <span>Analyze Images</span>
          </div>
          <div className="option">
            <img src="/code.png" alt="Code icon" />
            <span>Help me with my Code</span>
          </div>
        </div>
      </div>

      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <div className="inputWrapper">
            <input
              type="text"
              name="text"
              placeholder={suggestions[placeholderIndex]}
              className={isAnimating ? 'animating' : ''}
              disabled={mutation.isPending}
            />
          </div>
          <button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? (
              <div className="spinner"></div>
            ) : (
              <img src="/arrow.png" alt="Send" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashboardPage;
