import { useParams } from "react-router-dom";

import { Typography, Button, Stack, Paper, TextField } from "@mui/material";
import styled from "styled-components";
import { useState } from "react";

const Box = styled(Paper)`
  padding: 1.5em;
  margin: 1em;
`;

const Blog = ({ blogs, onLike, onDelete, user, addComment }) => {
  // Find the blog based on the parames id
  const id = useParams().id;
  const blog = blogs.find((blog) => blog.id === id);
  const [comment, setComment] = useState("");

  if (!blog) {
    return <div>Blog not found</div>;
  }

  // Function for handling comment
  const handleComment = async () => {
    try {
      await addComment(id, comment);
      setComment("");
    } catch (error) {
      console.error(
        "Failed to add comment:",
        error.response?.data || error.message,
      );
    }
  };

  return (
    <Box elevation={3}>
      {/* First show it's title */}
      <Typography variant="h6">{blog.title}</Typography>

      {/* Then it's subtitle for it's author */}
      <Typography variant="subtitle1">by {blog.author}</Typography>

      {/* Then the url */}
      <Typography>
        <a href={blog.url}>{blog.url}</a>
      </Typography>
      <Typography>Added by {user?.name}</Typography>

      {/* The likes */}
      <Stack direction="row" spacing={2}>
        <Typography>{blog.likes} likes</Typography>
        {user && (
          <Button onClick={() => onLike(blog)} variant="outlined" size="small">
            like
          </Button>
        )}

        {blog?.user?.id === user?.id && (
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={() => {
              if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
                console.log(blog);
                console.log(blog.user.id);
                console.log(user.id);
                onDelete(blog.id);
              }
            }}
          >
            remove
          </Button>
        )}
      </Stack>

      {/* Now the comments input and button */}
      <Typography variant="h5">comments</Typography>
      <Stack direction="row" spacing={2} >
        <TextField
          value={comment}
          placeholder="add a comment"
          onChange={(event) => setComment(event.target.value)}
        />
        <Button variant="contained" onClick={handleComment}  >
          Add comment
        </Button>
      </Stack>

      {/* Display the comments if it's available */}
      {blog.comments?.map((comment, index) => (
        <ul key={index}>
          <li>
            <Typography>{comment}</Typography>
          </li>
        </ul>
      ))}
    </Box>
  );
};

export default Blog;
