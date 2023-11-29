import React, { useEffect, useState } from 'react';
import '../css/App.css';
import Sidebar from './Sidebar';
import Home from './Home';
import Header from './Header';
import { Routes, Route } from 'react-router-dom';
import PostDetail from './PostDetail';
import SignIn from './SignIn';
import SignUp from './SignUp';
import AccountSetting from './AccountSetting';
import BlogSetting from './BlogSetting';
import SubjectSetting from './SubjectSetting';
import BoardSetting from './BoardSetting';
import PostSetting from './PostSetting';

function App() {
  const [post, setPost] = useState([]);
  let access = "";
  if (access === ""){
    access = window.location.href.split(":")[1];
  }

  const getPost= async () =>  {
    const url = "http:"+access+":8080/postid/select";
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
      <Route key={item.post_id} path={"post"+item.post_id} element={<PostDetail post_id={item.post_id} access={access}/>}/>
    );
  });
  
  if (sessionStorage.getItem("userCode") === null || sessionStorage.getItem("userNickname") === null){
    return (
      <Routes>
        <Route path="/" element={<SignIn access={access}/>}/>
        <Route path="/signup" element={<SignUp access={access}/>}/>
      </Routes>
    )
  } else {
    return (
      <div className="App">
        <div className="wrapper">
          <Sidebar access={access}/>
          <Header access={access}/>
          <div className='content'>
            <Routes>
              <Route path="/" element={<Home access={access}/>}/>
              {printer}
              <Route path="/accountsetting" element={<AccountSetting access={access}/>}/>
              <Route path="/blogsetting" element={<BlogSetting access={access} />}/>
              <Route path="/subjectsetting" element={<SubjectSetting access={access} />}/>
              <Route path="/boardsetting" element={<BoardSetting access={access} />}/>
              <Route path="/postsetting" element={<PostSetting access={access} />}/>
            </Routes>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
