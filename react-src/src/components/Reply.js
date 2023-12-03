import React, { useEffect, useState } from "react";
import SubReply from "./SubReply";
import "../css/Reply.css"

function Reply (props){
    const [reply, setReply] = useState([])
    const blogerId=document.location.href.split("/")[3];

    const getReply = async () => {
        const url = "http:"+props.access+":8080/reply/select/post?post="+props.post;
        const ajax = await fetch(url,{method:"Post"});
        const response = await ajax.json();
        setReply(response);
    }

    const insertReply =  () => {
        let post, writer, context;
        context = document.querySelector("#replyInputContext").value;
        if( context !== "" ){
            post = props.post;
            writer = window.sessionStorage.getItem("userId");
            let baseUrl = "http:"+props.access+":8080/reply/insert?";
            let url = baseUrl+"post="+post+"&writer="+writer+"&context="+context;
            fetch(url,{method:"Post"});
            window.location.href="/"+blogerId+"/post"+props.post;
        } else {
            alert("내용을 입력하세요");
        }
    }

    const deleteReply = (id) => {
        if (window.confirm("댓글을 삭제하시겠습니까?")){
            let url = "http:"+props.access+":8080/reply/delete?id="+id;
            fetch(url,{method:"Post"});
            window.location.href="/"+blogerId+"/post"+props.post;
        }
    }

    const updateReplySend = async (id) => {
        let context = document.querySelector("#targetReply"+id);
        let url = "http:"+props.access+":8080/reply/update?id="+id+"&context="+context.value;
        fetch(url,{method:"Post"});
        window.location.href="/"+blogerId+"/post"+props.post;
    }

    const updateReply = (id) => {
        let targetReply = document.querySelector("#replyContext"+id);
        let button = document.querySelector("#replyModifyButton"+id);
        if (button.innerHTML === "수정"){
            targetReply.innerHTML = `<input type="text" id="targetReply${id}" value="${targetReply.innerHTML}"/>`;
            button.innerHTML = "저장";
        } else {
            updateReplySend(id);
            button.innerHTML = "수정";
        }
    }

    const insertSubReply = (sub_id) => {
        let post, writer, context;
        context = document.querySelector("#subReplyInputContext"+sub_id).value;
        if( context !== "" ){
            post = props.post;
            writer = window.sessionStorage.getItem("userId");
            let baseUrl = "http:"+props.access+":8080/reply/insertsub?";
            let url = baseUrl+"post="+post+"&writer="+writer+"&context="+context+"&sub_id="+sub_id;
            fetch(url,{method:"Post"});
            window.location.href="/"+blogerId+"/post"+props.post;
        } else {
            alert("내용을 입력하세요");
        }
    }

    const insertSubReplyReady = (sub_id) => {
        let target = document.querySelector("#inputSubReplyBox"+sub_id);
        if (target.innerHTML === ""){
            target.innerHTML=
                `<div class="insertSubReplyItem">
                    <textarea class="subReplyInputContext" id="subReplyInputContext${sub_id}"></textarea>
                    <button type="button" class="subReplyInputButton" id="subReplyInputButton${sub_id}">저장</button>
                </div>`;
            document.querySelector("#subReplyInputButton"+sub_id).addEventListener("click",()=>{insertSubReply(sub_id)});
        }else {
            target.innerHTML="";
        }
    }

    useEffect(() => {getReply();},[])

    let printer=[]
    reply.forEach((item) => {
        printer.push(
            <div className="replyItemBox" key={"replyItemBox"+item.reply_id}>
                <div className="replyItem" key={item.reply_id} id={"reply"+item.reply_id}>
                    <div className="replyWriter">{item.writer}</div>
                    <div className="replyContext" id={"replyContext"+item.reply_id}
                    onClick={()=>{insertSubReplyReady(item.reply_id);}}>
                        {item.reply_context}
                    </div>
                    <div className="dateTime">
                        <div className="date">{item.reply_date.slice(0,10)}</div>
                        <div className="time">{item.reply_date.slice(11,19)}</div>
                    </div>
                    <div className="replyButton">
                        <button type="button" id={"replyModifyButton"+item.reply_id} onClick={()=>{updateReply(item.reply_id)}}>수정</button>
                        <button type="button" onClick={()=>{deleteReply(item.reply_id)}}>삭제</button>
                    </div>
                </div>
                <SubReply post={props.post} reply_id={item.reply_id} access={props.access} blogerId={blogerId}/>
                <div className="subReplyItems" id={"inputSubReplyBox"+item.reply_id}>

                </div>
                <hr/>
            </div>
        );
        
    })
    return(
        <div className="reply">
            <div className="replyHeader">
                <div className="replyWriter">작성자</div>
                <div className="replyContext">댓글</div>
                <div className="dateTime">작성일</div>
                <div>댓글설정</div>
            </div>
            {printer}
            <div className="replyInputBox"><textarea id="replyInputContext"></textarea> <button type="button" id="replyInputButton" onClick={()=>{insertReply()}}>저장</button></div>
        </div>
    );
}

export default Reply;