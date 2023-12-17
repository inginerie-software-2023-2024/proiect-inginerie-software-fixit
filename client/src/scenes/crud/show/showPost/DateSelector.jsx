import React, { useState } from "react";
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

const DateSelector = ({ open, onClose, onSelectDate,postId }) => {
  const token = useSelector((state) => state.token); // Get the authentication token from the Redux store
  const [selectedDate, setSelectedDate] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const loggedInUserId = useSelector((state) => state.user._id);
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
      userId: loggedInUserId, // replace with the actual user ID
      postId: postId, // replace with the actual post ID
      date: selectedDate,
      firstName,
      lastName,
      location: address,
      description,
      time: selectedTime,
    };
    console.log(appointmentData);
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
        // The appointment was successfully created
        console.log("Appointment created successfully!");
      } else {
        // Handle errors here
        console.error("Failed to create appointment");
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
    }

    // Close the dialog after handling the request
    onSelectDate(appointmentData);
    onClose();
  };

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
              <MenuItem value="09:00">9:00 AM</MenuItem>
              <MenuItem value="11:00">11:00 AM</MenuItem>
              <MenuItem value="13:00">1:00 PM</MenuItem>
              <MenuItem value="15:00">3:00 PM</MenuItem>
              <MenuItem value="17:00">5:00 PM</MenuItem>
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
