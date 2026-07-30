import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

const BlogList = ({ blogs }) => {
  if (!blogs.length) return <Typography variant="h3" sx={{ m: 3 }}>Loading Blogs...</Typography>

  return (
    <div>
      <Typography variant="h3" sx={{ m: 3 }}>
        blogs
      </Typography>

      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Typography component={Link} to={`/blogs/${blog.id}`}>
              {blog.title} by {blog.author}
            </Typography>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
