import React, { useState } from "react";
import { Typography } from "@mui/material";

import "./styles.css";
import { useParams } from "react-router-dom";
import models from "../../modelData/models";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const [users, setUsers] = useState(models.userListModel());
  console.log(users);
  const user = useParams();
  console.log(models.userModel(user));
  return (
    <>
      {/* <Typography variant="body1">
            This should be the UserDetail view of the PhotoShare app. Since it is
            invoked from React Router the params from the route will be in property match.
            So this should show details of user: {user.userId}.
            You can fetch the model for the user from models.userModel.
          </Typography> */}
      <h1></h1>
    </>
  );
}

export default UserDetail;
