import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { setDateAppointments } from "state"; // Import the actual action creator

const DateSelector = ({ open, onClose, onSelectDate, postId }) => {
  const token = useSelector((state) => state.token);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");

  const [dateAppointments, setDateAppointmentsState] = useState([]); // Change this to null initially

  const loggedInUserId = useSelector((state) => state.user._id);
  const dispatch = useDispatch();
  
  const getDateAppointments = async (date) => {
    try {
      const response = await fetch(`http://localhost:3001/appointments/${date}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setDateAppointmentsState(data);
      dispatch(setDateAppointments({dateAppointments : data}))
    } 
    catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  // Function to check if a time slot is available
  const isTimeSlotAvailable = (time) => {
    // Check if the time slot is in the existing appointments
    return !dateAppointments?.some((appointment) => appointment.time === time); // Check for existence
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleSelectDate = async () => {
    const appointmentData = {
      userId: loggedInUserId,
      postId: postId,
      date: selectedDate,
      firstName,
      lastName,
      location: address,
      description,
      time: selectedTime,
      isAccepted: false,
    };

    try {
      const response = await fetch("http://localhost:3001/appointments/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });

      if (response.ok) {
        window.location.reload();
      } 
    } catch (error) {
      console.error("Error creating appointment:", error);
    }

    onSelectDate(appointmentData);
    onClose();
  };

  useEffect(() => {
    if (selectedDate) {
        
      getDateAppointments(selectedDate);
      console.log(dateAppointments);

    }
  }, [selectedDate]);
  
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Make An Appointment</DialogTitle>
      
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} paddingTop={2}>
          <TextField
            type="date"
            fullWidth
            label="Select Date"
            value={selectedDate}
            onChange={handleDateChange}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <FormControl fullWidth>
            <InputLabel id="time-select-label">Select Time</InputLabel>
            <Select
              labelId="time-select-label"
              id="time-select"
              value={selectedTime}
              onChange={handleTimeChange}
            >
              {["09:00", "11:00", "13:00", "15:00", "17:00"].map((time) => (
                <MenuItem key={time} value={time} disabled={!isTimeSlotAvailable(time)}>
                    {time}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="First Name"
            value={firstName}
            onChange={handleFirstNameChange}
          />

          <TextField
            fullWidth
            label="Last Name"
            value={lastName}
            onChange={handleLastNameChange}
          />

          <TextField
            fullWidth
            label="Address"
            value={address}
            onChange={handleAddressChange}
          />

          <TextField
            fullWidth
            label="Description"
            multiline
            rows={3}
            value={description}
            onChange={handleDescriptionChange}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSelectDate} variant="contained">
          Select
        </Button>
      </DialogActions>
      
    </Dialog>
  );
};

export default DateSelector;
