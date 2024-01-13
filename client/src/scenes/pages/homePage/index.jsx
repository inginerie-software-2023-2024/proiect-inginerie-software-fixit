import { Box, useMediaQuery, Button  } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "components/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import PostsWidget from "scenes/widgets/postWidgets/PostsWidget";
import FriendListWidget from "scenes/widgets/friendListWidgets/FriendListWidget";
import Categories from "scenes/widgets/Categories";
import SearchBarPosts from "scenes/widgets/SearchBarPosts";
import introJs from 'intro.js';
import 'intro.js/introjs.css';

const HomePage = () => {
  // Checking if the screen size is greater than or equal to 1000px
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  // Fetching the _id and picturePath of the user from the Redux store
  const { _id, picturePath } = useSelector((state) => state.user);

  // Setting up state for the search query
  const [searchQuery, setSearchQuery] = useState("");
  const [showTutorial, setShowTutorial] = useState(false);
  useEffect(() => {
    if (showTutorial) {
      introJs().setOptions({
        steps: [{
          element: ".user-widget",
          intro: "This is your profile summary, from here you can go into your profile page."
        }, {
          element: ".following-widget",
          intro: "This is your following list."
        },
        {
          element: ".searchbar-widget",
          intro: "This is the search bar, here you can filter the results from your feed.."
        },
        {
          element: ".categories-widget",
          intro: "Here are the categories, select one in order to filter the results.."
        },
        {
          element: ".posts-widget",
          intro: "Here is your feed.Scroll down to see more posts."
        }],
        tooltipClass: 'custom-intro-tooltip',
        doneLabel: 'End Tutorial',
        showStepNumbers: false,
      }).onexit(() => setShowTutorial(false)).start();
    }
  }, [showTutorial]);
  
  // Handling the search query update
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleStartTutorial = () => {
    setShowTutorial(true);
  };

  return (
    <Box>
      {/* Rendering the navbar component */}
      <Navbar />
      <Box sx={{ marginLeft: 110, marginTop:3  }}>
      <Button onClick={handleStartTutorial} variant="contained" color="primary">
        Start Tutorial
      </Button>
    </Box>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
        
    
      >
        {/* UserWidget component displays user information */}
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}
        className="user-widget" sx={{  height:120  }}
      >
          <UserWidget userId={_id} picturePath={picturePath}
          className="user-widget2" />
        </Box>

        {/* Container for the search bar, categories, and posts */}
        <Box
          maxWidth={isNonMobileScreens ? "45%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
         

        >
        <Box   className="searchbar-widget" sx={{  height:70  }}>
          {/* SearchBarPosts component allows users to search for posts */}
          <SearchBarPosts onSearch={handleSearch}
         />
        </Box>
          {/* Categories component displays post categories */}
          <Box   className="categories-widget" sx={{  height:150  }}>
          <Categories />
          </Box>
          {/* PostsWidget component displays posts */}
          <Box   className="posts-widget" >
          <PostsWidget userId={_id} searchQuery={searchQuery} />
          </Box>
        </Box>

        {/* Displaying the friend list widget on non-mobile screens */}
        {isNonMobileScreens && (
          <Box flexBasis="26%" className="following-widget"   sx={{  height:170  }} >
            <Box m="0rem 0"  />
            <FriendListWidget  userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
