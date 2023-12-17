import User from "../models/User.js";
import Post from "../models/Post.js";
import Appointment from "../models/Appointment.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user with the provided ID
    const user = await User.findById(id);

    // Respond with the user data
    res.status(200).json(user);
  } catch (err) {
    // Handle any errors that occur during user retrieval
    res.status(404).json({ message: err.message });
  }
};

export const getUserAppointments = async (req, res) => {
  try {
    // Extract the user ID from the request params
    const { userId } = req.params;

    // Retrieve all posts associated with the user ID
    const appointments = await Appointment.find({ userId });
    console.log(appointments);

    // Respond with the list of user posts
    res.status(200).json(appointments);
  } catch (err) {
    // Handle any errors that occur during retrieval of user posts
    res.status(404).json({ message: err.message });
  }
};
export const getUserAppointmentsMaster = async (req, res) => {
  try {
    // Extract the user ID from the request params
    const { userId } = req.params;

    // Retrieve all posts associated with the user ID
    const posts = await Post.find({ userId });

    // Extract postIds from user's posts
    const postIds = posts.map(post => post._id);

    // Retrieve all appointments associated with the user's posts
    const appointments = await Appointment.find({ postId: { $in: postIds } });
    console.log(appointments);

    // Respond with the list of user appointments
    res.status(200).json(appointments);
  } catch (err) {
    // Handle any errors that occur during retrieval of user appointments
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user with the provided ID
    const user = await User.findById(id);

    // Retrieve all friends of the user by querying their IDs
    const friends = await Promise.all(user.friends.map((id) => User.findById(id)));

    // Format the friends' data to include only specific properties
    const formattedFriends = friends.map(({ _id, firstName, lastName, location, picturePath, isClient, bio }) => {
      return {
        _id,
        firstName,
        lastName,
        location,
        picturePath,
        isClient,
        bio,
      };
    });

    // Respond with the formatted friends' data
    res.status(200).json(formattedFriends);
  } catch (err) {
    // Handle any errors that occur during retrieval of user friends
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;

    // Find the user with the provided ID
    const user = await User.findById(id);

    // Check if the friend ID is already in the user's friends list
    if (user.friends.includes(friendId)) {
      // If the friend ID exists, remove it from the friends list
      user.friends = user.friends.filter((id) => id !== friendId);

      // Note: The commented code below appears to be related to updating the followers list of the friend as well, but it's currently commented out.
      // const friend = await User.findById(friendId);
      // friend.followers = friend.followers.filter((idd) => idd !== id);
    } else {
      // If the friend ID doesn't exist, add it to the friends list
      user.friends.push(friendId);
      // user.followers.push(friendId);
    }

    // Save the updated user data
    await user.save();

    // Retrieve the updated list of friends with their data
    const friends = await Promise.all(user.friends.map((id) => User.findById(id)));

    // Format the friends' data to include only specific properties
    const formattedFriends = friends.map(({ _id, firstName, lastName, location, picturePath, isClient, bio }) => {
      return {
        _id,
        firstName,
        lastName,
        location,
        picturePath,
        isClient,
        bio,
      };
    });

    // Respond with the formatted friends' data
    res.status(200).json(formattedFriends);
  } catch (err) {
    // Handle any errors that occur during adding/removing friends
    res.status(404).json({ message: err.message });
  }
};

export const editUser = async (req, res) => {
  try {
    const { firstName, lastName, location, bio, picturePath } = req.body;
    const { id } = req.params;

    // Find the user with the provided ID and update their profile data
    const updatedProfile = await User.findByIdAndUpdate(
      id,
      { firstName, lastName, location, bio, picturePath },
      { new: true }
    );

    // Update the user's profile data in all their associated posts as well
    try {
      await Post.updateMany(
        { userId: id },
        { $set: { firstName, lastName, userPicturePath: picturePath } }
      );
    } catch (err) {
      console.error(err);
      // Handle the error appropriately
    }

    // Respond with the updated profile data
    res.status(200).json(updatedProfile);
  } catch (err) {
    // Handle any errors that occur during user profile editing
    res.status(409).json({ message: err.message });
  }
};
