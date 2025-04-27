import React, { useState } from 'react';
import API from '../api';

const AdminDashboard = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      await API.post('/posts', { title, content });
      alert('Post created successfully!');
      setTitle('');
      setContent('');
    } catch (err) {
      alert('Post creation failed! Only admin can create.');
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <form onSubmit={handleCreatePost}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default AdminDashboard;
