import { TextField, Button } from "@mui/material";

const ShowBlogCreationDetail = ({
  handleNewBlog,
  title,
  handleTitle,
  author,
  handleAuthor,
  url,
  handleUrl,
}) => {
  return (
    <div>
      {/* Then a part to create a new blog */}
      <h2>create new</h2>
      {/* Create a form for submitting a blog */}
      <form onSubmit={handleNewBlog}>
        {/* Title */}
        <TextField
          sx={{ width: "40%" }}
          variant="outlined"
          label="Title"
          value={title}
          onChange={handleTitle}
          size="small"
          margin="normal"
        />
        <br></br>
        {/* Author */}
        <TextField
          sx={{ width: "40%" }}
          variant="outlined"
          label="Author"
          value={author}
          onChange={handleAuthor}
          size="small"
          margin="normal"
        />
        <br></br>
        {/* URl */}
        <TextField
          sx={{ width: "40%" }}
          variant="outlined"
          label="Url"
          value={url}
          onChange={handleUrl}
          size="small"
          margin="normal"
        />
        <br></br>
        {/* And a button for creating the blog */}
        <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
          create
        </Button>
      </form>
    </div>
  );
};

export default ShowBlogCreationDetail;
