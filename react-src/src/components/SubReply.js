import React, { useState } from "react";

function SubReply (props){
    const [subReply, setSubReply] = useState([])
    
    const getSubReply = async() => {
        const url = "http:"+props.access+":8080/reply/select/sub?sub="+props.reply_id;
        const ajax = await fetch(url);
        const response = await ajax.json();
        setSubReply(response);
    }

    getSubReply();

    let sub=[];

    subReply.forEach(item => {
        sub.push(
            <div className="subReplyItem">
                <div className="writer">{item.writer}</div>
                <div className="context">{item.reply_context}</div>
                <div className="replyDate">{item.reply_date}</div>
            </div>
        );
    })


    return(
        <div className="subReply">
            {sub}
        </div>
    );
}

export default SubReply;