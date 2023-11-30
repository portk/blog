import React, { useEffect, useState } from "react";
import "../css/AccountSetting.css";

function AccountSetting(props){
    let code=window.sessionStorage.getItem("userCode");
    const [accountData, setAccountData] = useState();
    const [accountSettingMode, setAccountSettingMode] = useState("read");

    const getAccountInfo = async () => {
        const ajax = await fetch("http:"+props.access+":8080/user/select/code?code="+code);
        const response = await ajax.json();
        setAccountData(response[0]);
    }

    const updatingAccount = async (url) => {
        const ajax = await fetch(url);
        const response = await ajax.text();
        alert(response);
        setAccountSettingMode("read");
    }

    const updateAccountInfo = () => {
        let url = "http:"+props.access+":8080/user/update?code="+code
        const id=document.querySelector("#id");
        const pw=document.querySelector("#pw");
        const nick=document.querySelector("#nick");
        const email=document.querySelector("#email");
        let idv,pwv,nickv,emailv;
        idv = id.value === "" ? accountData.id : id.value;
        pwv = pw.value === "" ? accountData.pw : pw.value;
        nickv = nick.value === "" ? accountData.nickname : nick.value;
        emailv = email.value === "" ? accountData.email : email.value;
        url += "&id="+idv+"&pw="+pwv+"&nick="+nickv+"&email="+emailv;
        updatingAccount(url);
    };

    const deleteAccount = async () => {
            if (window.confirm("계정을 삭제하시겠습니까?")){
            let url = "http:"+props.access+":8080/user/delete?code="+accountData.code;
            const ajax = await fetch(url)
            const response = await ajax.text();
            alert(response);
            window.sessionStorage.clear()
            window.location.href="/";
        }
    }

    useEffect(() => {
        getAccountInfo();
    },[])

    if (accountSettingMode ==="read"){
        if (accountData != null ){
            return (
                <div className="accountInfo">
                    <h3>계정 정보</h3>
                    <div className="account_item">
                        <div className="account_item_left">ID : </div>
                        <div className="account_item_Right">{accountData.id}</div>
                    </div>
                    <div className="account_item">
                        <div className="account_item_left">Nickname : </div>
                        <div className="account_item_Right">{accountData.nickname}</div>
                    </div>
                    <div className="account_item">
                        <div className="account_item_left">email : </div>
                        <div className="account_item_Right">{accountData.email}</div>
                    </div>
                    <div className="account_botton">
                        <button type="button" onClick={()=> {setAccountSettingMode("update");}}>
                            수정하기
                        </button>
                        <button type="button" onClick={()=>{deleteAccount();}}>계정삭제</button>
                    </div>
                </div>
            );
        }
    } else {
        if (accountData !== null){
            return(
                <form className="accountSetting">
                    <h3>수정하기</h3>
                    <p>미입력시 기존 정보로 저장됩니다.</p>
                    <span>ID : </span>
                    <input type="text" name="id" id="id" value={accountData.id} disabled/><br/>
                    <span>PW : </span>
                    <input type="password" name="pw" id="pw"/><br/>
                    <span>Nickname : </span>
                    <input type="text" name="nick" id="nick" placeholder={accountData.nickname}/><br/>
                    <span>Email : </span>
                    <input type="email" name="email" id="email" placeholder={accountData.email}/><br/>
                    <input type="submit" value="수정완료" onClick={(e)=> {e.preventDefault(); updateAccountInfo()}}/>
                    <button type="button" onClick={()=>{setAccountSettingMode("read")}}>수정취소</button>
                </form>
            );
        }
    }
}

export default AccountSetting;