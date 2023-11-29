import React, { useEffect, useState } from "react";
import Board from "./Board";

function SideSubject(props) {
    
    const [subject,setSubject] = useState([])

    const getSubject = async () => { 
        const ajax = await fetch("http:"+props.access+":8080/subject/select");
        const response = await ajax.json();
        setSubject(response);
    }

    useEffect(() => {
        getSubject();
        },[]
    )

    let printer=[]

    if (props.loc === "side"){
        subject.forEach(item => {
            printer.push(
                <div key={item.subject_id} className={"subject_item "+props.loc+"_subject"} writer={item.writer} id={props.loc+"_board_"+item.subject_id}
                    onClick={()=> {props.transMode("board"); window.sessionStorage.setItem("sideSubject",item.subject_id);}}>
                    {item.subject_name}
                </div>
            );
        }); 
        return(
            <div className={props.loc+"SubjectContainer"}>
                {printer}
            </div>
        );
    }else{
        subject.forEach(item => {
            printer.push(
                <div key={item.subject_id} className={"subject_item "+props.loc+"_subject"} writer={item.writer}>
                    {item.subject_name}
                    <Board subject={item.subject_id} loc={props.loc} access={props.access}/>
                </div>
            );
        }); 
        return(
            <div className={props.loc+"SubjectContainer"}>
                {printer}
            </div>
        );
    }
}

export default SideSubject;