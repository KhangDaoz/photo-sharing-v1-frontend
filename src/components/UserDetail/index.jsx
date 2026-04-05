import React, { useEffect, useState } from "react";
import { Button, Box, Grid, Typography } from "@mui/material";

import "./styles.css";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetchModel(`/user/${userId}`);
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user detail:", error);
        setUser(null);
      }
    };

    loadUser();
  }, [userId]);

  return user ? (
    <Grid container>
      <Grid item xs={12}>
        <Typography color="textSecondary">Name:</Typography>
        <Typography variant="h6" gutterBottom>
          {`${user.first_name} ${user.last_name}`}
        </Typography>
        <Typography color="textSecondary">Location:</Typography>
        <Typography variant="h6" gutterBottom>
          {`${user.location}`}
        </Typography>
        <Typography color="textSecondary">Description:</Typography>
        <Typography variant="h6" gutterBottom>
          {`${user.description}`}
        </Typography>
        <Typography color="textSecondary">Occupation:</Typography>
        <Typography variant="h6" gutterBottom>
          {`${user.occupation}`}
        </Typography>
      </Grid>
      <Grid item xs={4} />
      <Grid item xs={4}>
        <Button
          size="large"
          to={user && `/photos/${user._id}`}
          component={Link}
          variant="contained"
          color="primary"
        >
          See Photos
        </Button>
      </Grid>
      <Grid item xs={4} />
    </Grid>
  ) : (
    <Box sx={{ minWidth: 300 }}>Loading...</Box>
  );
}

export default UserDetail;
