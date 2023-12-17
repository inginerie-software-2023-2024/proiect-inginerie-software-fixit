import React, { useState } from "react";
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";

const DateSelector = ({ open, onClose, onSelectDate }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSelectDate = () => {
    onSelectDate(selectedDate);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Select a Date</DialogTitle>
      <DialogContent>
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
          <TextField
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            InputLabelProps={{
              shrink: true,
            }}
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
