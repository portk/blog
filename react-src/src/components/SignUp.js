import React, { useState } from "react";
import "../css/SignUp.css";

function SignUp(){
    const [idChecked,setIdChecked] = useState(false);

    const idCheck = async () => {
        const baseUrl="http://localhost:8080/user/select/id?id="
        let id = document.querySelector("#userId").value;
        if(id !== "") {
            const url = baseUrl+id;
            const ajax = await fetch(url);
            const response = await ajax.json()
            if (response.length > 0){
                alert("중복된 아이디입니다.")
            } else {
                setIdChecked(true);
                document.querySelector("#userId").setAttribute("readonly",true);
                alert("가입 가능한 아이디입니다.\n\n확인된 아이디와 다른 아이디로 가입하기 위해서는 가입페이지를 다시 접속해 주세요.")
            }
        } else{
            alert("아이디를 입력해주세요");
        }
    }
    
    const register = async () => {
        if(idChecked){
            const baseUrl="http://localhost:8080/user/insert?"
            let id = document.querySelector("#userId").value;
            let pw = document.querySelector("#userPw").value;
            let nick = ""
            if (document.querySelector("#userNick").value !== ""){
                nick = document.querySelector("#userNick").value;
            } else {
                nick = document.querySelector("#userId").value;
            }
            let email = document.querySelector("#userEmail").value;
            const url = baseUrl+"id="+id+"&pw="+pw+"&nick="+nick+"&email="+email;
            if (pw !== "" && email !== ""){
                const ajax = await fetch(url);
                const response = await ajax.text();
                alert(response);
            } else{
                alert("서식을 모두 입력해주세요");
            }
        } else{
            alert("아이디 중복확인을 먼저 실행해주세요");
        }
    }

    return(
        <form className="signUpForm">
            <div className="signUpText">
                <span>ID : </span>
                <input type="text" name="id" id="userId" required/>
                <button type="button" onClick={(e) => {idCheck()}}>중복확인</button><br/>
                <span>PW : </span>
                <input type="password" name="pw" id="userPw" required/><br/>
                <span>nickname : </span>
                <input type="text" name="nick" id="userNick" placeholder="미입력시 아이디와 동일"/><br/>
                <span>Email : </span>
                <input type="email" name="email" id="userEmail" required/><br/>
            </div>
            <input type="submit" className="signUpButton" value="가입하기" onClick={() => {register()}}/>
        </form>
    )
}

export default SignUp;