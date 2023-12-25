import React from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import './Logins.css';


// buttonface
const theme = {
  'b': {
    default: 'White',
    hover: 'Azure', // Change this to the desired hover color
  },
};

const Button = styled.button`
  background-color: ${props => theme[props.theme].default};
  color: Black;
  border:none;
  padding: 6px 20px;
  border-radius: 10px;
  margin: 10px 10px 7px 0;
  cursor: pointer;
  position:relative;
  font: 400 16px system-ui;
  transition: background-color 250ms ease;
  text-rendering: geometricPrecision;
  display: inline-block;
  //   text-indent: 0px;
  // text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
    // border: 0.7px solid Dimgray; solid Dimgray
  
    &:before {
      content: '';
      position: absolute;
      width: 100%;
      height: 0.8px; /* Set the thickness of the underline */
      bottom: 0;
      left: 0;
      background-color: Darkgreen; /* Set the color of the underline */
      transform: scaleX(0); /* Initially hide the underline */
      transform-origin: bottom right;
      transition: transform 0.4s ease-out;
    }
    &:hover{
      color: DarkGreen;
    }
    &:hover:before {
      transform: scaleX(1); /* Show the underline on hover */
      transform-origin: bottom left;
    }
  }

`;
  // &:hover {
  //   background-color: ${props => theme[props.theme].hover};
  //   color: Dimgray;
  //   border-radius: 20px;
  // }
  // opacity: 1;
  // border-color: Dimgray;
  // box-shadow: 3px 3px 2px ;
  // Dimgray
   //lightgrey
const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-en;
  position: absolute;
  top:10px;
  right: 10px;
  `;

Button.defaultProps = {
  theme: 'b',
};

export default function App() {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/login');
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };
  return (
    <ButtonGroup>
      <Button onClick = {handleSignInClick}>LogIn</Button>
      <Button onClick = {handleSignUpClick}>SignUp</Button>
    </ButtonGroup>
  );
}