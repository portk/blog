import React, { useEffect } from "react";
import "../css/Header.css";

function Header (props) {
    useEffect(() => {
        document.querySelector(".topLogo").style.backgroundImage="url('http:"+props.access+":8080/img/icon.png')"
    });

    const logout = () => {
        if (window.confirm("로그아웃 하시겠습니까?")){
            window.sessionStorage.clear();
            window.location.href="/";
        }
    }
    return (
        <div className="topNav">
            <div className="topLogo" onClick={() => {window.location.href = "/"+window.sessionStorage.getItem("userId")}}></div>
            <div className="topTitle">Home</div>
            <div className="headerButtons">
                <button type="button" className="newPost" onClick={()=>{window.location.href="/postdetailsetting"}}>새 글 쓰기</button>
                <button type="button" className="logout" onClick={()=>{logout()}}>로그아웃</button>
            </div>
        </div>
    );
}

export default Header;