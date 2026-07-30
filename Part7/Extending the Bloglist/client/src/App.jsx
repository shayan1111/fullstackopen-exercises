import { useEffect } from "react";
import { Container, AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { getUser, saveUser, removeUser } from "./services/persistentUser";
import useField from "./hooks/useField";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./App.css";

import Blog from "./components/Blog";
import BlogList from "./components/BlogList";
import ErrorBoundary from "./components/ErrorBoundary";
import LoginView from "./components/LoginView";
import Notification from "./components/Notification";
import PageNotFound from "./components/PageNotFound";
import ShowBlogCreationDetail from "./components/ShowBlogCreationDetail";
import UsersView from "./components/UsersView";
import UserDetailsView from "./components/UserDetailsView";

import { useNotificationSetNotification } from "./store/notificationStore";
import { useBlogs } from "./store/blogStore";
import { useBlogActions } from "./store/blogStore";
import { useUser, useUserSetUser, useUserLogout } from "./store/userStore";

const App = () => {
  const { fetchBlogs, createBlog, updateBlog, deleteBlog, addComment } =
    useBlogActions();
  const blogs = useBlogs();

  const user = useUser();
  const setUser = useUserSetUser();
  const logout = useUserLogout();

  const setNotification = useNotificationSetNotification();

  const username = useField("text");
  const password = useField("password");
  const title = useField("text");
  const author = useField("text");
  const url = useField("url");

  const navigate = useNavigate();

  // Sort the blogs by their likes in DESC order
  const sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes);

  // Update the blogs while booting
  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // Also remember the logged in users even after refresh
  useEffect(() => {
    const loggedInUser = getUser();
    if (loggedInUser) {
      setUser(loggedInUser);
      blogService.setToken(loggedInUser.token);
    }
  }, [setUser]);

  // Handle the Login
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loggedInUser = await loginService.login({
        username: username.value,
        password: password.value,
      });
      blogService.setToken(loggedInUser.token);
      setUser(loggedInUser);
      saveUser(loggedInUser);
      username.resetValue();
      password.resetValue();
      navigate("/"); // After logging in, navigate to the main page
    } catch (error) {
      setNotification("wrong username or password", "error");
      setTimeout(() => {
        setNotification("", "");
      }, 5000);
      username.resetValue();
      password.resetValue();
    }
  };

  // Handle the Logout
  const handleLogout = (event) => {
    event.preventDefault();
    removeUser();
    blogService.setToken(null);

    logout();
    navigate("/"); // After logout, display a list of blogs
  };

  // Handle creating a blog
  const handleNewBlog = async (event) => {
    try {
      event.preventDefault();
      // Create a new object for the new blog
      const newBlog = {
        title: title.value,
        author: author.value,
        url: url.value,
        user: user.id,
      };

      // Send to backend and add to the list
      await createBlog(newBlog);

      // Show a message if it was a success
      setNotification(
        `a new blog "${title.value}" by ${author.value} added`,
        "success",
      );
      setTimeout(() => {
        setNotification("", "");
      }, 5000);

      // Clear the inputs
      title.resetValue();
      author.resetValue();
      url.resetValue();

      navigate("/");
    } catch (error) {
      // Add a warning message
      setNotification(error.message, "error");
      setTimeout(() => {
        setNotification("", "");
      }, 5000);
      // Clear the inputs
      title.resetValue();
      author.resetValue();
      url.resetValue();
    }
  };

  // update the blog's likes
  const handleLike = async (blog) => {
    await updateBlog(blog);
  };

  const onDelete = async (idToDelete) => {
    console.log("Deleting blog id:", idToDelete);
    try {
      await deleteBlog(idToDelete);
      navigate("/");
    } catch (err) {
      setNotification(err.message, "error");
      setTimeout(() => {
        setNotification("", "");
      }, 5000);
    }
  };

  return (
    <Container>
      <div>
        <AppBar position="static">
          <Toolbar>
            {/* First the text on left side */}
            <Typography sx={{ flexGrow: 1 }}>Blog App</Typography>

            {/* Then the buttons on the right side */}
            <Button color="inherit" component={Link} to="/">
              Blogs
            </Button>
            <Button color="inherit" component={Link} to="/users">
              Users
            </Button>
            <Button color="inherit" component={Link} to="/create">
              New blog
            </Button>
            {user ? (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
        {/* Then display the notification */}
        <Notification />

        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<BlogList blogs={sortedBlogs} />} />

            <Route
              path="/blogs/:id"
              element={
                <Blog
                  blogs={sortedBlogs}
                  onLike={handleLike}
                  onDelete={onDelete}
                  addComment={addComment}
                  user={user}
                />
              }
            />

            <Route path="/users" element={<UsersView />} />

            <Route path="/users/:id" element={<UserDetailsView />} />

            <Route
              path="/create"
              element={
                <ShowBlogCreationDetail
                  handleNewBlog={handleNewBlog}
                  title={title.value}
                  handleTitle={title.onChange}
                  author={author.value}
                  handleAuthor={author.onChange}
                  url={url.value}
                  handleUrl={url.onChange}
                />
              }
            />

            <Route
              path="/login"
              element={
                <LoginView
                  username={username.value}
                  password={password.value}
                  handleUsername={username.onChange}
                  handlePassword={password.onChange}
                  handleLogin={handleLogin}
                />
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </ErrorBoundary>
      </div>
    </Container>
  );
};

export default App;
