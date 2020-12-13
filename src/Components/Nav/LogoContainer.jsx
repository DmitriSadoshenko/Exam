import React from "react";
import logo from '../../img/logo.svg';
import { useHistory } from "react-router-dom";

const LogoContainer = (props) => {
  let history = useHistory();
  
  const handleClick = () => {
    history.push("/home");
  }
  
    return (
      <div className="logo-container">
        
          <button onClick={handleClick}><img src={logo} /></button> 
          <span className="level-title">LEVEL {props.level}</span>
      </div>
    )
    
}

export default LogoContainer