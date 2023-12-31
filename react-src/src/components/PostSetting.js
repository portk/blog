import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PostSetting(props){
    const [posts, setPosts]=useState();
    const {blogerId} = useParams();

    const baseUrl = "http:"+props.access+":8080";

    const getPostData = async () => {
        let url=baseUrl+"/"+blogerId+"/post/select/all"
        const ajax = await fetch(url,{method:"Post"});
        const response = await ajax.json();
        setPosts(response);
    }

    const deletePostOnList = async (post_id) => {
            if (window.confirm("게시글을 정말로 삭제하시겠습니까?")) {
            let url=baseUrl+"/post/delete?id="+post_id;
            const ajax = await fetch(url,{method:"Post"});
            const response = await ajax.text();
            alert(response);
            window.location.href="/"+blogerId+"/postsetting";
        }
    }

    useEffect(()=>{getPostData();
                    document.querySelector('.topTitle').innerHTML="게시글 목록"},[]);

    let printer=[]
    if (posts != null){
        posts.forEach(item => {
            printer.push(
                <div key={item.post_id} className="post_setting_item setting_item">
                    <div className="post_setting_id">{item.post_id}</div>
                    <div className="post_setting_board" id={"modify_board_bard_"+item.post_id}>{item.board_id}. {item.board_name}</div>
                    <div className="post_setting_title" id={"modify_board_title_"+item.post_id} onClick={()=>{window.location.href="/post"+item.post_id}}>{item.post_title}</div>
                    <div className="post_setting_dateTime">
                        <div className="post_setting_date">{item.post_date.slice(0,10)}</div>
                        <div className="post_setting_time">{item.post_date.slice(11,19)}</div>
                    </div>
                    <div className="post_setting_buttons setting_buttons">
                        <button type="button" className="board_update" id={"modify_board_button_"+item.board_id}
                            onClick={()=>{window.location.href="/postdetailsetting/post"+item.post_id}}>수정</button>
                        <button type="button" className="board_delete" onClick={()=>{deletePostOnList(item.post_id);}}>삭제</button>
                    </div>
                </div>
            );
        });
    }
    
    if (blogerId === window.sessionStorage.getItem("userId")){
        return (
            <div className="postList">
                <div className="settingListHeader">
                    <div className="post_setting_id">번호</div>
                    <div className="post_setting_board">게시판</div>
                    <div className="post_setting_title">제목</div>
                    <div className="post_setting_dateTime">저장날짜</div>
                    <div className="setting_buttons">관리 &nbsp; <button type="button" onClick={()=>{window.location.href="/PostDetailSetting"}}>추가</button></div>
                </div>
                <div className="board_add_ready add_ready"></div>
                <hr/>
                {printer}
            </div>
        );
    } else{
        alert("본인 계정인 주소만 접속할 수 있습니다");
        window.location.href="/"+blogerId;
    }
}

export default PostSetting;