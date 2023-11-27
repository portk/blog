import React, { useState } from "react";
import SubReply from "./SubReply";

function Reply (props){
    const [reply, setReply] = useState([])

    const getReply = async () => {
        const url = "http://localhost:8080/reply/select/post?post="+props.post;
        const ajax = await fetch(url);
        const response = await ajax.json();
        setReply(response);
    }

    getReply();

    let printer=[]
    reply.forEach((item) => {
        printer.push(
            <div className="reply_item">
                <div className="writer">{item.writer}</div>
                <div className="context">{item.reply_context}</div>
                <div className="replyDate">{item.reply_date}</div>
                <SubReply replyId={item.reply_id} />
            </div>
            
        );
        
    })
    return(
        <div className="reply"></div>
    );
}

export default Reply;