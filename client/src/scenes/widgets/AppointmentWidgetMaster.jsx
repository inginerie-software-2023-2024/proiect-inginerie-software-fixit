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
    IconButton,
    Typography,
    useTheme,
    Button,
    useMediaQuery,
    Divider,
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
  const AppointmentWidgetMaster = ({
    appointmentId,
    userId,
    postId,
    description,
    location,
    date,
    time,
    isAccepted,
    isRefused,
  }) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const formattedDate = format(new Date(date), "dd/MM/yyyy");
    const navigate = useNavigate();

    // Get the theme from MUI's useTheme hook
    const { palette } = useTheme();
    const main = palette.colors.black;
    const icon = palette.appointment.icon;
    const background = palette.appointment.background;

    const [acceptError, setAcceptError] = useState(null);
    const [refuseError, setRefuseError] = useState(null);

    // Local state and variable declarations
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
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          //userId = data._id;
          setUser(data);
        } else {
          throw new Error("Error fetching user data");
        }
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };
  
    const handleAcceptAppointment = async () => {
      try {
        const response = await fetch(`http://localhost:3001/appointments/status`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            appointmentId,
            isAccepted: true,
            isRefused: false,
          }),
        });
  
        if (response.ok) {
          // Update the state to reflect the new status
          // setAcceptError(null); // Clear any previous errors
          // setIsAccepted(true);
          // setIsRefused(false);
          window.location.reload();
        } else {
          // Handle error
          const errorData = await response.json();
          setAcceptError(errorData.message); // Set an error message
        }
      } catch (error) {
        console.error("Error updating appointment status:", error);
        setAcceptError("An error occurred while updating the status.");
      }
    };
    
    const handleRefuseAppointment = async () => {
      try {
        const response = await fetch(`http://localhost:3001/appointments/status`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            appointmentId,
            isAccepted: false,
            isRefused: true,
          }),
        });
  
        if (response.ok) {
          // Update the state to reflect the new status
          // setRefuseError(null); // Clear any previous errors
          // setIsAccepted(false);
          // setIsRefused(true);
          window.location.reload();
        } else {
          // Handle error
          const errorData = await response.json();
          setRefuseError(errorData.message); // Set an error message
        }
      } catch (error) {
        console.error("Error updating appointment status:", error);
        setRefuseError("An error occurred while updating the status.");
      }
    };

    // Fetch the user data when the component mounts or when userId or token changes
    useEffect(() => {
      getUser();
    }, []);
  
    return (
      <Box >
        <WidgetWrapper sx={{ backgroundColor: {background} }} m="2rem 0" ml={isNonMobileScreens ? "15px" : undefined} mr={isNonMobileScreens ? "15px" : undefined }>
        <FlexBetween>
          <FriendOnPost
            friendId={user._id}
            name={`${user.firstName} ${user.lastName}`}
            subtitle={user.location}
            userPicturePath={user.picturePath}
          />

          {/* Conditionally render the checkmark or pending icon */}
          {isAccepted && (
            <CheckCircle sx={{ ml: "1rem", color: 'green', fontSize: 32 }} />
          )}
          {isRefused && (
            <Cancel sx={{ ml: "1rem", color: 'red', fontSize: 32 }} />
          )}
        </FlexBetween>

        <Divider sx={{ mt: "1.6rem", mb: "1rem" }} />

        <FlexBetween mt="2rem" sx={{ flexDirection: "column", wordWrap: "break-word" }}>
          <Typography color={icon} marginBottom="5px" sx={{ mt: "0.5rem", wordWrap: "break-word", display: "flex", alignItems: 'center' }}>
            <Icon component={Event} sx={{ mr: "0.5rem" }}/> {formattedDate}
            <Icon component={AccessTime} sx={{ ml: "1.1rem", mr: "0.4rem" }}/> {time}
          </Typography>
          <Typography color={icon} marginBottom="5px" sx={{ mt: "0.3em", wordWrap: "break-word", display: "flex", alignItems: "center" }}>
            <Icon component={LocationOn} sx={{ mr: "0.4rem" }}/> {location}
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

        <Box sx={{ mt: "1rem", mb: "0.5rem", display: 'flex', justifyContent: 'center' }}>
          {!isAccepted && !isRefused && (
            <>
              <Button onClick={handleAcceptAppointment} sx={{ color: 'green' }}>
                <CheckCircle sx={{ fontSize: 32 }} />
              </Button>
              <Button onClick={handleRefuseAppointment} sx={{ color: 'red' }}>
                <Cancel sx={{ fontSize: 32 }} />
              </Button>
            </>
          )}
        </Box>

        {/* Render the delete button for the review (only visible to the profile owner) */}
        {/* <Box ml={isNonMobileScreens ? "94%" : "95.5%"}>
          <IconButton onClick={handleDeleteConfirmationOpen} sx={{ color: main }}>
            <DeleteOutlined />
          </IconButton>
        </Box> */}

        {/* Render the delete confirmation dialog */}
        {/* <Dialog open={deleteConfirmationOpen} onClose={handleDeleteConfirmationClose}>
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
        </Dialog> */}
      </WidgetWrapper>
    </Box>
  );
};
  
export default AppointmentWidgetMaster;
  