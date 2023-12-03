import React, { useEffect, useState } from "react";

function SubReply (props){
    const [subReply, setSubReply] = useState([])
    
    const getSubReply = async() => {
        const url = "http:"+props.access+":8080/reply/select/sub?sub="+props.reply_id;
        const ajax = await fetch(url,{method:"Post"});
        const response = await ajax.json();
        setSubReply(response);
    }

    const deleteSubReply = (id) => {
        if (window.confirm("댓글을 삭제하시겠습니까?")){
            let url = "http:"+props.access+":8080/reply/delete?id="+id;
            fetch(url,{method:"Post"});
            window.location.href="/"+props.blogerId+"/post"+props.post;
        }
    }

    const updateReplySend = async (id) => {
        let context = document.querySelector("#subReplyModifyButton"+id);
        let url = "http:"+props.access+":8080/reply/update?id="+id+"&context="+context.value;
        fetch(url,{method:"Post"});
        window.location.href="/"+props.blogerId+"/post"+props.post;
    }

    const updateReply = (id) => {
        let targetReply = document.querySelector("#replyContext"+id);
        let button = document.querySelector("#subReplyModifyButton"+id);
        if (button.innerHTML === "수정"){
            targetReply.innerHTML = `<input type="text" id="subReplyModifyButton${id}" value="${targetReply.innerHTML}"/>`;
            button.innerHTML = "저장";
        } else {
            updateReplySend(id);
            button.innerHTML = "수정";
        }
    }

    useEffect(() => {getSubReply();},[]);
    
    let sub=[];
    subReply.forEach(item => {
        sub.push(
            <div className="subReplyItem" key={item.reply_id} id={"reply"+item.reply_id}>
                <div className="subReplyWriter">{item.writer}</div>
                <div className="subReplyContext" id={"replyContext"+item.reply_id}>{item.reply_context}</div>
                <div className="dateTime">
                    <div className="subDate">{item.reply_date.slice(0,10)}</div>
                    <div className="subTime">{item.reply_date.slice(11,19)}</div>
                </div>
                <div className="subReplyButton">
                    <button type="button" id={"subReplyModifyButton"+item.reply_id} onClick={()=>{updateReply(item.reply_id)}}>수정</button>
                    <button type="button" onClick={()=>{deleteSubReply(item.reply_id)}}>삭제</button>
                </div>
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