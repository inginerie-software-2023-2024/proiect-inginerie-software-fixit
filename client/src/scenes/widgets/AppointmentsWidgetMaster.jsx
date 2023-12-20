import { Box, Button, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import FriendOnPost from "components/FriendOnPost";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAppointments } from "state";
import { useNavigate } from "react-router-dom";
import AppointmentWidgetMaster from "./AppointmentWidgetMaster";

const AppointmentsWidget = ({ userId }) => {
  // Redux dispatch to update the friends list in the store
  const dispatch = useDispatch();

  // Access the color palette from the current theme
  const { palette } = useTheme();

  // Get the token from the Redux store
  const token = useSelector((state) => state.token);

  // Navigation object to programmatically navigate to different routes
  const navigate = useNavigate();

  // Get the friends list from the Redux store
  const [appointments, setAppointmentsState] = useState([]); // Change this to null initially

  // Get the logged-in user's ID from the Redux store
  const loggedInUserId = useSelector((state) => state.user._id);

  // Check if the current user is viewing their own profile
  const isProfileUser = userId === loggedInUserId;
  // State to toggle showing more friends (currently not used)
  const [showMore] = useState(false);

  const filteredAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.date);
    const currentDate = new Date();
    return appointmentDate >= currentDate;
  });

  // Function to sort appointments by date in descending order
  const sortAppointmentsByDate = (a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  };

  // Function to fetch the friends list from the server
  const getAppointments = async () => {
    console.log(userId);
    const response = await fetch(
      `http://localhost:3001/users/${userId}/appointmentsmaster`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
   
    // Update the friends list in the Redux store
    setAppointmentsState(data);
    dispatch(setAppointments({ appointments: data }));
  };

  useEffect(() => {
    // Fetch the friends list when the component mounts
    getAppointments();
    console.log(appointments);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      {/* Render the "Appointments" title */}
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Appointments
      </Typography>

      {/* Render the filtered appointments */}
      <Box display="flex" flexDirection="column" mb="0.5rem">
        {filteredAppointments.
        sort(sortAppointmentsByDate).
        slice(0, showMore ? filteredAppointments.length : 2).map((appointment) => (
          <AppointmentWidgetMaster
            key={appointment._id}
            userId={appointment.userId}
            appointmentId={appointment._id}
            postId={appointment.postId}
            description={appointment.description}
            location={appointment.location}
            date={appointment.date}
            time={appointment.time}
            isAccepted={appointment.isAccepted}
            isRefused={appointment.isRefused}
          />
        ))}
      </Box>

      {/* Render the "Show More" button if there are more than 3 friends */}
      {filteredAppointments.length > 2 && (
        <Box mt="0.5rem" display="flex" justifyContent="center">
          <Button
            onClick={() => navigate(`/showMoreAppointmentsMaster/${userId}`)}
            sx={{
              m: "0.5rem 0",
              p: "0.5rem",
              backgroundColor: palette.background.alt,
              color: palette.login.button,
              "&:hover": {
                backgroundColor: palette.login.buttonHover,
                color: palette.login.buttonTextHover,
              },
            }}
          >
            Show More
          </Button>
        </Box>
      )}
    </WidgetWrapper>
  );
};



export default AppointmentsWidget;
