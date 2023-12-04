import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Logins.css';
import {IconButton,ButtonToolbar,Button} from 'rsuite';

const NavigateButtons = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/login');
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };
  return (
    <div>
      <ButtonToolbar className="top-right-buttons">
        <Button  appearance="primary" >
          SIGNUP
        </Button>
        <Button  appearance="primary" >
          LOGIN
        </Button>
      </ButtonToolbar>
    </div>
  )
}

export default NavigateButtons
