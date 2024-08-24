import AddBlog from "./pages/AddBlog";
import { useState, useEffect } from "react";
import AllBlogs from "./pages/AllBlogs";
import Home from "./pages/Home";
import BlogDetails from "./pages/BlogDetails";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import axios from 'axios';

export default function App() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  // Fetch all blogs when the component mounts
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://zupay-al2k.vercel.app/api/v1/blogs');
        setBlogs(response.data);
        setFilteredBlogs(response.data); // Initially, filteredBlogs is the same as all blogs
      } catch (error) {
        console.error('Error fetching blogs', error);
      }
    };

    fetchBlogs();
  }, []);

  // Function to handle search and update filteredBlogs
  const handleSearch = (searchResults) => {
    if (searchResults.length > 0) {
      setFilteredBlogs(searchResults); // Update with search results
    } else {
      setFilteredBlogs(blogs); // If no search results, show all blogs
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Header handleSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-blog" element={<AddBlog />} />
          <Route path="/blogs" element={<AllBlogs blogs={filteredBlogs} />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}
