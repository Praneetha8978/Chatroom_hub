import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import './Logins.css';

const theme = {
  gray: {
    default: 'buttonface',
    hover: 'black', // Change this to the desired hover color
  },
};

const Button = styled.button`
  background-color: ${props => theme[props.theme].default};
  color: black;
  text-rendering: geometricPrecision;
//   text-indent: 0px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  padding: 10px 50px;
  border-radius: 10px;
  border: 0.7px solid black;
  margin: 10px 10px 10px 0;
  display: inline-block;
  cursor: pointer;
  font: 400 15px system-ui;
  
  transition: background-color 250ms ease;

  &:hover {
    background-color: ${props => theme[props.theme].hover};
    color: white;
    opacity: 1;
    border-color: black;
    box-shadow: 3px 3px 2px lightgray;
    border-radius: 20px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-en;
  position: absolute;
  top:10px;
  right: 10px;
  `;

Button.defaultProps = {
  theme: 'gray',
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
      <Button onClick = {handleSignInClick}>Login</Button>
      <Button onClick = {handleSignUpClick}>Signup</Button>
    </ButtonGroup>
  );
}