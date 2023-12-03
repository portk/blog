import React, { useEffect, useState } from "react";
import Reply from "./Reply";
import "../css/PostDetail.css";

function PostDetail (props){
    const [post, setPost] = useState([]);
    const [file, setFile] = useState([]);
    
    const getPost = async () => {
        const url = "http:"+props.access+":8080/post/select/id?id="+props.post_id;
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

    const downFile = (fileId) => {
        const url = "http:"+props.access+":8080/file/download?fileId="+fileId;
        window.location.href=url;
    }

    useEffect(()=>{
        getPost();getFile();
    },[]);

    if (post != null){
        document.querySelector(".topTitle").innerHTML=post.post_title;
    }

    let files = []
    if (file != null){
        file.forEach(item => {
            files.push(
                <div className="fileItem" key={"fileItem"+item.file_id} onClick={()=>{downFile(item.file_id)}}>
                    {item.file_name}
                </div>
            )
        })
    }

    if(post.toString() !== ""){
        return (
            <div className="postDetail">
                <div className="postItem" key={post.post_id}>
                    <div className="postTop">
                        <div className="title">{post.post_title}</div>
                        <div className="postWriter">{post.writer}</div>
                        <div className="dateTime">
                            <div className="date">{post.post_date.slice(0,10)}</div>
                            <div className="time">{post.post_date.slice(11,19)}</div>
                        </div>
                    </div>
                    <hr/>
                    <div className="attachment">
                        {files}
                    </div>
                    <div className="context">{post.post_context}</div>
                    <hr/>
                    <button type="button" onClick={()=>{window.location.href="/postdetailsetting/post"+props.post_id}}>수정하기</button>
                    <hr/>
                    <Reply post={post.post_id} access={props.access}/>
                </div>
            </div>
        )
    }
}

export default PostDetail;