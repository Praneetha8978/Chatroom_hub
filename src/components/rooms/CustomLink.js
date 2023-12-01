import React from "react";
import { Link, useNavigate } from "react-router-dom";

const CustomLink = ({ to, children }) => {
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    navigate(to, { replace: true });
  };

  return (
    <Link to={to} onClick={handleClick}>
      {children}
    </Link>
  );
};

export default CustomLink;