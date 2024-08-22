import AddBlog from "./pages/AddBlog";
import AllBlogs from "./pages/AllBlogs";
import Home from "./pages/Home";
import BlogDetails from "./pages/BlogDetails";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
       <div className="flex flex-col min-h-screen">
      <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-blog" element={<AddBlog />} />
        <Route path="/blogs" element={<AllBlogs />} />
        <Route path="/blogs/:id" element={<BlogDetails />} /> 
      </Routes>
      <Footer/>
    </Router>
    </div>
    </>
  )
}