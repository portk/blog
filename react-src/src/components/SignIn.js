import React, { useState } from "react";
import "../css/SignIn.css";

function SignIn (){
    const [userInfo, setUserInfo] = useState([])

    const check = async () =>{
        const checkUrl="http://localhost:8080/user/select/idpw?";
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
            <form className="signInForm">
                <div className="signInText">
                    <span for="id">ID : </span>
                    <input type="text" name="id" id="userId"/><br/>
                    <span for="pw">PW : </span>
                    <input type="password" name="pw" id="userPw"/>
                </div>
                <input className="signInButton" type="submit" value="로그인" onClick={(e) => {e.preventDefault(); check();}}/>
            </form>
        )
    } else{
        return (<div>{userInfo.nickname}님 환영합니다.</div>)
    }
}

export default SignIn;