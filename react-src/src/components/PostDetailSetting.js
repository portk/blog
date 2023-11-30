import React, { useEffect, useState } from "react";

function PostDetailSetting(props){
    const [subject, setSubject]=useState();
    const [board, setBoard]=useState();
    const baseUrl = "http:"+props.access+":8080";

    const getSubjectData = async () => {
        let url=`${baseUrl}/subject/select`;
        const ajax = await fetch(url);
        const response = await ajax.json();
        setSubject(response)
    }

    const getBoardData = async () => {
        let boardSubject = document.querySelector("#postSubjectSelect").value;
        if (boardSubject != null){
            let url=`${baseUrl}/board/select/subject?subject=`+boardSubject;
            const ajax = await fetch(url);
            const response = await ajax.json();
            setBoard(response)
        }
    }

    useEffect(()=>{getBoardData(); getSubjectData();
        document.querySelector(".topTitle").innerHTML="포스트 작성하기";},[]
    )
    
    let subjectList=[]
    let boardList=[]

    if (subject != null) {
        subject.forEach(item => {
            subjectList.push(
                <option key={"subject_select"+item.subject_id} value={item.subject_id}>{item.subject_id+". "+item.subject_name}</option>
            )
        })
    }

    if (board != null) {
        board.forEach(item => {
            boardList.push(
                <option key={"board_select"+item.board_id} value={item.board_id}>{item.board_id+". "+item.board_name}</option>
            )
        })
    }

    const savePost = async () => {
        let postBoard, postWriter, postTitle, postContext;
        postBoard=document.querySelector("#postBoardSelect").value;
        postWriter=window.sessionStorage.getItem("userId");
        postTitle=document.querySelector("#newPostTitle").value;
        postContext=document.querySelector("#newPostContent").value;
        let url = `${baseUrl}/post/insert?board=${postBoard}&writer=${postWriter}&title=${postTitle}&context=${postContext}`
        const ajax = await  fetch(url);
        const response = await ajax.text();
        alert(response);
        window.location.href="/";
    }

    return(
        <div className="post_wrapper">
            <div className="titles">
                <div className="titleTop">
                    <div className="postNumber"></div>
                    <div className="postTitle">
                        <div className="postSubjectbox">
                            <select id="postSubjectSelect" onClick={()=>{getBoardData()}}>
                                {subjectList}
                            </select>
                        </div>
                        <div className="postBoardbox"></div>
                            <select id="postBoardSelect">
                                {boardList}
                            </select>
                    </div>
                </div>
                <div className="titleBottom"><input type="text" className="postTitleBox" id ="newPostTitle" placeholder="제목"/></div>
            </div>
            <div className="postBody">
                <div className="postBodyTop"></div>
                <div className="postBodyMid"><textarea className="newPostContent" id="newPostContent" placeholder="본문"></textarea></div>
                <div className="postBodyBottom"><button type="button" id="postSaveButton" onClick={()=>{savePost()}}>저장하기</button></div>
            </div>
        </div>
    );
}

export default PostDetailSetting;