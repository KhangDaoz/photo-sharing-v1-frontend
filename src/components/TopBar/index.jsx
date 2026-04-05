import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, FormControlLabel, Checkbox } from "@mui/material";
import { useMatch } from "react-router-dom";

import "./styles.css";

import fetchModel from "../../lib/fetchModelData";
import { useAdvancedFeatures } from "../../AdvancedFeaturesContext";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar() {
  // Thêm match cho route advanced (có photoId)
  const photoMatch = useMatch("/photos/:userId");
  const photoAdvancedMatch = useMatch("/photos/:userId/:photoId");
  const userMatch = useMatch("/users/:userId");
  const [userName, setUserName] = useState("");

  const { advancedFeatures, setAdvancedFeatures } = useAdvancedFeatures();

  const userId = photoAdvancedMatch?.params?.userId
    || photoMatch?.params?.userId
    || userMatch?.params?.userId;

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
  if ((photoMatch || photoAdvancedMatch) && userName) {
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

        {/* Checkbox bật/tắt Advanced Features */}
        <FormControlLabel
          control={
            <Checkbox
              checked={advancedFeatures}
              onChange={(e) => setAdvancedFeatures(e.target.checked)}
              sx={{ color: "white", "&.Mui-checked": { color: "white" } }}
            />
          }
          label={
            <Typography variant="body2" color="inherit">
              Enable Advanced Features
            </Typography>
          }
          sx={{ mr: 2 }}
        />

        <Typography variant="h5" color="inherit">
          {contextTitle}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
