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
            <div className="topLogo">이미지</div>
            <div className="topTitle">제목</div>
            <div className="logout">로그아웃버튼</div>
        </div>
    );
}

export default Header;