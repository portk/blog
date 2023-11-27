import React, { useEffect, useState } from "react";
import Post from "./Post";

function Board (props) {

    const [board, setBoard] = useState([])

    const getBoard = async () => {
        let url="http://localhost:8080/board/select/subject?subject="+props.subject;
        const ajax = await fetch(url);
        const response = await ajax.json();
        setBoard(response);
    }

    useEffect(() => {
        
        }
    )
    
    getBoard();

    const printer=[]
    board.forEach((item) => {
        printer.push(
            <div className="board_item" key={"board_"+item.board_id}>
                {item.board_name}
                <Post board={item.board_id}/>
            </div>
        );
    })
    return(
        <div className="board">
            {printer}
        </div>
    );
}
export default Board;