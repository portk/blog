import React, { useState } from "react";
import "../css/SignIn.css";
import App from "./App";

function SignIn (props){
    const [userInfo, setUserInfo] = useState([])

    const check = async () =>{
        const checkUrl="http:"+props.access+":8080/user/signin?";
        let id=document.getElementById("userId").value;
        let pw=document.getElementById("userPw").value;
        let url = checkUrl+"id="+id+"&pw="+pw
        const ajax = await fetch(url);
        const response = await ajax.json();
        if (response.length > 0){
            setUserInfo(response[0]);
            document.getElementById("userId").value="";
            document.getElementById("userPw").value="";
        } else{
            alert("일치하는 사용자 정보가 없습니다.")
        }
    }

    if (userInfo.length < 1){
        return(
            <div className="signInBody">
                <div className="signInPart">
                    <form className="signInForm">
                        <div className="signInText">
                            <span>ID : </span>
                            <input type="text" name="id" id="userId"/><br/>
                            <span>PW : </span>
                            <input type="password" name="pw" id="userPw"/>
                        </div>
                        <input className="signInButton" type="submit" value="로그인" onClick={(e) => {e.preventDefault(); check();}}/>
                    </form>
                    <p>사용중인 계정이 없으시다면? <a href="/signup">회원가입</a></p>
                </div>
            </div>
        )
    } else{
        window.sessionStorage.setItem("userCode", userInfo.code)
        window.sessionStorage.setItem("userId", userInfo.id)
        window.sessionStorage.setItem("userNickname", userInfo.nickname)
        window.sessionStorage.setItem("userEmail", userInfo.email)
        return (<App/>)
    }
}

export default SignIn;