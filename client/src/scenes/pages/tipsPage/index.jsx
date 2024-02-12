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
import WidgetWrapper from "components/WidgetWrapper";

// const axios = require('axios/dist/browser/axios.cjs');

const TipsPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)"); // Check if the screen width is greater than 1000px
  const { picturePath } = useSelector((state) => state.user); // Get the user's picture path from the Redux store
  const { isClient } = useSelector((state) => state.user); // Check if the user is a client
  const { palette } = useTheme(); // Get the theme palette
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  const user = useSelector((state) => state.user); // Get the user object from the Redux store
  const userId = user._id; // Get the user ID

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // async function handleSubmit(evt){
  //   evt.preventDefault();
  //   const data = await axios.post(`http://localhost:3001/tips/${question}`);
  //   console.log(JSON.stringify(data));
  //   setAnswer(data.data);
  // }

  async function handleSubmit(evt) {

    evt.preventDefault();
  
    try {
      const response = await fetch(`http://localhost:3001/tips/${question}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // If you need to send any data in the request body, you can include a body property:
        // body: JSON.stringify(yourDataObject),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(JSON.stringify(data));
      setAnswer(data);
    } catch (error) {
      console.error('Error:', error.message);
      // Handle the error as needed
    }
  }
  

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
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={picturePath} /> {/* Render the user widget component and pass the user ID and picture path as props */}


          {!isClient && (
            <Button
              onClick={() => navigate(`/createtip/${userId}`)} // Navigate to the create tip page for the current user
              sx={{
                color: palette.background.alt,
                backgroundColor: palette.primary.main,
                borderRadius: "0.7rem",
                fontSize: 15,
                width: "100%",
                mt: "2rem"
              }}
            >
              Add a tip
            </Button>
          )}

          <Box>
            <WidgetWrapper
              mt="3rem"
            >
              <h4 style={{textAlign: "center"}}>FixIT Assistant</h4>
              <form>
                <label className="form-label" htmlFor='txtQuestion' style={{marginTop: "1rem"}}>Please enter your question:</label>
                <input className="form-control" type="text" id='txtQuestion' name='txtQuestion' onChange={(evt) => setQuestion(evt.target.value)} />
                <Button 
                  onClick={(evt) => handleSubmit(evt)}
                  sx={{
                    color: palette.background.alt,
                    backgroundColor: palette.primary.main,
                    borderRadius: "0.7rem",
                    fontSize: 13,
                    width: "100%",
                    mt:"1.5rem",
                    mb:"1rem"
                  }}>
                    Ask AI
                  </Button>
                {answer && <Typography
                            variant="h5"
                            fontWeight="500"
                            sx={{ mt: "1rem", maxWidth: "100%", wordWrap: "break-word" }}
                          >
                            {answer}
                          </Typography>}
              </form>
            </WidgetWrapper>
          </Box>

        </Box>

        <Box
          width={isNonMobileScreens ? "47%" : undefined}
          mt={isNonMobileScreens ? "-30px" : "1.5rem"}
          ml={isNonMobileScreens ? "30px" : undefined}
        >
          <TipsWidget userId={userId}/> {/* Render the tips widget component and pass the user ID as a prop */}
        </Box>
      </Box>
    </Box>
  );
};

export default TipsPage;
