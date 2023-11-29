import React from "react";
import "../css/BlogSetting.css";

function BlogSetting(props){
    return(
        <div className="blogSettingBoard">
            <div className="goSubjectSetting" onClick={()=>{window.location.href="/subjectsetting"}}>주제 목록 관리</div>
            <div className="goBoardSetting" onClick={()=>{window.location.href="/boardsetting"}}>게시판 목록 관리</div>
            <div className="goPostSetting" onClick={()=>{window.location.href="/postsetting"}}>게시글 목록 관리</div>
        </div>
    );
}

export default BlogSetting;