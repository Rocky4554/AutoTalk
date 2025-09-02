import "./Header.css";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import GlowButton from "../GlowButton/glowButton.jsx";

const Header = () => {
  return (
    <header className="header">
      <Link to="/">
        <div className="header-left">
          <img src="/bot4.png" alt="Logo" className="logo-image" />
          <div className="logo-text">Chatt AI</div>
        </div>
      </Link>

      <div className="header-center">
        {/* You can add navigation links or search bar here */}
      </div>

      <div className="header-right">

        <a
          href="https://pic-hub-jab2.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
         <GlowButton>PicHub</GlowButton>
        </a>

        <SignedOut>
          <Link to="/sign-in">
            <button className="dashboard-btn">Login</button>
          </Link>

          <Link to="/sign-up">
            <button className="dashboard-btn">Sign up</button>
          </Link>
        </SignedOut>

        <SignedIn>
          <Link to="/dashboard">
            <button className="dashboard-btn">Dashboard</button>
          </Link>
          <div className="user-profile">
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </header>
  );
};

export default Header;
