import { Link } from "react-router-dom";
import "./homepage.css";
import { TypeAnimation } from "react-type-animation";
import { useState } from "react";
import Getstartedbutton from '../../components/button/getstarted-button.jsx'
import Header from "../../components/Header/Header.jsx";

const Homepage = () => {
  const [typingStatus, setTypingStatus] = useState("human1");

  return (
    <>
     <Header />
    <div className="homepage">
      <img src="/orbital.png" alt="" className="orbital" />
      <div className="left">
        <h1>Chatt AI</h1>
        <h2>Supercharge your creativity and productivity</h2>
        <h3>
          Whether you're brainstorming ideas, writing content, coding projects, or just looking for quick answers, our AI assistant is here to help.
        </h3>
        <Link to="/dashboard"><Getstartedbutton/></Link>
        
      </div>
      <div className="right">
        <div className="imgContainer">
          <div className="bgContainer">
            <div className="bg"></div>
          </div>
          <img src="/bot4.png" alt="" className="bot" />
          <div className="chat">
            <img
              src={
                typingStatus === "human1"
                  ? "/human1.jpeg"
                  : typingStatus === "human2"
                  ? "/human2.jpeg"
                  : "bot.png"
              }
              alt=""
            />
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                "Human: What is Chatt AI ?",
                2000,
                () => {
                  setTypingStatus("bot");
                },
                "Bot: Chatt AI is an AI assistant made by RAUNAK.",
                2000,
                () => {
                  setTypingStatus("human2");
                },
                "Human: How to get started with Chatt AI ?",
                2000,
                () => {
                  setTypingStatus("bot");
                },
                "Bot: Click on Get Started and begin your journey.",
                2000,
                () => {
                  setTypingStatus("human1");
                },
              ]}
              wrapper="span"
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
      
    </div>
  
    </>
  );
}; 

export default Homepage;
