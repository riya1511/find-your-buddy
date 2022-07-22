import React, { useState } from "react";
import AuthModal from "../Components/AuthModal";
import Navbar from "../Components/Navbar";
import { useCookies } from 'react-cookie';

const Home = () => {

  const [cookies, setCookies, removeCookies] = useCookies(['user'])

  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);

  const authToken = cookies.Token;

  const handleClick = () => {
    if (authToken) {
      removeCookies('UserId', cookies.UserId)
      removeCookies('Token', cookies.AuthToken)
      window.location.reload()
      return
  }

    console.log("Clicked");
    setShowModal(true);
    setIsSignUp(true);
  };

  return (
    <div className="overlay">
      <Navbar
        authToken={authToken}
        minimal={false}
        setShowModal={setShowModal}
        showModal={showModal}
        setIsSignUp={setIsSignUp}
      />
      <div className="home">
        <h1 className="primary-title">Swipe Right</h1>
        <button className="primary-button" onClick={handleClick}>
          {authToken ? "Sign Out" : "Create Account"}
        </button>

        {showModal && <AuthModal setShowModal={setShowModal} isSignUp={isSignUp} />}
      </div>
    </div>
  );
};

export default Home;
