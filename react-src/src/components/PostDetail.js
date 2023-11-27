import React, { useState } from "react";
import Reply from "./Reply";

function PostDetail (props){
    const [post, setPost] = useState({});
    
    const getPost = async () => {
        const url = "http://localhost:8080/post/select/id?id="+props.post_id;
        const ajax = await fetch(url)
        const response = await ajax.json();
        setPost(response);
    };

    getPost()
    console.log(post);

    return (
        <div className="post">
            <div className="title">{post.title}</div>
            <div className="writer">{post.writer}</div>
            <div className="content">{post.content}</div>
            <hr/>
            <Reply post={post.post_id}/>
        </div>
    );
}

export default PostDetail;