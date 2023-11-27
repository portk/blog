import React, {Component} from 'react';
import Subject from './Subject';
import "../css/Sidebar.css"

class Sidebar extends Component {
    render(){
        return (
            <div className='sidebar'>
                <div className='icon'></div>
                <Subject subjectList={this.props.subject}/>
            </div>
        );
    }
}

export default Sidebar;