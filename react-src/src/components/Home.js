import React, { useEffect } from "react";
import "../css/Home.css";
import Subject from "./Subject"

function Home(props){
    useEffect(()=>{
        document.querySelector(".banner").style.backgroundImage='url("http:'+props.access+':8080/img/banner.png")'
    })
    return (
        <div className="Home">
            <div className="banner"></div>
            <Subject subjectList={props.subject} loc="home" access={props.access}/>
        </div>
    );
}

export default Home;