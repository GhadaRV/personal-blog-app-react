import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login.js';
import SignUp from './pages/SignUp';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import PostForm from './pages/PostForm';
import Navbar from './components/Navbar'; // Adjust the path if needed



function App() {
  return (
    <Router>
      <Navbar /> {/* Add Navbar here */}
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/bloglist" element={<BlogList />} />
          <Route path="/posts/:id" element={<BlogPost />} />
          <Route path="/posts/create" element={<PostForm mode="create" />} />
          <Route path="/posts/edit/:id" element={<PostForm mode="edit" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
