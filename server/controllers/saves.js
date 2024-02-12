import User from "../models/User.js";
import Save from "../models/Save.js";
import Post from "../models/Post.js";

/* CREATE */
export const createSave = async (req, res) => {
  try {
    
    const {userId,postId } = req.params;

    const existingSave = await Save.findOne({ userId, postId });
    if (existingSave) {
      await Save.findByIdAndRemove(existingSave._id);
      res.status(201).json({ message: "Post unsaved successfully" });
    }
    else{
      const user = await User.findById(userId);
      const post = await Post.findById(postId);
      console.log('controller');
      
      const newSave = new Save({
        userId: user._id,
        postId: post._id,
      });
  
     
      await newSave.save();
      res.status(201).json({ message: "Post saved successfully" });
    }
    
   
    
  } catch (err) {
    // Handle any errors that occur during post saving 
    res.status(409).json({ message: err.message });
  }
};

export const getAllSavesUser = async (req, res) => {
    try {
     
      const {userId } = req.params;
      
  
      const saves = await Save.find({ userId });
  
      // Respond with the list of saved posts
      res.status(200).json(saves);
    } catch (err) {
      // Handle any errors that occur during retrieval of saved posts
      res.status(404).json({ message: err.message });
    }
  };

  
/* DELETE */
export const deleteSave = async (req, res) => {
  const { saveId } = req.params;
  const { userId } = req.body;
  try {
    // Find the saved post with the provided save ID
    const save = await Save.findById(saveId);


    if (!save) {
      return res.status(409).json({ message: "Saved post not found" });
    }

    await Save.findByIdAndRemove(saveId);

    const allSaves = await Save.find({ userId });

    // Respond with the updated list of saved posts
    res.status(201).json(allSaves);
  } catch (error) {
    // Handle any errors that occur during review deletion
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
