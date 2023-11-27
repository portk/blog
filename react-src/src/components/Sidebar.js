import React, {Component} from 'react';
import Subject from './Subject';
import "../css/Sidebar.css"

class Sidebar extends Component {
    componentDidMount(){
        document.querySelector(".icon").addEventListener("click",() => { window.location.href="/" })
    }
    render(){
        return (
            <div className='sidebar'>
                <div className='icon'></div>
                <Subject subjectList={this.props.subject} loc="side"/>
            </div>
        );
    }
}

export default Sidebar;