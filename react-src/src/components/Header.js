import React, { useEffect } from "react";
import "../css/Header.css";

function Header () {
    const handleScroll = () => {
        if(window.scrollY > 0){
            document.querySelector(".topNav").style.display="flex";
        } else {
            document.querySelector(".topNav").style.display="none";
        }
    }
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    });
    return (
        <div className="topNav">
            <div className="topLogo" onClick={() => {window.location.href = "http://localhost:3000"}}></div>
            <div className="topTitle">Home</div>
            <button type="button" className="logout">로그아웃</button>
        </div>
    );
}

export default Header;