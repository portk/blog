import React, {useEffect, useState} from 'react';
import Subject from './Subject';
import "../css/Sidebar.css"
import Board from './Board';
import Post from './Post';

function Sidebar(props)   {
    const [mode,setMode] = useState("subject");
    const [code,setCode] = useState(props.subject);

    useEffect(()=>{
        document.querySelector(".icon").addEventListener("click", () => { window.location.href = "/"; });
    },[]);

    const transMode = (mode) => {setMode(mode)};
    const transCode = (code) => {setCode(code)};
    
    //setCode(each.getAttribute("id"))

    if (mode === "board"){
        return (
            <div className='sidebar'>
                <div className='icon'></div>
                <div className='mode' onClick={() => {setMode("subject")}}>게시판 목록<br/><p>(목록명 클릭시 상위 목록으로 이동)</p></div>
                <Board subject={code} loc="side" transCode={transCode} transMode={transMode}/>
            </div>
        );
    } else if (mode === "post"){
        return (
            <div className='sidebar'>
                <div className='icon'></div>
                <div className='mode' onClick={() => {setMode("board")}}>게시글 목록<br/><p>(목록명 클릭시 상위 목록으로 이동)</p></div>
                <Post board={code} loc="side"/>
            </div>
        );
    } else {
        return (
            <div className='sidebar'>
                <div className='icon'></div>
                <div className='mode'>주제 목록<br/><p>(목록명 클릭시 상위 목록으로 이동)</p></div>
                <Subject subjectList={props.subject} loc="side" transCode={transCode} transMode={transMode}/>
            </div>
        );
    }
}

export default Sidebar;