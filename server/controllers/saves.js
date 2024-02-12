import User from "../models/User.js";
import Save from "../models/Save.js";
import Post from "../models/Post.js";

/* CREATE */
export const createSave = async (req, res) => {
  try {
    const { userId, postId } = req.params;
    const existingSave = await Save.findOne({ userId, postId });

    if (existingSave) {
      await Save.findByIdAndRemove(existingSave._id);
      res.status(201).json({ message: "Post unsaved successfully" });
      console.log('desalvata');
    }
    else
    {
      const user = await User.findById(userId);
      const post = await Post.findById(postId);
      
      const newSave = new Save({
        userId: user._id,
        postId: post._id,
      });
     
      await newSave.save();
      res.status(201).json({ message: "Post saved successfully" });
      console.log('salvata');
    }
    
  } catch (err) {
    // Handle any errors that occur during post saving 
    res.status(409).json({ message: err.message });
  }
};

export const checkPostSaved = async (req, res) => {
  try {
    const { userId, postId } = req.params;
    const existingSave = await Save.findOne({ userId, postId });

    res.status(200).json(!!existingSave);
  } catch (err) {
    // Handle any errors that occur during retrieval of saved posts
    res.status(404).json({ message: err.message });
  }
};

export const getAllSavesUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const saves = await Save.find({ userId });
  
      // Map through the saves and retrieve the post data for each save
      const posts = await Promise.all(
        saves.map(async (save) => {
          const post = await Post.findById(save.postId);
          return post;
        })
      );

      // Respond with the list of posts
      res.status(200).json(posts);
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
