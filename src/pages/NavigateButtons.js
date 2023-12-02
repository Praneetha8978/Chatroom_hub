import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Logins.css';

const NavigateButtons = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/login');
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };
  return (
    <div className="top-right-buttons">
      <button onClick={handleSignInClick} className="button1">
        LOGIN
      </button>
      <button onClick={handleSignUpClick} className="button2">
        Sign Up
      </button>
    </div>
  )
}

export default NavigateButtons
