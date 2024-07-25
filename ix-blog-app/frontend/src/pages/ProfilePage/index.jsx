import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import blogsService from "../../services/blogsService";
import BlogGrid from "../../components/BlogGrid"; // Import BlogGrid component

export default function ProfilePage() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.id === userId) {
      setUser(storedUser);
    } else {
      console.error("User not found or ID mismatch");
    }

    // Fetch user's blogs
    const fetchUserBlogs = async () => {
      try {
        const response = await blogsService.fetchBlogsByAuthorId(storedUser.id);
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchUserBlogs();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{user.firstName} {user.lastName}</h1>
      <p>{user.bio}</p>
      {/* Add more user details as needed */}
      
      <h2>User's Blogs</h2>
      {blogs.length > 0 ? (
        <BlogGrid blogs={blogs} /> // Use BlogGrid component
      ) : (
        <p>No blogs found.</p>
      )}
    </div>
  );
}