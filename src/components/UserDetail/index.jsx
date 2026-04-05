import React, { useState } from "react";
import { Button, Box, Grid, Typography } from "@mui/material";

import "./styles.css";
import { useParams, Link } from "react-router-dom";
import models from "../../modelData/models";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const { userId } = useParams();
  const user = models.userModel(userId);
  // console.log(user);
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
