import React, {useEffect, useState} from 'react';
import Subject from './Subject';
import "../css/Sidebar.css"
import Board from './Board';
import Post from './Post';

function Sidebar(props)   {
    const [mode,setMode] = useState("subject");

    useEffect(()=>{
        document.querySelector(".icon").addEventListener("click", () => { window.location.href = "/"; });
        document.querySelector(".icon").style.backgroundImage="url('http:"+props.access+":8080/img/sideicon.png')";
    },[]);

    const transMode = (mode) => {setMode(mode)};

    if (mode === "board"){
        return (
            <div className='sidebar'>
                <div className='icon'></div>
                <div className='mode' onClick={() => {setMode("subject")}}>게시판 목록<br/><p>(목록명 클릭시 상위 목록으로 이동)</p></div>
                <div className='sideContents'>
                    <Board subject={window.sessionStorage.getItem("sideSubject")} loc="side" transMode={transMode} access={props.access}/>
                </div>
                <div className='moreSide'>
                    <div className='userSetting'>사용자 설정</div>
                    <div className='blogSetting'>블로그 설정</div>
                </div>
            </div>
        );
    } else if (mode === "post"){
        return (
            <div className='sidebar'>
                <div className='icon'></div>
                <div className='mode' onClick={() => {setMode("board")}}>게시글 목록<br/><p>(목록명 클릭시 상위 목록으로 이동)</p></div>
                <div className='sideContents'>
                    <Post board={window.sessionStorage.getItem("sideBoard")} loc="side" access={props.access}/>
                </div>
                <div className='moreSide'>
                    <div className='userSetting'>사용자 설정</div>
                    <div className='blogSetting'>블로그 설정</div>
                </div>
            </div>
        );
    } else {
        return (
            <div className='sidebar'>
                <div className='icon'></div>
                <div className='mode'>주제 목록<br/><p>(목록명 클릭시 상위 목록으로 이동)</p></div>
                <div className='sideContents'>
                    <Subject subjectList={props.subject} loc="side" transMode={transMode} access={props.access}/>
                </div>
                <div className='moreSide'>
                    <div className='userSetting' onClick={()=>{window.location.href="/accountsetting"}}>사용자 설정</div>
                    <div className='blogSetting' onClick={()=>{window.location.href="/blogsetting"}}>블로그 설정</div>
                </div>
            </div>
        );
    }
}

export default Sidebar;