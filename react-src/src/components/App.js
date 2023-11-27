import React, { useEffect, useState } from 'react';
import '../css/App.css';
import Sidebar from './Sidebar';
import Home from './Home';
import Header from './Header';
import { Routes, Route } from 'react-router-dom';
import PostDetail from './PostDetail';

function App() {
  const [post, setPost] = useState([]);
  const getPost= async () =>  {
    const url = "http://localhost:8080/postid/select";
    const ajax = await fetch(url);
    const response = await ajax.json();
    setPost(response);
  }

  useEffect(() => {
    getPost();
  },[]);

  let printer=[];
  post.forEach((item) => {
    printer.push(
      <Route key={item.post_id} path={"post"+item.post_id} element={<PostDetail post_id={item.post_id}/>}/>
    );
  });
  
  return (
    <div className="App">
      <div className="wrapper">
        <Sidebar/>
        <div className='content'>
        <Header/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            {printer}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
