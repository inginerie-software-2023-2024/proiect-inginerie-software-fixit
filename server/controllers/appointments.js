import User from "../models/User.js";
import Appointment from "../models/Appointment.js";
import Post from "../models/Post.js";

/* CREATE */
export const createAppointment = async (req, res) => {
  try {
    // Extract appointment data from the request body and user ID from request params
    const {userId,postId, firstName, lastName, location, description, date, time } = req.body;
    
    const user = await User.findById(userId);
    const post = await Post.findById(postId);

    // Create a new appointment instance with user and appointment data
    const newAppointment = new Appointment({
      userId: user._id,
      postId: post._id,
      firstName: firstName,
      lastName: lastName,
      location: location,
      description: description,
      date: date,
      time: time,
    });

    // Save the new appointment to the database
    await newAppointment.save();

    // Respond with the success message or any other data you want to send
    res.status(201).json({ message: "Appointment created successfully" });
  } catch (err) {
    // Handle any errors that occur during appointment creation
    res.status(409).json({ message: err.message });
  }
};

export const getDateAppointments = async (req, res) => {
    try {
      // Extract the date from the request params
      const { date } = req.params;
  
      // Retrieve all appointments associated with the date
      const appointment = await Appointment.find({ date });
  
      // Respond with the list of appointments
      res.status(200).json(appointment);
    } catch (err) {
      // Handle any errors that occur during retrieval of appointments
      res.status(404).json({ message: err.message });
    }
  };