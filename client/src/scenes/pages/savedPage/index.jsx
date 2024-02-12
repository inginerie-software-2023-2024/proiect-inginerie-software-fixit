import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "components/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import TipsWidget from "scenes/widgets/tipWidgets/TipsWidget";
import { Button, Typography } from "@mui/material";
import React from 'react';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import {  useEffect } from "react";
import { useDispatch} from "react-redux";
import WidgetWrapper from "components/WidgetWrapper";

// const axios = require('axios/dist/browser/axios.cjs');

const SavedPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)"); // Check if the screen width is greater than 1000px
  const { picturePath } = useSelector((state) => state.user); // Get the user's picture path from the Redux store
  const { isClient } = useSelector((state) => state.user); // Check if the user is a client
  const { palette } = useTheme(); // Get the theme palette
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  const user = useSelector((state) => state.user); // Get the user object from the Redux store
  const userId = user._id; // Get the user ID
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
 

  const [saves, setSaves] = useState(null);
  
  const getAllSavesUser = async () => {
    try {
      const response = await fetch(`http://localhost:3001/saves/${userId}/Save`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      console.log(data);
      setSaves(data);
    } catch (error) {
      console.error("Failed to fetch saves:", error);
    } 
  };
  useEffect(() => {
    getAllSavesUser();
    console.log(saves);
  }, [ userId]);

  return ( 
    <Box>
      <Navbar /> {/* Render the navbar component */}
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"} // Set the display property based on the screen size
        gap="2rem"
        justifyContent="center"
      >

      </Box>
    </Box>
  );
};

export default SavedPage;
