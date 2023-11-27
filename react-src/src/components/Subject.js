import React, { useEffect, useState } from "react";
import Board from "./Board";

function SideSubject() {
    
    const [subject,setSubject] = useState([])

    const getSubject = async () => { 
        const ajax = await fetch("http://localhost:8080/subject/select");
        const response = await ajax.json();
        setSubject(response);
    }

    useEffect(() => {
        
        }
    )
    
    getSubject();

    let print=[]
    subject.forEach(item => {
        print.push(
            <div key={item.subject_id} className="subject_item" writer={item.writer}>
                {item.subject_name}
                <Board subject={item.subject_id}/>
            </div>
        );
    });

    return(
        <div className="subject">
            {print}
        </div>
    );
}

export default SideSubject;