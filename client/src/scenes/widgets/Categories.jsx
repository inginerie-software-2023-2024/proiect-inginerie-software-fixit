import { useMediaQuery, Box, Typography, Button, useTheme } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import Category from "components/Category";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setFilter, sortMode } from "state";

const Categories = () => {
  // Check if the screen is a non-mobile screen using MUI's useMediaQuery hook
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(null); // Track the currently selected category
  const [selectedFilter, setSelectedFilter] = useState(false);
  const [selectedsortMode, setSelectedsortMode] = useState(false);

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const primary = palette.primary.main;
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;


  const handleCategorySelect = (category) => {
    dispatch(setCategory({ category: category })); // Dispatch an action to update the selected category in Redux store
    setSelectedCategory(category); // Update the selected category state
  };

  const filterByReviews = () => 
  { dispatch(setFilter({ filter: !selectedFilter })); // Dispatch an action to update the selected category in Redux store
    setSelectedFilter(!selectedFilter);
  };
  const sortModeF = () => 
  { dispatch(sortMode({ sortMode: !selectedsortMode })); // Dispatch an action to update the selected category in Redux store
    setSelectedsortMode(!selectedsortMode);
    console.log("aici1");
  };

  return (
    <>

    <WidgetWrapper 
        display="flex"
        flexDirection="column"
        ml={isNonMobileScreens ? "15px" : undefined} 
        mr={isNonMobileScreens ? "15px" : undefined} 
        justifyContent="center"
        alignItems="center"
    >

      <Box display="flex" justifyContent="space-between" width="100%">
        <Box onClick={() => {handleCategorySelect("auto");}}>
                <Category icon="car-icon.png" size="70%" text="Auto" isSelected={selectedCategory === "auto"} />
              </Box>

              <Box onClick={() => handleCategorySelect("tailoring")}>
                <Category icon="needle-icon.png" size="50%" text="Tailoring" isSelected={selectedCategory === "tailoring"}  />
            </Box>

            <Box onClick={() => handleCategorySelect("furniture")}>
                <Category icon="furniture-icon.png" size="70%" text="Furniture" isSelected={selectedCategory === "furniture"}  />
            </Box>

            <Box onClick={() => handleCategorySelect("electronics")}>
                <Category icon="electronics-icon.png" size="56%" text="Electronics" isSelected={selectedCategory === "electronics"}  />
            </Box>

            <Box onClick={() => handleCategorySelect("installation")}>
                <Category icon="sink-icon.png" size="60%" text="Installation" isSelected={selectedCategory === "installation" }  />
            </Box>
      </Box>

      <Box mt="1rem"> {/* Adjust margin-top as needed */}
        <Button onClick={() => filterByReviews()} style={{
          backgroundColor: selectedFilter ? primary : "",
          color: selectedFilter ? main : primary, // Text color
        }}>
            Filter by reviews
        </Button>
        <Button onClick={() => sortModeF()} style={{
          backgroundColor: selectedsortMode ? primary : "",
          color: selectedsortMode ? main : primary, // Text color
        }}>
            Reviewed by friends
        </Button>
      </Box>
      
      

    </WidgetWrapper> 
    </>
  );
};

export default Categories;
