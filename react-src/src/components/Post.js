import React, { useEffect, useState } from "react";

function Post(props){

    const [post, setPost] = useState([]);

    const getPost= async () =>  {
        const url = "http://localhost:8080/post/select/board?board="+props.board;
        const ajax = await fetch(url);
        const response = await ajax.json();
        setPost(response);
    }

    useEffect(() => {
        getPost();
    },[]);

    let printer=[];
    post.forEach((item) => {
        printer.push(
            <div className={"post_item "+props.loc+"_post"} key={item.post_id} id={"post"+item.post_id} onClick={()=>{window.location.href="http://localhost:3000/post"+item.post_id}}>
                {item.post_title}
            </div>
        );
    });
    return(<div className="post">{printer}</div>);
}

export default Post;