import React, { useEffect } from "react";
import "../css/Header.css";

function Header (props) {
    useEffect(() => {
        document.querySelector(".topLogo").style.backgroundImage="url('http:"+props.access+":8080/img/icon.png')"
    });
    return (
        <div className="topNav">
            <div className="topLogo" onClick={() => {window.location.href = "/"}}></div>
            <div className="topTitle">Home</div>
            <button type="button" className="logout" onClick={()=>{window.sessionStorage.clear(); window.location.href="/"}}>로그아웃</button>
        </div>
    );
}

export default Header;