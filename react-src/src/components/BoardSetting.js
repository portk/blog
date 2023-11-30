import React, { useEffect, useState } from "react";



function BoardSetting(props){
    const [board,setBoard] = useState();
    const [subject,setSubject] = useState();
    const getBoardData = async () => {
        let url="http:"+props.access+":8080/boardnsubject/select";
        const ajax = await fetch(url);
        const response = await ajax.json();
        setBoard(response);
    }
    const getSubjectList = async () => {
        let url="http:"+props.access+":8080/subject/select";
        const ajax = await fetch(url);
        const response = await ajax.json();
        setSubject(response);
    }

    const board_create_ready = () => {
        const box = document.querySelector(".board_add_ready");
        box.innerHTML=`
                        <div class='new_subject_number'> new </div>
                        <div class='select_board_subject'>
                            <select name="board_subject_select" id="board_subject_select">
                                ${subjectList}
                            </select>
                        </div>
                        <div class='new_board_name'>
                            <input type='text' id='createBoard'>
                        </div>
                        <div class='board_setting_buttons'>
                            <button class='board_add_send_button'>추가</button>
                            <button class='board_add_cancel_button'>취소</button>
                        </div>
                        `
        document.querySelector(".board_add_send_button").addEventListener("click",board_add_send);
        document.querySelector(".board_add_cancel_button").addEventListener("click",board_add_cancle);
    }
    const board_add_cancle = () => {
        const box = document.querySelector(".board_add_ready");
        box.innerHTML=""
    }

    const board_add_send = async() => {
        let name = document.querySelector("#createBoard").value;
        if (name !== ""){
            let subject = document.querySelector("#board_subject_select").value;
            let writer = window.sessionStorage.getItem("userId");
            let url = "http:"+props.access+":8080/board/insert?subject="+subject+"&writer="+writer+"&name="+name;
            const ajax = await fetch(url);
            const response = await ajax.text();
            alert(response);
            window.location.href="/boardsetting";
        } else {
            alert("게시판 이름을 입력하세요!");
        }
    }

    const board_delete = async (id) => {
        if(window.confirm("정말로 게시판을 삭제하시겠습니까?\n\n(하위 게시글들이 모두 지워집니다)")) {
            let url="http:"+props.access+":8080/board/delete?id="+id;
            const ajax = await fetch(url);
            const response = await ajax.text();
            alert(response);
            window.location.href="/boardsetting"
        }
    }

    const board_update_function = (board_id) => {
        let button = document.querySelector("#modify_board_button_"+board_id);
        if (button.innerHTML==="수정") {
            let subject = document.querySelector("#modify_board_subject_"+board_id);
            let name = document.querySelector("#modify_board_name_"+board_id);
            subject.innerHTML=`<select name="board_subject_select" id="board_update_subject">
                                ${subjectList}
                                </select>`;
            name.innerHTML=`<input type="text" name="name" id="board_update_name" value="${name.innerHTML}"/>`
            button.innerHTML="수정완료"
        } else {
            let id = board_id;
            let subject = document.querySelector("#board_update_subject").value;
            let name = document.querySelector("#board_update_name").value;
            let url = "http:"+props.access+":8080/board/update?id="+id+"&name="+name+"&subject="+subject;
            board_update_send(url);
            window.location.href="/boardsetting";
        }
    }

    const board_update_send = async (url) => {
        const ajax = await fetch(url);
        const response = await ajax.text();
        alert(response);
    }

    useEffect(()=>{getBoardData(); getSubjectList();
        document.querySelector('.topTitle').innerHTML="게시판 목록 관리";},[])

    let printer=[]
    if (board != null){
        board.forEach((item) => {
            printer.push(
                <div key={item.board_id} className="board_setting_item setting_item">
                    <div className="board_setting_id">{item.board_id}</div>
                    <div className="board_setting_subject" id={"modify_board_subject_"+item.board_id}>{item.subject_id}. {item.subject_name}</div>
                    <div className="board_setting_name" id={"modify_board_name_"+item.board_id}>{item.board_name}</div>
                    <div className="board_setting_buttons setting_buttons">
                        <button type="button" className="board_update" id={"modify_board_button_"+item.board_id}
                            onClick={()=>{board_update_function(item.board_id)}}>수정</button>
                        <button type="button" className="board_delete" onClick={()=>{board_delete(item.board_id)}}>삭제</button>
                    </div>
                </div>
            );
        });
    }

    let subjectList=[]
    if ( subject != null) {
        subject.forEach((item) => {
            subjectList.push(
                `<option value=${item.subject_id}>${item.subject_id}. ${item.subject_name}</option>`
            );
        });
    }

    return (
        <div className="boardList">
            <div className="settingListHeader">
                <div>번호</div>
                <div>주제명</div>
                <div>게시판명</div>
                <div>관리 <button type="button" onClick={()=>{board_create_ready()}}>추가</button></div>
            </div>
            <div className="board_add_ready add_ready"></div>
            <hr/>
            {printer}
        </div>
    );
}

export default BoardSetting;