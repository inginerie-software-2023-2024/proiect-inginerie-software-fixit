import { Box, useMediaQuery, useTheme, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "components/navbar";
import { Typography } from "@mui/material";
import React from 'react';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import {  useEffect } from "react";
import { useDispatch} from "react-redux";
import PostWidget from "scenes/widgets/postWidgets/PostWidget";


const SavedPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)"); // Check if the screen width is greater than 1000px
  const { palette } = useTheme(); // Get the theme palette
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  const user = useSelector((state) => state.user); // Get the user object from the Redux store
  const userId = user._id; // Get the user ID
  const token = useSelector((state) => state.token);

  const [saves, setSaves] = useState(null);
  
  const getAllSavesUser = async () => {
    try {
      const response = await fetch(`http://localhost:3001/saves/${userId}/Save`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setSaves(data.reverse()); // Reverse the order of the array
    } catch (error) {
      console.error("Failed to fetch saves:", error);
    } 
  };
  useEffect(() => {
    getAllSavesUser();
  }, [userId]);

  return ( 
    <Box>
      <Navbar /> {/* Render the navbar component */}

      <Typography
          color={palette.neutral.dark}
          variant="h5"
          fontWeight="500"
          sx={{ mt: "3rem", mb: "1.5rem" }}
          textAlign="center"
        >
          Saved Posts
      </Typography>

      <Box
        display="grid"
        gridTemplateColumns="1fr"
        //padding="0 rem"
        justifyContent="center"
        padding={isNonMobileScreens ? "0 25%" : "0 10%"}
      >
        {Array.isArray(saves) &&
          saves.map(
            ({
              _id,
              userId,
              firstName,
              lastName,
              title,
              description,
              category,
              location,
              picturePath,
              userPicturePath,
              likes,
              comments,
            }) => (
                <PostWidget
                  postId={_id}
                  postUserId={userId}
                  name={`${firstName} ${lastName}`}
                  title={title}
                  description={description}
                  category={category}
                  location={location}
                  picturePath={picturePath}
                  userPicturePath={userPicturePath}
                  likes={likes}
                  comments={comments}
                />
            )
          )}
      </Box>
    </Box>
  );
};

export default SavedPage;
