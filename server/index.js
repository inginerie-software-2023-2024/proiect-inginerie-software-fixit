import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import reviewRoutes from "./routes/reviews.js";
import tipRoutes from "./routes/tips.js";
import appointmentRoutes from "./routes/appointments.js";
import OpenAI from "openai"


import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { createTip, editTip } from "./controllers/tips.js";
import { editPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import { editUser } from "./controllers/users.js";
import expressListEndpoints from 'express-list-endpoints';
/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });




/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);

app.post("/posts", verifyToken, upload.single("picture"), createPost);
// app.post("/posts", verifyToken, upload.single("video"), createPost);

app.post(
  "/users/:id/edit",
  verifyToken,
  upload.single("picturePath"),
  editUser
);

app.post(
  "/posts/:id/create",
  verifyToken,
  upload.single("picturePath"),
  createPost
);
app.post(
  "/posts/:id/edit",
  verifyToken,
  upload.single("picturePath"),
  editPost
);

// app.patch("/users/editUser", upload.single("picture"), editUser);
// app.post("/tips", verifyToken, upload.single("picture"), createTip);
// app.post("/tips", verifyToken, upload.single("video"), createTip);

app.post(
  "/tips/:id/create",
  verifyToken,
  upload.single("picturePath"),
  createTip
);
app.post(
  "/tips/:id/edit",
  verifyToken,
  upload.single("picturePath"),
  editTip
);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/reviews", reviewRoutes);
app.use("/tips", tipRoutes);
app.use("/appointments", appointmentRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD THE DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));


/* OpenAI */

const openai = new OpenAI({
  apiKey: process.env.API_KEY
});

app.post("/tips/:userQuestion", async (req, res) => {
  console.log("backendd")
  var userQuestion = req.params.userQuestion;

  //OpenAI Completion API Call
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a technician. Do not exceed the explanation more than 80 words." }, // Setting the context
      { role: "user", content: userQuestion }, // User's input
    ],
  });

  res.json(completion.choices[0].message.content);
})



// app.post(
//   "/posts/:id/create",
//   verifyToken,
//   upload.single("picturePath"),
//   createPost
// );