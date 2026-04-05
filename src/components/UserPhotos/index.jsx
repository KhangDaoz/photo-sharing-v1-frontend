import React, { useEffect, useState } from "react";
import {
  List,
  Divider,
  Typography,
  Grid,
  Avatar,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Button,
  Box,
  IconButton,
  Snackbar,
} from "@mui/material";

import "./styles.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import { useAdvancedFeatures } from "../../AdvancedFeaturesContext";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
  const { userId, photoId } = useParams();
  const navigate = useNavigate();
  const { advancedFeatures } = useAdvancedFeatures();

  const [user, setUser] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const loadPhotosPage = async () => {
      try {
        const userData = await fetchModel(`/user/${userId}`);
        const photosData = await fetchModel(`/photosOfUser/${userId}`);
        setUser(userData);
        setPhotos(photosData);
      } catch (error) {
        console.error("Failed to fetch photos page data:", error);
        setUser(null);
        setPhotos([]);
      }
    };

    loadPhotosPage();
  }, [userId]);

  // Tìm index của photo đang xem (cho advanced mode)
  const currentIndex = photos.findIndex((p) => p._id === photoId);

  // Khi advanced mode ON và có photoId trong URL → chỉ hiển thị 1 ảnh đó
  // Khi advanced mode ON nhưng không có photoId → redirect tới ảnh đầu tiên
  useEffect(() => {
    if (advancedFeatures && photos.length > 0 && !photoId) {
      navigate(`/photos/${userId}/${photos[0]._id}`, { replace: true });
    }
  }, [advancedFeatures, photos, photoId, userId, navigate]);

  // Khi tắt advanced mode → quay về danh sách tất cả ảnh
  useEffect(() => {
    if (!advancedFeatures && photoId) {
      navigate(`/photos/${userId}`, { replace: true });
    }
  }, [advancedFeatures, photoId, userId, navigate]);

  let linkToAuthor;
  if (user) {
    linkToAuthor = (
      <Link to={`/users/${user._id}`}>
        {`${user.first_name} ${user.last_name}`}
      </Link>
    );
  } else {
    linkToAuthor = <p>Loading...</p>;
  }

  // Copy link hiện tại vào clipboard
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setSnackbarOpen(true);
  };

  // === ADVANCED MODE: Hiển thị 1 ảnh + stepper ===
  if (advancedFeatures && photoId && photos.length > 0 && currentIndex !== -1) {
    const photo = photos[currentIndex];
    const isFirst = currentIndex === 0;
    const isLast = currentIndex === photos.length - 1;

    return (
      <Box>
        {/* Stepper bar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
            p: 1,
            borderRadius: 1,
            backgroundColor: "#f5f5f5",
          }}
        >
          <Button
            variant="outlined"
            disabled={isFirst}
            onClick={() =>
              navigate(`/photos/${userId}/${photos[currentIndex - 1]._id}`)
            }
          >
            ← Previous
          </Button>

          <Typography variant="body1">
            Photo {currentIndex + 1} of {photos.length}
          </Typography>

          <Button
            variant="outlined"
            disabled={isLast}
            onClick={() =>
              navigate(`/photos/${userId}/${photos[currentIndex + 1]._id}`)
            }
          >
            Next →
          </Button>
        </Box>

        {/* Photo card */}
        <Card variant="outlined">
          <CardHeader
            title={linkToAuthor}
            subheader={photo.date_time}
            avatar={
              <Avatar style={{ backgroundColor: "#FF7F50" }}>A</Avatar>
            }
            action={
              <Button size="small" onClick={handleCopyLink}>
                📋 Copy Link
              </Button>
            }
          />
          <CardMedia
            component="img"
            image={`/images/${photo.file_name}`}
            alt="Photo"
            sx={{ maxHeight: 500, objectFit: "contain" }}
          />
          <CardContent>
            {photo.comments && (
              <Typography variant="subtitle1">
                Comments:
                <Divider />
              </Typography>
            )}
            {photo.comments &&
              photo.comments.map((c) => (
                <List key={c._id}>
                  <Typography variant="subtitle2">
                    <Link to={`/users/${c.user._id}`}>
                      {`${c.user.first_name} ${c.user.last_name}`}
                    </Link>
                  </Typography>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    gutterBottom
                  >
                    {c.date_time}
                  </Typography>
                  <Typography variant="body1">{`"${c.comment}"`}</Typography>
                </List>
              ))}
          </CardContent>
        </Card>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={() => setSnackbarOpen(false)}
          message="Link copied!"
        />
      </Box>
    );
  }

  // === NORMAL MODE: Hiển thị tất cả ảnh (giữ nguyên code cũ) ===
  return photos ? (
    <Grid justifyContent="center" container spacing={3}>
      {photos.map((photo) => (
        <Grid item xs={6} key={photo._id}>
          <Card variant="outlined">
            <CardHeader
              title={linkToAuthor}
              subheader={photo.date_time}
              avatar={<Avatar style={{ backgroundColor: "#FF7F50" }}>A</Avatar>}
            />
            <CardMedia
              component="img"
              image={`/images/${photo.file_name}`}
              alt="Anthor Post"
            />
            <CardContent>
              {photo.comments && (
                <Typography variant="subtitle1">
                  Comments:
                  <Divider />
                </Typography>
              )}
              {/* Only when photo has comments, then display related comments */}
              {photo.comments &&
                photo.comments.map((c) => (
                  <List key={c._id}>
                    <Typography variant="subtitle2">
                      <Link to={`/users/${c.user._id}`}>
                        {`${c.user.first_name} ${c.user.last_name}`}
                      </Link>
                    </Typography>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      gutterBottom
                    >
                      {c.date_time}
                    </Typography>
                    <Typography variant="body1">{`"${c.comment}"`}</Typography>
                  </List>
                ))}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  ) : (
    <div>Loading...</div>
  );
}

export default UserPhotos;
