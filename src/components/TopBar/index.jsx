import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useMatch } from "react-router-dom";

import "./styles.css";

import fetchModel from "../../lib/fetchModelData";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar() {
  const photoMatch = useMatch("/photos/:userId");
  const userMatch = useMatch("/users/:userId");
  const [userName, setUserName] = useState("");

  const userId = photoMatch?.params?.userId || userMatch?.params?.userId;

  useEffect(() => {
    if (!userId) {
      setUserName("");
      return undefined;
    }

    const loadTopBarUser = async () => {
      try {
        const data = await fetchModel(`/user/${userId}`);
        if (data) {
          setUserName(`${data.first_name} ${data.last_name}`);
        }
      } catch (error) {
        console.error("Failed to fetch topbar user:", error);
        setUserName("");
      }
    };

    loadTopBarUser();
  }, [userId]);

  let contextTitle = "";
  if (photoMatch && userName) {
    contextTitle = `Photos of ${userName}`;
  } else if (userMatch && userName) {
    contextTitle = `Info of ${userName}`;
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
