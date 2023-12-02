import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SubjectSetting(props){
    const [subject,setSubject] = useState([]);
    const {blogerId} = useParams();

    const getSubjectList = async () => {
        let url="http:"+props.access+":8080/"+blogerId+"/subject/select";
        const ajax = await fetch(url,{method:"Post"});
        const response = await ajax.json();
        setSubject(response);
    }

    const getSubjectById = async (id,targetElement) => {
        let url="http:"+props.access+":8080/subject/select/id?id="+id
        const ajax = await fetch(url,{method:"Post"});
        const response = await ajax.json();
        targetElement.innerHTML = response[0].subject_name;
    }

    const deleteSubject = async (id) => {
        if(window.confirm("주제를 삭제하시겠습니까?\n\n(하위 게시판, 게시글이 모두 삭제됩니다.)")){
            let url="http:"+props.access+":8080/subject/delete?id="+id;
            const ajax = await fetch(url,{method:"Post"});
            const response = await ajax.text();
            alert(response);
            window.location.href="/"+blogerId+"/subjectsetting";
        }
    }

    const subject_update_send = async(id, value) => {
        let url="http:"+props.access+":8080/subject/update?id="+id+"&name="+value;
        const ajax = await fetch(url,{method:"Post"});
        const response = await ajax.text();
        alert(response);
    }

    const subject_update_function = (id) => {
        const name = document.querySelector("#modify_subject_name_"+id);
        const button = document.querySelector("#modify_subject_button_"+id);
        if (button.innerHTML === "수정"){
            button.innerHTML = "수정완료";
            name.innerHTML = "<input type='text' id='modify_subject_name_input_"+id+"' name='name' value='"+name.innerHTML+"'/>";
        } else {
            let textInputTag = document.querySelector("#modify_subject_name_input_"+id);
            button.innerHTML = "수정";

            subject_update_send(id, textInputTag.value);
            console.log(id);
            console.log("target : "+(id-1));
            getSubjectById(id,name);
            window.location.href="/"+blogerId+"/subjectsetting";
        }
    }

    const subject_create_ready = () => {
        const box = document.querySelector(".subject_add_ready");
        box.innerHTML=`<div class='new_subject_number'>new</div>
                        <div class='new_subject_name'>
                            <input type='text' id='createSubject'></div>
                        <div class='subject_setting_buttons'>
                            <button class='subject_add_send_button'>추가</button>
                            <button class='subject_add_cancel_button'>취소</button>
                        </div>`
        document.querySelector(".subject_add_send_button").addEventListener("click",subject_add_send);
        document.querySelector(".subject_add_cancel_button").addEventListener("click",subject_add_cancle);
    }

    const subject_add_cancle = () => {
        const box = document.querySelector(".subject_add_ready");
        box.innerHTML=""
    }

    const subject_add_send = async () => {
        let name = document.querySelector("#createSubject").value;
        if (name !== ""){
            let url = "http:"+props.access+":8080/subject/insert?&writer="+window.sessionStorage.getItem("userId")+"&name="+name;
            const ajax = await fetch(url,{method:"Post"});
            const response = await ajax.text();
            alert(response);
        } else{
            alert("주제를 입력하세요");
        }
        window.location.href="/"+blogerId+"/subjectsetting";
    }

    useEffect(()=>{getSubjectList();
        document.querySelector('.topTitle').innerHTML="주제 목록 관리";},[])

    let printer=[]
    if ( subject.length > 0){   
        subject.forEach((item)=>{
            printer.push(
                <div key={item.subject_id} className="subject_setting_item setting_item">
                    <div className="subject_setting_id">{item.subject_id}</div>
                    <div className="subject_setting_name" id={"modify_subject_name_"+item.subject_id}>{item.subject_name}</div>
                    <div className="subject_setting_buttons setting_buttons">
                        <button type="button" className="subject_update" id={"modify_subject_button_"+item.subject_id}
                            onClick={()=>{subject_update_function(item.subject_id)}}>수정</button>
                        <button type="button" className="subject_delete" onClick={()=>{deleteSubject(item.subject_id)}}>삭제</button>
                    </div>
                </div>
            )
        });
    }
    
    if (blogerId === window.sessionStorage.getItem("userId")){
        return (
            <div className="subjectList">
                <div className="settingListHeader">
                    <div className="subject_setting_id">번호</div>
                    <div className="subject_setting_name">주제명</div>
                    <div className="setting_buttons">관리 &nbsp; <button type="button" onClick={()=>{subject_create_ready()}}>추가</button></div>
                </div>
                <div className="subject_add_ready add_ready"></div>
                <hr/>
                {printer}
            </div>
        );
    } else{
        alert("본인 계정인 주소만 접속할 수 있습니다");
        window.location.href="/"+blogerId;
    }
    
}

export default SubjectSetting;