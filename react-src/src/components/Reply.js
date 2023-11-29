import React, { useEffect, useState } from "react";
import SubReply from "./SubReply";
import "../css/Reply.css"

function Reply (props){
    const [reply, setReply] = useState([])

    const getReply = async () => {
        const url = "http:"+props.access+":8080/reply/select/post?post="+props.post;
        const ajax = await fetch(url);
        const response = await ajax.json();
        setReply(response);
    }

    useEffect(() => {getReply();},[])
    

    let printer=[]
    reply.forEach((item) => {
        printer.push(
            <div className="replyItem" key={item.reply_id} id={"reply"+item.reply_id}>
                <div className="replyWriter">{item.writer}</div>
                <div className="replyContext">{item.reply_context}</div>
                <div className="dateTime">
                    <div className="date">{item.reply_date.slice(0,10)}</div>
                    <div className="time">{item.reply_date.slice(11,19)}</div>
                </div>
                <SubReply replyId={item.reply_id} access={props.access}/>
            </div>
        );
        
    })
    return(
        <div className="reply">
            {printer}
        </div>
    );
}

export default Reply;