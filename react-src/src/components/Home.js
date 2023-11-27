import React from "react";
import "../css/Home.css";
import Subject from "./Subject"

function Home(props){
    return (
        <div className="Home">
            <div className="banner"></div>
            <Subject subjectList={props.subject} loc="home"/>
        </div>
    );
}

export default Home;