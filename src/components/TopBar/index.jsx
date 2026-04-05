import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useMatch } from "react-router-dom";

import "./styles.css";

import models from "../../modelData/models";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar() {
  const photoMatch = useMatch("/photos/:userId");
  const userMatch = useMatch("/users/:userId");

  const userId = photoMatch?.params?.userId || userMatch?.params?.userId;
  const user = userId ? models.userModel(userId) : null;

  let contextTitle = "";
  if (photoMatch && user) {
    contextTitle = `Photos of ${user.first_name} ${user.last_name}`;
  } else if (userMatch && user) {
    contextTitle = `Info of ${user.first_name} ${user.last_name}`;
  }

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Typography variant="h5" color="inherit" sx={{ flexGrow: 1 }}>
          Dao Van Khang
        </Typography>
        <Typography variant="h5" color="inherit">
          {contextTitle}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
