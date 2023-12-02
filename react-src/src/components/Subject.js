import React, { useEffect, useState } from "react";
import Board from "./Board";

function SideSubject(props) {
    
    const [subject,setSubject] = useState([])
    let blogerId = window.location.href.split("/")[3];

    const getSubject = async () => { 
        if (blogerId != null){
            const ajax = await fetch("http:"+props.access+":8080/"+blogerId+"/subject/select",{method:"Post"});
            const response = await ajax.json();
            setSubject(response);
        }
    }

    useEffect(() => {
        getSubject();
        },[]
    )

    let printer=[]

    if (props.loc === "side"){
        subject.forEach(item => {
            printer.push(
                <div key={item.subject_id} className={"subject_item "+props.loc+"_subject"} id={props.loc+"_board_"+item.subject_id}
                    onClick={()=> {props.transMode("board"); window.sessionStorage.setItem("sideSubject",item.subject_id);}}>
                    {item.subject_name}
                </div>
            );
        });   
    } else {
        subject.forEach(item => {
            printer.push(
                <div key={item.subject_id} className={"subject_item "+props.loc+"_subject"}>
                    {item.subject_name}
                    <Board subject={item.subject_id} loc={props.loc} access={props.access}/>
                </div>
            );
        }); 
    }
    return(
        <div className={props.loc+"SubjectContainer"}>
            {printer}
        </div>
    );
}

export default SideSubject;