import React, { useEffect, useState } from "react";

function SubjectSetting(props){
    const [subject,setSubject] = useState([])

    const getSubjectList = async () => {
        let url="http:"+props.access+":8080/subject/select";
        const ajax = await fetch(url);
        const response = await ajax.json();
        setSubject(response);
    }

    const deleteSubject = async (id) => {
        if(window.confirm("주제를 삭제하시겠습니까?\n\n(하위 게시판, 게시글이 모두 삭제됩니다.)")){
            let url="http:"+props.access+":8080/subject/delete?id="+id;
            const ajax = await fetch(url)
            const response = await ajax.text();
            alert(response);
        }
    }

    useEffect(()=>{getSubjectList()},[])

    let printer=[]
    if ( subject.length > 0){
        subject.forEach((item)=>{
            printer.push(
                <div key={item.subject_id} className="subject_setting_item">
                    <div className="subject_setting_id">{item.subject_id}</div>
                    <div className="subject_setting_name">{item.subject_name}</div>
                    <div className="subject_setting_buttons">
                        <button type="button" id="subject_update">수정</button>
                        <button type="button" id="subject_delete" onClick={()=>{deleteSubject(item.subject_id)}}>삭제</button>
                    </div>
                </div>)
        });
    }

    return (
        <div className="SubjectList">
            {printer}
        </div>
    );
    
}

export default SubjectSetting;