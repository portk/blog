import React, { useEffect, useState } from "react";
import Reply from "./Reply";
import "../css/PostDetail.css";

function PostDetail (props){
    const [post, setPost] = useState([]);
    
    const getPost = async () => {
        const url = "http:"+props.access+":8080/post/select/id?id="+props.post_id;
        const ajax = await fetch(url)
        const response = await ajax.json();
        setPost(response);
    };

    useEffect(()=>{
        getPost();
    },[]);
    let printer=[]
    post.forEach((item) => {
        printer.push(
            <div className="postItem" key={item.post_id}>
                <div className="postTop">
                    <div className="title">{item.post_title}</div>
                    <div className="postWriter">{item.writer}</div>
                    <div className="dateTime">
                        <div className="date">{item.post_date.slice(0,10)}</div>
                        <div className="time">{item.post_date.slice(11,19)}</div>
                    </div>
                </div>
                <hr/>
                <div className="context">{item.post_context}</div>
                <hr/>
                <Reply post={item.post_id} access={props.access}/>
            </div>
        )
        document.querySelector(".topTitle").innerHTML=post[0].post_title;
    })
    

    return (
        <div className="postDetail">{printer}</div>
    )
}

export default PostDetail;