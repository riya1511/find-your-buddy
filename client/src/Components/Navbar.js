import React from "react";
import logo from "../Images/logo-2.png";
import colorLogo from "../Images/logo-1.png";

const Navbar = ({ authToken, minimal, setShowModal, showModal, setIsSignUp }) => {

  const handleClick = () => {
    setShowModal(true);
    setIsSignUp(false);
  };

  return (
    <nav>
      <div className="logo-container">
        <img className="logo" src={minimal ? colorLogo : logo} alt="logo" />
      </div>

      {!authToken && !minimal && (
        <button
          className="nav-button"
          onClick={handleClick}
          disabled={showModal}
        >
          Log In
        </button>
      )}
    </nav>
  );
};

export default Navbar;
