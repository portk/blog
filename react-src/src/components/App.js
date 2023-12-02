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
import PostDetailSetting from './PostDetailSetting';

function App() {
  const [post, setPost] = useState([]);
  let access = "";
  if (access === ""){
    access = window.location.href.split(":")[1];
  }

  const getPost= async () =>  {
    const url = "http:"+access+":8080/postid/select";
    const ajax = await fetch(url,{method:"POST"});
    const response = await ajax.json();
    setPost(response);
  }

  useEffect(() => {
    getPost();
  },[]);
  
  let postRead=[];
  post.forEach((item) => {
    postRead.push(
      <Route key={item.post_id} path={"/post"+item.post_id} element={<PostDetail post_id={item.post_id} access={access}/>}/>
    );
  });
  
  let postSetting=[];
  post.forEach((item) => {
    postSetting.push(
      <Route key={"postSetting"+item.post_id} path={"/postdetailsetting/post"+item.post_id} element={<PostDetailSetting access={access} post_id={item.post_id}/>}/>
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
              <Route path="/:blogerId" element={<Home access={access}/>}/>
              {postRead}
              <Route path="/:blogerId/accountsetting" element={<AccountSetting access={access}/>}/>
              <Route path="/:blogerId/blogsetting" element={<BlogSetting access={access} />}/>
              <Route path="/:blogerId/subjectsetting" element={<SubjectSetting access={access} />}/>
              <Route path="/:blogerId/boardsetting" element={<BoardSetting access={access} />}/>
              <Route path="/:blogerId/postsetting" element={<PostSetting access={access} />}/>
              <Route path="/PostDetailSetting" element={<PostDetailSetting access={access}/>}/>
              {postSetting}
            </Routes>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
