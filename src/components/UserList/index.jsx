import React, { useEffect, useState } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchModel("/user/list");
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch user list:", error);
      }
    };

    loadUsers();
  }, []);

  return (
    <div>
      {/* <Typography variant="body1">
          This is the user list, which takes up 3/12 of the window. You might
          choose to use <a href="https://mui.com/components/lists/">Lists</a>{" "}
          and <a href="https://mui.com/components/dividers/">Dividers</a> to
          display your users like so:
        </Typography> */}
      <List component="nav">
        {users.map((user) => (
          <>
            <ListItem
              to={`/users/${user._id}`}
              component={Link}
              key={user._id}
              divider
              button
            >
              <ListItemText primary={user.first_name} />
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
      {/* <Typography variant="body1">
        The model comes in from models.userListModel()
      </Typography> */}
    </div>
  );
}

export default UserList;
