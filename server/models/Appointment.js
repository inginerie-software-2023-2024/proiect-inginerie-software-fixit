import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    postId: {
        type: String,
        required: true,
      },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location:{ 
        type: String,
      required: true,
    },
    description: { 
        type: String,
      required: true,
    },
    date: { 
        type: Date,
      required: true,
    },
    time:{
      type: String,
      required: true,
    },
    isAccepted: {
      type: Boolean,
      required:true,
    },
    isRefused: {
      type: Boolean,
      required:true,
    }
    //userPicturePath: String,
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;