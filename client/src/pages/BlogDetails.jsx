import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // To toggle edit mode
  const [editedBlog, setEditedBlog] = useState({ title: '', subtitle: '', desc: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/blogs/${id}`);
        setBlog(response.data);
        setEditedBlog({
          title: response.data.title,
          subtitle: response.data.subtitle,
          desc: response.data.desc,
        });
      } catch (error) {
        console.error('Error fetching blog details', error);
      }
    };

    fetchBlog();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBlog({ ...editedBlog, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/v1/blogs/${id}`, editedBlog);
      setBlog(editedBlog);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating blog', error);
    }
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      {!isEditing ? (
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
            <h2 className="text-2xl font-medium text-gray-600 mb-6">{blog.subtitle}</h2>
          </div>
          <button onClick={handleEditClick} className="p-2">
          <svg class="feather feather-edit" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
        </div>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-lg font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={editedBlog.title}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="subtitle" className="block text-lg font-medium text-gray-700">
              Subtitle
            </label>
            <input
              type="text"
              name="subtitle"
              id="subtitle"
              value={editedBlog.subtitle}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="desc" className="block text-lg font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="desc"
              id="desc"
              rows="4"
              value={editedBlog.desc}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            ></textarea>
          </div>
          <div className="flex justify-center">
            <button type="submit" className="bg-black font-semibold text-white px-4 py-2 rounded-md mr-2">
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-200 text-black px-4 py-2 font-semibold rounded-md "
            >
              Cancel
            </button>
            
          </div>
        </form>
      )}
      {!isEditing && <p className="text-gray-800 leading-relaxed">{blog.desc}</p>}
    </div>
  );
};

export default BlogDetails;
