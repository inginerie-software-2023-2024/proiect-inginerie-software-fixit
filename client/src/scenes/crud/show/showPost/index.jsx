// Importing required dependencies and components
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from "@mui/icons-material";
import ReviewsIcon from "@mui/icons-material/Reviews";
import EditIcon from "@mui/icons-material/Edit";
import ClassIcon from "@mui/icons-material/Class";
import DateSelector from "./DateSelector"; 
import EventIcon from "@mui/icons-material/Event";
import { BookmarkBorderOutlined, BookmarkOutlined } from "@mui/icons-material";
import {
  Box,
  useMediaQuery,
  Typography,
  useTheme,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  Button,
  DialogContent,
  DialogActions,
  Rating,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import WidgetWrapper from "components/WidgetWrapper";
import Friend from "components/Friend";
import Navbar from "components/navbar";
import FlexBetween from "components/FlexBetween";
import { useNavigate } from "react-router-dom";
import { setPost } from "state";
import ReviewsWidget from "scenes/widgets/reviewWidgets/ReviewsWidget";
import { setReviews } from "state";

// Define the ShowPost component
const ShowPost = () => {
  const { postId } = useParams(); // Get the postId from the URL parameters
  console.log(postId);
  const currentPost = useSelector((state) =>
    state.posts.find((post) => post._id === postId)
  ); // Find the current post from the Redux state based on the postId

  const loggedInUserId = useSelector((state) => state.user._id); // Get the logged-in user's ID from the Redux state
  const isProfileUser = currentPost.userId === loggedInUserId; // Check if the current post belongs to the logged-in user
  const user = useSelector((state) => state.user); // Get the user object from the Redux state

  const token = useSelector((state) => state.token); // Get the token from the Redux state
  const navigate = useNavigate(); // Get the navigation function from react-router-dom
  const dispatch = useDispatch(); // Get the dispatch function from react-redux

  // State variables for review dialog
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewDescription, setReviewDescription] = useState("");

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)"); // Check if the screen size is larger than 1000px

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const primary = palette.primary.main;
  const primaryDark = palette.primary.dark;

  const location = useLocation();

  const likeCount = Object.keys(currentPost.likes).length; // Get the number of likes for the current post
  const isLiked = Boolean(currentPost.likes[loggedInUserId]); // Check if the logged-in user has liked the current post
  
  const allReviews = useSelector((state) => state.reviews);
  const [reviews, setReviewsState] = useState(allReviews);
  const hasReviews = reviews.length > 0;

  const [isSaved, setIsSaved] = useState(false);

// State variable for date selection
const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
const [selectedDate, setSelectedDate] = useState(null);
const [reviewAverage, setReviewAverage] = useState(0);
const [noReviews, setNoReviews] = useState(0);


  // Function to handle opening the date picker
  const handleOpenDatePicker = () => {
    setIsDatePickerOpen(true);
  };

  // Function to handle closing the date picker
  const handleCloseDatePicker = () => {
    setIsDatePickerOpen(false);
  };

  // Function to handle selecting a date
  const handleSelectDate = (date) => {
    setSelectedDate(date);
  };

  // Function to fetch the post from the server
  const getPost = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPost(data)); // Dispatch an action to update the post in the Redux state
  };

  // Function to handle the like button click
  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost })); // Dispatch an action to update the post in the Redux state
  };

  // Function to handle the opening of the review dialog
  const handleReviewDialogOpen = () => {
      setIsReviewDialogOpen(true);
  };

  // Function to handle the closing of the review dialog
  const handleReviewDialogClose = () => {
    setIsReviewDialogOpen(false);
    setReviewRating(0);
    setReviewDescription("");
  };

  // Function to handle the change of the review rating
  const handleReviewRatingChange = (value) => {
    setReviewRating(value);
  };

  // Function to handle the change of the review description
  const handleReviewDescriptionChange = (event) => {
    setReviewDescription(event.target.value);
  };

  // Function to handle the addition of a review
  const handleAddReview = async () => {
    if (reviewRating === 0 || reviewDescription === "") {
      return;
    }
    const response = await fetch(
      `http://localhost:3001/reviews/${loggedInUserId}/${postId}/create`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stars: reviewRating,
          description: reviewDescription,
        }),
      }
    );

    if (response.ok) {
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost })); // Dispatch an action to update the post in the Redux state
      setIsReviewDialogOpen(false);
      setReviewRating(0);
      setReviewDescription("");
      window.location.reload();
    }
  };

  const checkPostSaved = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/saves/${loggedInUserId}/${postId}/check`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.ok) {
        const isPostSaved = await response.json();
        setIsSaved(isPostSaved);
      }
    } catch (error) {
      console.error("Error checking if post is saved:", error);
    }
  };

  const handleSavePost = async () => {
    const response = await fetch(
      `http://localhost:3001/saves/${loggedInUserId}/${postId}/create`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      console.log('se salveaza');
      checkPostSaved();
    }
  };

  const getPostReviews = async () => {
    const response = await fetch(
      `http://localhost:3001/reviews/${postId}/postReviews`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setReviews({ reviews: data }));
    setReviewsState(data);

    var stars = 0;
    for (var i in data)
    { var obj = data[i];
      stars += parseInt(obj["stars"]);
    }

    var average = (stars / data.length).toFixed(1);

    setReviewAverage(average);
    setNoReviews(data.length);
  };

  useEffect(() => {
    // Fetch post whenever postId changes
    if (!currentPost) {
      getPost();
    }

    console.log(currentPost);
  }, [postId, location]);

  useEffect(() => {
    console.log("HEEEEEEEEEEEEEEY");
    getPostReviews();
    checkPostSaved();
    // Fetch the post reviews when the component mounts
  }, []);

  if (!currentPost) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Navbar />
  
      {/* The following code is responsible for rendering the post details */}
  
      <Box
        display="flex"
        flexDirection={isNonMobileScreens ? "row" : "column"}
        justifyContent={hasReviews ? "space-between" : "center"} // Center the post if there are no reviews
        alignItems={isNonMobileScreens ? "flex-start" : "center"}
        padding="2rem 6%"
        gap="2rem"
      >
        <Box width={isNonMobileScreens ? "60%" : "100%"}>
          {/* WidgetWrapper is a custom component used to wrap the post details */}

          <WidgetWrapper
            m="2rem 0"
            marginLeft={isNonMobileScreens ? "15px" : undefined}
            marginRight={isNonMobileScreens ? "15px" : undefined}
          >

            {/* Friend component displays the post author's details */}
            <Friend
              friendId={currentPost.userId}
              name={`${currentPost.firstName} ${currentPost.lastName}`}
              subtitle={currentPost.location}
              userPicturePath={currentPost.userPicturePath}
            />

            <FlexBetween gap="1rem" sx={{ width: "100%" }}>
              <FlexBetween gap="0.3rem">
              {/* Displaying the category of the post */}
                            <Typography
                              color={medium}
                              display="flex"
                              alignItems="center"
                              sx={{ mt: "1.3rem", mb: "5px" }}
                            >
                              <ClassIcon sx={{ color: main, mr: "8px" }} />
                              {currentPost.category
                                ? currentPost.category.charAt(0).toUpperCase() +
                                  currentPost.category.slice(1)
                                : ""}
                            </Typography>
              </FlexBetween>

              <FlexBetween gap="0.7rem">
                {
                  noReviews ?                 
                  <Box 
                bgcolor={primary}
                borderRadius = "5px"
                sx={{height:"25px", width:"45px", paddingRight:"12px", paddingTop:"2.5px"}}>
                  <Typography
                  color={main}
                  variant="h7"
                  fontWeight="bold"
                sx={{ display: "flex", justifyContent: "flex-end", width: "100%", wordWrap: "break-word", alignItems: "center" }}
                >
              {reviewAverage}
                </Typography>
                </Box>: null
                }


            </FlexBetween>
          </FlexBetween>

          <FlexBetween gap="1rem" sx={{ width: "100%" }}>
            <FlexBetween gap="0.3rem">
    {/* Displaying the title of the post */}
                <Typography
                  color={main}
                  variant="h5"
                  fontWeight="500"
                  sx={{
                    mt: "1.5rem",
                    mb: "0.80rem",
                    width: "100%",
                    wordWrap: "break-word",
                  }}
                >
                  {currentPost.title}
                </Typography>
            </FlexBetween>
  
            

            <FlexBetween gap="0.7rem">
              <ReviewsIcon>
              </ReviewsIcon>
              <Typography
                color={main}
                variant="h6"
                fontWeight="300"
                sx={{ display: "flex", justifyContent: "flex-end", width: "100%", wordWrap: "break-word", alignItems: "center" }}
                >
                {noReviews} reviews
                </Typography>
          
            </FlexBetween>
          </FlexBetween>

            
  
            {/* Displaying the picture associated with the post, if any */}
            {currentPost.picturePath && (
              <img
                width="100%"
                height="auto"
                alt="post"
                style={{
                  borderRadius: "0.75rem",
                  marginTop: "0.75rem",
                  marginBottom: "0.5rem",
                }}
                src={`http://localhost:3001/assets/${currentPost.picturePath}`}
              />
            )}
  
            {/* Displaying the description of the post */}
            <Typography
              color={main}
              marginBottom="5px"
              sx={{ mt: "1rem", width: "100%", wordWrap: "break-word" }}
            >
              {currentPost.description}
            </Typography>
  
            {/* A divider line to separate the post details from the reviews */}
            <Divider sx={{ mt: "1.2rem", mb: "1rem" }} />
  
            {/* Displaying the like count and an option to like the post */}
            <FlexBetween mt="0.25rem" mb="0.25rem">
              <FlexBetween gap="1rem">
                <FlexBetween gap="0.3rem">
                  {/* The like button */}
                  <IconButton onClick={handleSavePost} variant="contained">
                    {isSaved ? (
                      <BookmarkOutlined sx={{ color: primaryDark }} />
                    ) : (
                      <BookmarkBorderOutlined sx={{ color: primaryDark }} />
                    )}
                  </IconButton>
                  {/* <IconButton onClick={patchLike} sx={{ color: main }}>
                    {isLiked ? (
                      <FavoriteOutlined sx={{ color: main }} />
                    ) : (
                      <FavoriteBorderOutlined />
                    )}
                  </IconButton> */}
                  {/* Displaying the like count */}
                  {/* <Typography>{likeCount}</Typography> */}
                </FlexBetween>
  
                {/* Add review option available for client users */}
                {user.isClient === true && (
                  <FlexBetween gap="0.3rem">
                    
                    {/* The add review button */}
                    <IconButton
                      onClick={handleReviewDialogOpen}
                      sx={{ color: main }}
                      disabled={reviews.some(review => review.userId === loggedInUserId)}
                    >
                      <ChatBubbleOutlineOutlined />
                      <Typography sx={{ ml:"0.2rem "}}>
                        Add Review
                      </Typography>
                    </IconButton>
                  </FlexBetween>
                )}
              </FlexBetween>

              {/* Button to open the date picker */}
              {user.isClient === true && ( 
              <IconButton onClick={handleOpenDatePicker} variant="contained">
                <EventIcon />
              </IconButton>
              )}

              {/* Render the DateSelector component */}
              {user.isClient === true && (
              <DateSelector
                open={isDatePickerOpen}
                onClose={handleCloseDatePicker}
                onSelectDate={handleSelectDate}
                postId={postId}
              />
              )}
              
              {/* Edit post option available for the post owner */}
              {isProfileUser && (
                <IconButton
                  onClick={() => navigate(`/editpost/${postId}`)}
                  sx={{
                    color: main,
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  <EditIcon />
                </IconButton>
              )}
            </FlexBetween>
          </WidgetWrapper>
        </Box>
  
        {/* The following code is responsible for rendering the reviews */}
        {hasReviews && (
          <Box width={isNonMobileScreens ? "40%" : "100%"}>
            {/* ReviewsWidget component displays the reviews associated with the post */}
            <ReviewsWidget postId={postId} />
          </Box>
        )}
      </Box>
  
      {/* The following code is responsible for rendering the add review dialog */}
  
      <Dialog
        open={isReviewDialogOpen}
        onClose={handleReviewDialogClose}
        fullWidth
        maxWidth="sm"
      >
        {/* DialogTitle displays the title of the add review dialog */}
        <DialogTitle>Add Review</DialogTitle>
        <DialogContent>
          <Box display="flex" justifyContent="center" mb={2}>
            
            {/* Rating component allows users to select a rating for their review */}
            <Rating
              name="review-rating"
              value={reviewRating}
              onChange={(event, newValue) => {
                handleReviewRatingChange(newValue);
              }}
            />
          </Box>
          
          {/* TextField allows users to enter the review description */}
          <TextField
            autoFocus
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            placeholder="Write your review..."
            value={reviewDescription}
            onChange={handleReviewDescriptionChange}
          />
        </DialogContent>
        <DialogActions>

          {/* Cancel button to close the add review dialog */}
          <Button onClick={handleReviewDialogClose}>Cancel</Button>

          {/* Button to submit the review */}
          <Button onClick={handleAddReview} variant="contained">
            Add Review
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );  
};

export default ShowPost;
