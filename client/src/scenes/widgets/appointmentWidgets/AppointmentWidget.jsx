import {
    DeleteOutlined,
  } from "@mui/icons-material";
  import StarIcon from '@mui/icons-material/Star';
  import StarBorderIcon from '@mui/icons-material/StarBorder';
  import { useEffect } from "react";
  import { format } from "date-fns"; 
  import { CheckCircle, HourglassEmpty, Cancel } from "@mui/icons-material";
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
    Icon
  } from "@mui/material";
  import FlexBetween from "components/FlexBetween";
  import WidgetWrapper from "components/WidgetWrapper";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setReviews } from "state";
  import { useNavigate, useLocation } from "react-router-dom";
  import FriendOnPost from "components/FriendOnPost";
  import { setAppointments } from "state";
  import { Event, AccessTime, LocationOn, Description } from '@mui/icons-material';
  
  const AppointmentWidget = ({
    appointmentId,
    postId,
    description,
    location,
    date,
    time,
    isAccepted,
    isRefused,
  }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const formattedDate = format(new Date(date), "dd/MM/yyyy");
    // Get the theme from MUI's useTheme hook
    const { palette } = useTheme();
    const main = palette.colors.black;
    const background = palette.appointment.background;
    const icon = palette.appointment.icon;
  
    // Local state and variable declarations
    const userId = null;
    const [user, setUser] = useState({});
    const loggedInUserId = useSelector((state) => state.user._id);
  
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  
    // Get the current location and check if it's a non-mobile screen using MUI's useMediaQuery hook
    const location2 = useLocation();
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  
    // Event handler for opening the delete confirmation dialog
    const handleDeleteConfirmationOpen = () => {
      setDeleteConfirmationOpen(true);
    };
  
    // Event handler for closing the delete confirmation dialog
    const handleDeleteConfirmationClose = () => {
      setDeleteConfirmationOpen(false);
    };
  
    // Delete the review
    const deleteAppointment = async () => {
      const response = await fetch(`http://localhost:3001/appointments/${appointmentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId }),
      });
      if (response.ok) {
        handleDeleteConfirmationClose();
  
        // Update the Redux store with the remaining reviews
        const restAppointments = await response.json();
        dispatch(setAppointments(restAppointments));
        
        // Reload the page
        window.location.reload();
      }
    };
  
    // Fetch the user data associated with the review
    const getUser = async () => {
      try {
        const response = await fetch(`http://localhost:3001/posts/${postId}/user`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          
          setUser(data);
        } else {
          throw new Error("Error fetching user data");
        }
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };
  
    // Fetch the user data when the component mounts or when userId or token changes
    useEffect(() => {
      getUser();
    }, []);
  
    return (
      <Box >
        {/* Your existing code */}
        <WidgetWrapper sx={{ backgroundColor: {background} }} m="2rem 0" ml={isNonMobileScreens ? "15px" : undefined} mr={isNonMobileScreens ? "15px" : undefined }>
        <FlexBetween>
          <FriendOnPost
            friendId={user._id}
            name={`${user.firstName} ${user.lastName}`}
            subtitle={user.location}
            userPicturePath={user.picturePath}
          />
          {/* Conditionally render the checkmark or pending icon */}
          {isAccepted && 
            <CheckCircle sx={{ color: 'green', fontSize: 32 }} />}
          {!isAccepted && !isRefused &&
            <HourglassEmpty sx={{ color: 'orange', fontSize: 32 }} />}
          {isRefused && (
            <Cancel sx={{ color: 'red', fontSize: 32 }} />
          )}
        </FlexBetween>

        <Divider sx={{ mt: "1.6rem", mb: "1rem" }} />

        <FlexBetween mt="1rem" sx={{ flexDirection: "column", lineHeight: "1.5", wordWrap: "break-word" }}>
          {/* Render the appointment details */}
          <Typography color={icon} marginBottom="5px" sx={{ mt: "0.5rem", wordWrap: "break-word", display: "flex", alignItems: 'center' }}>
            <Icon component={Event} sx={{ mr:"0.5rem" }}/> {formattedDate}
            <Icon component={AccessTime} sx={{ ml: "1.1rem", mr:"0.4rem" }}/> {time}
          </Typography>
          <Typography color={icon} marginBottom="5px" sx={{ mt: "0.3rem", wordWrap: "break-word", display: "flex", alignItems: "center" }}>
            <Icon component={LocationOn} sx={{ mr:"0.4rem" }}/> {location}
          </Typography>
          <Typography color={icon} marginBottom="5px" sx={{ mt: "3rem", mb: "1rem", wordWrap: "break-word", display: "flex", alignItems: "center" }}>
            {description}
          </Typography>
        </FlexBetween>

        <Divider sx={{ mt: "1rem", mb: "1rem" }} />

        <Box
          display="flex"
          justifyContent="center"
        >
          <Button
            variant="contained"
            onClick={() => navigate(`/show/${postId}`)}
          >
            See the offer
          </Button>
        </Box>

        <Divider sx={{ mt: "1rem", mb: "1rem" }} />

        <Box
          display="flex"
          justifyContent="center"
        >
          <Typography color={icon} marginBottom="5px" sx={{ mb: "1rem" }}>
            <IconButton onClick={handleDeleteConfirmationOpen} sx={{ color: icon }}>
              <DeleteOutlined />
            </IconButton>
          </Typography>
        </Box>
      
        {/* Render the delete confirmation dialog */}
        <Dialog open={deleteConfirmationOpen} onClose={handleDeleteConfirmationClose}>
          <DialogTitle>Delete Appointment</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              Are you sure you want to delete this appointment?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteConfirmationClose} color="primary">
              Cancel
            </Button>
            <Button onClick={deleteAppointment} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </WidgetWrapper>
    </Box>
  );
};
  
export default AppointmentWidget;
  