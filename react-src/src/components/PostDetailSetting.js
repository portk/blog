import React, { useEffect, useState } from "react";
import FileUpload from "./FileUpload";

function PostDetailSetting(props){
    const [subject, setSubject]=useState();
    const [board, setBoard]=useState();
    const [post, setPost]=useState();
    const [file, setFile]=useState();
    const blogerId=window.sessionStorage.getItem("userId");
    let writer=blogerId;

    const baseUrl = "http:"+props.access+":8080";

    const getSubjectData = async () => {
        let url=`${baseUrl}/${blogerId}/subject/select`;
        const ajax = await fetch(url,{method:"Post"});
        const response = await ajax.json();
        setSubject(response)
    }

    const getBoardData = async () => {
        let boardSubject = document.querySelector("#postSubjectSelect").value;
        if (boardSubject != null){
            let url=`${baseUrl}/${blogerId}/board/select/subject?subject=`+boardSubject;
            const ajax = await fetch(url,{method:"Post"});
            const response = await ajax.json();
            setBoard(response)
        }
    }

    const getPost = async () => {
        const url = "http:"+props.access+":8080/post/select/all/id?id="+props.post_id;
        const ajax = await fetch(url,{method:"Post"})
        const response = await ajax.json();
        setPost(response[0]);
    };

    const getFile = async () => {
        const url = "http:"+props.access+":8080/file/select/post?post_id="+props.post_id;
        const ajax = await fetch(url,{method:"POST"});
        const response = await ajax.json();
        setFile(response);
    }

    useEffect(()=>{
        getBoardData(); getSubjectData(); getFile();
        if (props.post_id != null) {
            getPost()
        } else {
            document.querySelector(".topTitle").innerHTML="포스트 작성하기"
            document.querySelector("#postSaveButton").addEventListener("click",savePost)
        }
        },[]
    )
    
    let upload=[]
    if (post != null){
        document.querySelector(".topTitle").innerHTML=post.post_title;
        document.querySelector("#newPostTitle").value=post.post_title;
        document.querySelector("#newPostContent").value=post.post_context;
        const updatePost = async () => {
            let postBoard, postTitle, postContext;
            postBoard=document.querySelector("#postBoardSelect").value;
            if (postBoard === "default") {postBoard=post.board_id;}
            postTitle=document.querySelector("#newPostTitle").value;
            postContext=document.querySelector("#newPostContent").value;
            let url = `${baseUrl}/post/update?board=${postBoard}&id=${props.post_id}&title=${postTitle}&context=${postContext}`
            const ajax = await fetch(url,{method:"Post"});
            const response = await ajax.text();
            alert(response);
            window.location.href="/"+blogerId+"/post"+props.post_id;
        }
        document.querySelector("#postSaveButton").addEventListener("click",updatePost)
        writer=post.writer;
        upload.push(<FileUpload key={"postFileUploader"+props.post_id} access={props.access} post_id={post.post_id}/>);
    }

    let subjectList=[]
    let boardList=[]

    if (subject != null) {
        subject.forEach(item => {
            subjectList.push(
                <option key={"subject_select"+item.subject_id} id={"subject_select"+item.subject_id} value={item.subject_id}>
                    {item.subject_id+". "+item.subject_name}
                </option>
            )
        })
    }

    if (board != null) {
        board.forEach(item => {
            boardList.push(
                <option key={"board_select"+item.board_id} id={"board_select"+item.board_id} value={item.board_id}>{item.board_id+". "+item.board_name}</option>
            )
        })
    }

    const savePost = async () => {
        let postBoard, postWriter, postTitle, postContext;
        postBoard=document.querySelector("#postBoardSelect").value;
        if (postBoard !== "default") {
            postWriter=window.sessionStorage.getItem("userId");
            postTitle=document.querySelector("#newPostTitle").value;
            postContext=document.querySelector("#newPostContent").value;
            let url = `${baseUrl}/post/insert?board=${postBoard}&writer=${postWriter}&title=${postTitle}&context=${postContext}`
            const ajax = await  fetch(url,{method:"Post"});
            const response = await ajax.text();
            alert(response);
            window.location.href="/"+blogerId;
        } else{
            alert("게시판을 선택해주세요\n(주제를 선택하면 게시판 목록이 로드됩니다.")
        }
    }

    const fileDelete = async (file_id) => {
        let url = baseUrl+"/file/delete?fileId="+file_id;
        const ajax = await fetch(url,{method:"POST"})
        const response = await ajax.text();
        alert(response);
    }

    let files = []
    if (file != null){
        file.forEach(item => {
            files.push(
                <div className="fileItemSetting" key={"fileItem"+item.file_id}>
                    {item.file_name}
                    <button type="button" onClick={()=>{fileDelete(item.file_id)}}>파일삭제</button>
                </div>
            )
        })
    }

    if(blogerId === writer){
        return(
            <div className="post_wrapper">
                <div className="titles">
                    <div className="titleTop">
                        <div className="postNumber"></div>
                        <div className="postTitle">
                            <div className="postSubjectbox">
                                <label htmlFor="postSubjectSelect">주제 : </label>
                                <select id="postSubjectSelect" onClick={()=>{getBoardData()}}>
                                    <option value="default">선택안함</option>
                                    {subjectList}
                                </select>
                            </div>
                            <div className="postBoardbox"></div>
                                <label htmlFor="postBoardSelect">게시판 : </label>
                                <select id="postBoardSelect">
                                    <option value="default">선택안함</option>
                                    {boardList}
                                </select>
                        </div>
                    </div>
                    <div className="titleBottom"><input type="text" className="postTitleBox" id ="newPostTitle" placeholder="제목"/></div>
                </div>
                <div className="postBody">
                    <div className="postBodyTop"></div>
                    <div className="postBodyMid"><textarea className="newPostContent" id="newPostContent" placeholder="본문"></textarea></div>
                    {files}
                    {upload}
                    <div className="postBodyBottom"><button type="button" id="postSaveButton">저장하기</button></div>
                </div>
            </div>
        );
    } else {
        alert("작성자만 수정 가능합니다");
        window.location.href = "/"+blogerId;
    }
}

export default PostDetailSetting;