import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import ClassIcon from "@mui/icons-material/Class";
import ReviewsIcon from '@mui/icons-material/Reviews';
import { BookmarkBorderOutlined, BookmarkOutlined } from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
  Button,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
  TextField,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import FriendOnPost from "components/FriendOnPost";
import WidgetWrapper from "components/WidgetWrapper";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import { setPosts } from "state";
import { useNavigate, useLocation } from "react-router-dom";

const PostWidgetProfile = ({
  postId,
  postUserId,
  name,
  title,
  description,
  category,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  // State variables
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewDescription, setReviewDescription] = useState("");
  const [reviews, setReviewsState] = useState([]);

  // Redux hooks
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const loggedInUserId = useSelector((state) => state.user._id);

  // Utility hooks
  const navigate = useNavigate();
  const { palette } = useTheme();
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const primaryDark = palette.primary.dark;
  const location2 = useLocation();

  // Check if the current user is the owner of the post
  const isProfileUser = postUserId === loggedInUserId;
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  // Check if the current user has liked the post
  const likeCount = Object.keys(likes).length;
  const isLiked = Boolean(likes[loggedInUserId]);

  const [reviewAverage, setReviewAverage] = useState(0);
  const [noReviews, setNoReviews] = useState(0);

  const [isSaved, setIsSaved] = useState(false);

  // Function to handle the like action on the post
  const patchLike = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${postId}/like`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      }
    );
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  // Open the review dialog
  const handleReviewDialogOpen = () => {
    setIsReviewDialogOpen(true);
  };

  // Close the review dialog and reset the review inputs
  const handleReviewDialogClose = () => {
    setIsReviewDialogOpen(false);
    setReviewRating(0);
    setReviewDescription("");
  };

  // Handle the change in the review rating
  const handleReviewRatingChange = (value) => {
    setReviewRating(value);
  };

  // Handle the change in the review description
  const handleReviewDescriptionChange = (event) => {
    setReviewDescription(event.target.value);
  };

  // Add a new review to the post
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
      dispatch(setPost({ post: updatedPost }));
      setIsReviewDialogOpen(false);
      setReviewRating(0);
      setReviewDescription("");
    }
  };

  // Open the delete confirmation dialog
  const handleDeleteConfirmationOpen = () => {
    setDeleteConfirmationOpen(true);
  };

  // Close the delete confirmation dialog
  const handleDeleteConfirmationClose = () => {
    setDeleteConfirmationOpen(false);
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

  // Delete the post
  const deletePost = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });

    if (response.ok) {
      const restPosts = await response.json();
      dispatch(setPosts({ posts: restPosts }));
      window.location.reload();
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
    var stars = 0;
    for (var i in data)
    { var obj = data[i];
      stars += parseInt(obj["stars"]);
    }

    var average = (stars / data.length).toFixed(1);

    setReviewAverage(average);
    setNoReviews(data.length);
    setReviewsState(data);
  };

  useEffect(() => {
    // Fetch the post reviews when the component mounts
    getPostReviews();
    checkPostSaved();
  }, []);

  return (
    <WidgetWrapper m="2rem 0">
      {/* Display the friend information */}
      <FriendOnPost
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />

      <FlexBetween gap="1rem" sx={{ width: "100%" }}>
        <FlexBetween gap="0.3rem">
                {/* Display the post title */}
                <Typography
                  color={main}
                  variant="h5"
                  fontWeight="500"
                  sx={{ mt: "1rem", width: "100%", wordWrap: "break-word" }}
                >
                  {title}
                </Typography>
              </FlexBetween>

      <FlexBetween gap="0.7rem">
        {
          noReviews ? <Box 
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
          </Box> : null
        }
        </FlexBetween>
      </FlexBetween>

      {/* Display the post category */}

      <FlexBetween gap="1rem" sx={{ width: "100%" }}>
        <FlexBetween gap="0.3rem">
          <Typography
                  color={medium}
                  display="flex"
                  alignItems="center"
                  sx={{ mt: "1.3rem", mb: "5px" }}
                >
                  <ClassIcon sx={{ color: main, mr: "8px" }} />
                  {category ? category.charAt(0).toUpperCase() + category.slice(1) : ""}
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
     

      {/* Display the post picture */}
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}

      {/* Display the post description */}
      <Box mt="1rem" sx={{ lineHeight: "1.5", wordWrap: "break-word" }}>
        {description}
      </Box>

      <Divider sx={{ my: "1.5rem" }} />

      {/* Display the like button */}
      <FlexBetween>
        <IconButton onClick={handleSavePost} variant="contained">
          {isSaved ? (
            <BookmarkOutlined sx={{ color: primaryDark }} />
          ) : (
            <BookmarkBorderOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
        {/* <IconButton
          size="small"
          onClick={patchLike}
          sx={{ color: isLiked ? primary : medium }}
        >
          {isLiked ? (
            <FavoriteOutlined fontSize="small" />
          ) : (
            <FavoriteBorderOutlined fontSize="small" />
          )}
        </IconButton> */}
        
        <>
          {user.isClient === true && (
            <FlexBetween gap="0.3rem">
              {/* Display the review button */}
              <IconButton 
                onClick={handleReviewDialogOpen}
                sx={{ color: medium }}
                disabled={reviews.some(review => review.userId === loggedInUserId)}
              >
                <ChatBubbleOutlineOutlined />
                <Typography sx={{ ml:"0.2rem "}}>
                  Add Review
                </Typography>
              </IconButton>
            </FlexBetween>
          )}

          {isProfileUser && (
            <>
              {/* Display the edit button for the profile user */}
              <IconButton
                size="small"
                onClick={() =>
                  navigate(`/editpost/${postId}`, {
                    state: { post: { postId } },
                  })
                }
                sx={{ color: medium }}
              >
                <EditIcon fontSize="small" />
              </IconButton>

              {/* Display the delete button for the profile user */}
              <IconButton
                size="small"
                onClick={handleDeleteConfirmationOpen}
                sx={{ color: main }}
              >
                <DeleteOutlined fontSize="small" />
              </IconButton>
            </>
           )}
        </>
      </FlexBetween>

      <Divider sx={{ mt: "1rem", mb: "1rem" }} />

      <Box marginTop="20px" marginBottom="10px" display="flex" justifyContent="center">
        <Button variant="contained" onClick={() => navigate(`/show/${postId}`)}>
          See the offer
        </Button>
      </Box>

      <Dialog open={deleteConfirmationOpen} onClose={handleDeleteConfirmationClose}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this post?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmationClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deletePost} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isReviewDialogOpen}
        onClose={handleReviewDialogClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add Review</DialogTitle>
        <DialogContent>
          <Box display="flex" justifyContent="center" mb={2}>
            <Rating
              name="review-rating"
              value={reviewRating}
              onChange={(event, newValue) => {
                handleReviewRatingChange(newValue);
              }}
            />
          </Box>
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
          <Button onClick={handleReviewDialogClose}>Cancel</Button>
          <Button onClick={handleAddReview} variant="contained">
            Add Review
          </Button>
        </DialogActions>
      </Dialog>
    </WidgetWrapper>
  );
};

export default PostWidgetProfile;
