import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate("");

  return <h1 onClick={() => navigate("/")}>MusicPad</h1>;
};

export default Header;
