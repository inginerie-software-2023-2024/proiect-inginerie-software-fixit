import Navbar from "components/navbar";
import Friend from "components/Friend";
import FriendOnPost from "components/FriendOnPost";
import WidgetWrapper from "components/WidgetWrapper";
import { useParams } from "react-router-dom";
import {
  Box,
  useTheme,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import React from 'react';
import { setAppointments } from "state";
import { CheckCircle, HourglassEmpty, Cancel } from "@mui/icons-material";
import AppointmentWidget from "scenes/widgets/appointmentWidgets/AppointmentWidget";

const ShowMoreAppointments = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();

  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);

  const { palette } = useTheme();
  const theme = useTheme();

  // Get the logged-in user's ID from the Redux store
  const loggedInUserId = useSelector((state) => state.user._id);

  // Check if the current user is the profile user
  const isProfileUser = userId === loggedInUserId;

  // Get the friends list from the Redux store
  const [appointments, setAppointmentsState] = useState([]); // Change this to null initially
  
  const filteredAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.date);
    const currentDate = new Date();
    return appointmentDate >= currentDate;
  });

  const acceptedAppointments = filteredAppointments.filter(
    (appointment) => appointment.isAccepted
  );

  const refusedAppointments = filteredAppointments.filter(
    (appointment) => appointment.isRefused
  );

  const pendingAppointments = filteredAppointments.filter(
    (appointment) => !appointment.isAccepted && !appointment.isRefused
  );

  // Function to sort appointments by date in descending order
  const sortAppointmentsByDate = (a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  };

  const getUser = async () => {
    // Fetch user data from the API
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  // Function to fetch the appointments from the server
  const getAppointments = async () => {
    console.log(userId);
    const response = await fetch(
      `http://localhost:3001/users/${userId}/appointments`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    console.log(data);
    // Update the friends list in the Redux store
    setAppointmentsState(data);
    dispatch(setAppointments({ appointments: data }));
  };

  useEffect(() => {
    // Fetch user and friends data when the component mounts or the userId changes
    getUser();
    getAppointments();
  }, [userId]);

  if (!user) return null;

  return (
    <Box>
      {/* Render the navbar component */}
      <Navbar />

      <Typography
          color={palette.neutral.dark}
          variant="h5"
          fontWeight="500"
          sx={{ mt: "3rem", mb: "1.5rem" }}
          textAlign="center"
        >
          Appointments
      </Typography>

      <WidgetWrapper
        width="90%"
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.login.box}
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        {/* Accepted Appointments */}
        <Box 
            width="30%"
            display="flex"
            flexDirection="column"
            alignItems="center"
        >
            <CheckCircle sx={{ color: 'green', fontSize: 32, mt: "1rem", mb: "0.8rem" }} />
            <Typography
                color='green'
                variant="h6"
                fontWeight="500"
                sx={{ mb: '1rem' }}
            >
                Accepted Appointments
            </Typography>

            {/* Render the accepted appointments */}
            <Box width="100%" display="flex" flexDirection="column" mb="0.1rem">
                {acceptedAppointments.
                sort(sortAppointmentsByDate).map((appointment) => (
                    <AppointmentWidget
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
        </Box>

        {/* Pending Appointments */}
        <Box 
            width="30%"
            display="flex"
            flexDirection="column"
            alignItems="center"
        >
            <HourglassEmpty sx={{ color: 'orange', fontSize: 32, mt: "1rem", mb: "0.8rem" }} />
            <Typography
                color='orange'
                variant="h6"
                fontWeight="500"
                sx={{ mb: '1rem' }}
                >
                Pending Appointments
            </Typography>

            {/* Render the pending appointments */}
            <Box width="100%" display="flex" flexDirection="column" mb="0.1rem">
                {pendingAppointments.
                sort(sortAppointmentsByDate).map((appointment) => (
                    <AppointmentWidget
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
        </Box>

        {/* Refused Appointments */}
        <Box 
            width="30%"
            display="flex"
            flexDirection="column"
            alignItems="center"
        >
            <Cancel sx={{ color: 'red', fontSize: 32, mt: "1rem", mb: "0.8rem" }} />
            <Typography
                color='red'
                variant="h6"
                fontWeight="500"
                sx={{ mb: '1rem' }}
            >
                Refused Appointments
            </Typography>

            {/* Render the refused appointments */}
            <Box width="100%" display="flex" flexDirection="column" mb="0.1rem">
                {refusedAppointments.
                sort(sortAppointmentsByDate).map((appointment) => (
                    <AppointmentWidget
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
        </Box>
      </WidgetWrapper>
    </Box>
  );
};

export default ShowMoreAppointments;
