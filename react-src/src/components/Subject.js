import React, { useEffect, useState } from "react";
import Board from "./Board";

function SideSubject(props) {
    
    const [subject,setSubject] = useState([])

    const getSubject = async () => { 
        const ajax = await fetch("http://localhost:8080/subject/select");
        const response = await ajax.json();
        setSubject(response);
    }

    useEffect(() => {
        getSubject();
        },[]
    )

    let print=[]
    subject.forEach(item => {
        print.push(
            <div key={item.subject_id} className={"subject_item "+props.loc+"_subject"} writer={item.writer} id={"board"+item.subject_id}>
                {item.subject_name}
                <Board subject={item.subject_id} loc={props.loc}/>
            </div>
        );
    });

    return(
        <div className={props.loc+"SubjectContainer"}>
            {print}
        </div>
    );
}

export default SideSubject;