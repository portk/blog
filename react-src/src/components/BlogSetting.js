import React from "react";
import "../css/BlogSetting.css";
import { useParams } from "react-router-dom";

function BlogSetting(){
    const {blogerId} = useParams();
    
    if (blogerId === window.sessionStorage.getItem("userId")){
        return(
            <div className="blogSettingBoard">
                <div className="goSubjectSetting" onClick={()=>{window.location.href="/"+blogerId+"/subjectsetting"}}>주제 목록 관리</div>
                <div className="goBoardSetting" onClick={()=>{window.location.href="/"+blogerId+"/boardsetting"}}>게시판 목록 관리</div>
                <div className="goPostSetting" onClick={()=>{window.location.href="/"+blogerId+"/postsetting"}}>게시글 목록 관리</div>
            </div>
        );
    } else{
        alert("본인 계정인 주소만 접속할 수 있습니다");
        window.location.href="/"+blogerId;
    }
}

export default BlogSetting;