import React, { useEffect, useState } from "react";

function Post(props){

    const [post, setPost] = useState([]);
    let blogerId = window.location.href.split("/")[3];

    const getPost= async () =>  {
        const url = "http:"+props.access+":8080/"+blogerId+"/post/select/board?board="+props.board;
        const ajax = await fetch(url,{method:"Post"});
        const response = await ajax.json();
        setPost(response);
    }

    useEffect(() => {
        getPost();
    },[]);

    let printer=[];
    post.forEach((item) => {
        printer.push(
            <div className={"post_item "+props.loc+"_post"} key={item.post_id} id={props.loc+"_post_"+item.post_id}
                onClick={()=>{window.location.href="/post"+item.post_id}}>
                {item.post_title}
            </div>
        );
    });
    return(<div className="post">{printer}</div>);
}

export default Post;