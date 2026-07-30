import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userServices from "../services/users";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const UsersView = () => {
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

  if (!users.length) return <Typography variant="h5" sx={{ m: 2 }} >Loading Users...</Typography>
  
  return (
    <Box sx={{ m: 2 }}>
      <Typography variant="h5">Users</Typography>
      <TableContainer>
        <Table>
          {/* First it's header */}
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell align="left">Blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Then the users */}
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell align="left">
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell align="left">{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UsersView;
