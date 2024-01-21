import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
  reviews:[],
  tips: [],
  appointments: [],
  dateAppointments: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setReviews: (state, action) => {
      state.reviews = action.payload.reviews;
    },
    setAppointments: (state, action) => {
      state.appointments = action.payload.appointments;
    },
    setDateAppointments:(state, action) =>{
      state.dateAppointments=action.payload.dateAppointments;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    setCategory: (state, action) => {
      state.category = action.payload.category;
    },
    setFilter: (state, action) => {
      state.filter = action.payload.filter;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload.searchQuery;
    },
    setTips: (state, action) => {
      state.tips = action.payload.tips;
    },
    setTip: (state, action) => {
      const updatedTips = state.tips.map((tip) => {
        if (tip._id === action.payload.tip._id) return action.payload.tip;
        return tip;
      });
      state.tips = updatedTips;
    }
    
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost, setUser, setReviews, setCategory, setFilter,
  setSearchQuery, setTips, setTip, setDateAppointments, setAppointments } =
  authSlice.actions;
export default authSlice.reducer;