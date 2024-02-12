import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, setCategory, setSearchQuery, setFilter ,sortMode} from "state";
import PostWidget from "./PostWidget";
import PostWidgetProfile from "./PostWidgetProfile";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();

  // Get all posts from the Redux store
  const allPosts = useSelector((state) => state.posts);

  const category = useSelector((state) => state.category);
  const searchQuery = useSelector((state) => state.searchQuery);
  const [posts, setPostsState] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Get the token from the Redux store
  const token = useSelector((state) => state.token);
  const filter = useSelector((state) => state.filter);
  const sortMode = useSelector((state) => state.sortMode);
  const loggedInUserId = useSelector((state) => state.user._id);
  const friends = useSelector((state) => state.user.friends);


  // Function to fetch all posts
  const getPosts = async () => {
    try {
      dispatch(setCategory({ category: null })); // Reset category filter
      dispatch(setSearchQuery({ searchQuery: "" })); // Reset search query
      dispatch(setFilter({ filter: null }));
      const response = await fetch("http://localhost:3001/posts", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      const reversedData = data.reverse(); // Sort the data in reverse order
      dispatch(setPosts({ posts: reversedData }));
      setPostsState(reversedData);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch user-specific posts
  const getUserPosts = async () => {
    try {
      dispatch(setSearchQuery({ searchQuery: "" })); // Reset search query
      const response = await fetch(
        `http://localhost:3001/posts/${userId}/posts`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      const reversedData = data.reverse(); // Sort the data in reverse order
      //dispatch(setPosts({ posts: reversedData }));
      setPostsState(reversedData);
    } catch (error) {
      console.error("Failed to fetch user posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPostReviews = async (postId) => {
    const response = await fetch(
      `http://localhost:3001/reviews/${postId}/postReviews`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    var stars = 0;
    for (var i in data)
    { var obj = data[i];
      stars += parseInt(obj["stars"]);
    }

    var average = stars / data.length;
    return average;
  };
  
  useEffect(() => {
    setLoading(true); // Set loading state to true before fetching data
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, [isProfile, userId]); // Include isProfile and userId as dependencies

  const sortPostsByFriendReviews = async (filteredPosts, loggedInUserId) => {
    const promises = filteredPosts.map(async (post) => {
      console.log("aici2");
      // Fetch reviews for the current post
      const postReviews = await fetchPostReviews(post._id);
      console.log(postReviews);
      // Check if one of the logged-in user's friends made a review for the post
      
      //const hasFriendReview = postReviews.some((review) => review.userId === loggedInUserId);
      const hasFriendReview = postReviews.some((review) => friends.some((friend) => friend._id === review.userId));
      return { ...post, hasFriendReview }; // Attach the friend review status to the post
    });
    console.log("aici3");
    const postsWithFriendReview = await Promise.all(promises);
  
    // Sort the posts based on friend review status
    const sortedPosts = postsWithFriendReview.sort((postA, postB) => {
      return postB.hasFriendReview - postA.hasFriendReview;
    });
  
    return sortedPosts;
  };
  
  const fetchPostReviews = async (postId) => {
    console.log("aici4");
    const response = await fetch(`http://localhost:3001/reviews/${postId}/postReviews`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    return data;
  };
  
  useEffect(() => {
    let filteredPosts = allPosts;

    if (searchQuery) {
      filteredPosts = filteredPosts.filter(
        (post) =>
          post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (category) {
      filteredPosts = filteredPosts.filter((post) => post.category === category);
    } 

    if(filter)
    {
      const sortPostsByAverage = async (filteredPosts) => {
      const promises = filteredPosts.map(async (post) => {
        const average = await getPostReviews(post._id);
        return { ...post, average }; // Attach the average to the post
      });

      const postsWithAverage = await Promise.all(promises);

      // Now, sort the posts based on the average
      const sortedPosts = postsWithAverage.sort((postA, postB) => {
        return postB.average - postA.average;
      });

      return sortedPosts;
    };

     sortPostsByAverage(filteredPosts).then((sortedPosts) => {
        console.log("Sorted posts: ", sortedPosts);
        setPostsState(sortedPosts);
      });
  }
  
  if (sortMode) {
    console.log("true");
    sortPostsByFriendReviews(filteredPosts, loggedInUserId).then((sortedPosts) => {
      console.log("Sorted posts by friend reviews: ", sortedPosts);
      setPostsState(sortedPosts);
    });
  }
  
    setPostsState(filteredPosts);
  }, [searchQuery, category, allPosts, filter, sortMode]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "15px",
          marginTop: "4rem",
        }}
      >
        Loading...
      </div>); // Render a loading state while fetching data
  }

  // Render PostWidgetProfile if it's a profile widget, otherwise render PostWidget
  if (isProfile) {
    return (
      <>
        {Array.isArray(posts) &&
          posts.map(
            // Render the posts
            ({
              _id,
              userId,
              firstName,
              lastName,
              title,
              description,
              category,
              location,
              picturePath,
              userPicturePath,
              likes,
              comments,
            }) => (
              <PostWidgetProfile
                key={_id}
                postId={_id}
                postUserId={userId}
                name={`${firstName} ${lastName}`}
                title={title}
                description={description}
                category={category}
                location={location}
                picturePath={picturePath}
                userPicturePath={userPicturePath}
                likes={likes}
                comments={comments}
              />
            )
          )}
      </>
    );
  } else {
    return (
      <>
        {Array.isArray(posts) &&
          posts.map(
            // Render the posts
            ({
              _id,
              userId,
              firstName,
              lastName,
              title,
              description,
              category,
              location,
              picturePath,
              userPicturePath,
              likes,
              comments,
            }) => (
              <PostWidget
                key={_id}
                postId={_id}
                postUserId={userId}
                name={`${firstName} ${lastName}`}
                title={title}
                description={description}
                category={category}
                location={location}
                picturePath={picturePath}
                userPicturePath={userPicturePath}
                likes={likes}
                comments={comments}
              />
            )
          )}
      </>
    );
  }
};

export default PostsWidget;
