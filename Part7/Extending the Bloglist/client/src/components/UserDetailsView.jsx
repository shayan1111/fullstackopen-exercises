import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import userServices from "../services/users";

const UserDetailsView = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userServices.getAll();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error occured", error);
      }
    };
    fetchUsers();
  }, []);

  const paramId = useParams().id;

  const foundUser = users.find((u) => u.id === paramId);

  if (!foundUser)
    return (
      <Typography variant="h4" sx={{ m: 2 }}>
        Loading User...
      </Typography>
    );

  return (
    <Box sx={{ m: 2 }}>
      <Typography variant="h4">{foundUser.name}</Typography>
      {foundUser.blogs.length === 0 ? (
        <Typography>No blogs have been added</Typography>
      ) : (
        <div>
          <Typography variant="h5">added blogs</Typography>
          {foundUser.blogs.map((blog) => (
            <ul key={blog.id}>
              <li>
                <Typography>{blog.title}</Typography>
              </li>
            </ul>
          ))}
        </div>
      )}
    </Box>
  );
};

export default UserDetailsView;
