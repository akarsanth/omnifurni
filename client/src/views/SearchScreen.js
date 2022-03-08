import React, { useState, useEffect, useReducer } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

/////////////////////////////////////////
// MUI Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";

/////////////////////////////////////
// Custom Components
import EmptyView from "../components/Common/EmptyView";
import CustomizedGrid from "../components/Grid/CustomizedGrid";
import ProductCard from "../components/ProductCard";
import FilterPanel from "../components/Filter/FilterPanel";

const initialState = {
  isLoading: false,
  productList: [],
  error: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "REQUEST":
      return { ...state, isLoading: true };

    case "SUCCESS":
      return { ...state, isLoading: false, productList: action.payload };

    case "FAIL":
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};

//////////////////////////////////////
// MAIN COMPONENT
const SearchScreen = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // For product and category
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoading, productList, error } = state;

  const searchTerm = searchParams.get("q") || "";

  useEffect(() => {
    const getMatchedProducts = async () => {
      try {
        dispatch({ type: "REQUEST" });

        const { data } = await axios.get(
          `/api/v1/products/search?keyword=${searchTerm}`
        );

        dispatch({
          type: "SUCCESS",
          payload: data,
        });

        const maxValue = Math.max(...data.map((x) => x.price));
        const minValue = Math.min(...data.map((x) => x.price));

        // Initial selected price
        setSelectedPrice([Math.floor(minValue), Math.ceil(maxValue)]);

        // Min and Max value
        setMinMaxValue([Math.floor(minValue), Math.ceil(maxValue)]);
      } catch (error) {
        dispatch({
          type: "FAIL",
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    };

    getMatchedProducts();
  }, [searchTerm]);

  // Filtering
  const [resultsFound, setResultsFound] = useState(true);
  const [list, setList] = useState(productList);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState([1000, 50000]);
  const [minMaxValue, setMinMaxValue] = useState([1000, 50000]);

  const handleSelectRating = (event, value) =>
    !value ? null : setSelectedRating(value);

  const handleChangePrice = (event, value) => {
    setSelectedPrice(value);
  };

  useEffect(() => {
    const applyFilters = () => {
      let updatedList = productList;

      // Rating Filter
      if (selectedRating) {
        updatedList = updatedList.filter(
          (item) => parseInt(item.rating) >= parseInt(selectedRating)
        );
      }

      // Price Filter
      const minPrice = selectedPrice[0];
      const maxPrice = selectedPrice[1];

      updatedList = updatedList.filter(
        (item) => item.price >= minPrice && item.price <= maxPrice
      );

      setList(updatedList);

      !updatedList.length ? setResultsFound(false) : setResultsFound(true);
    };

    applyFilters();
  }, [selectedRating, selectedPrice, productList]);

  return (
    <Container sx={{ pt: 10, pb: 10 }}>
      {isLoading && <CircularProgress />}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box>
        <CustomizedGrid container spacing={4} columns={{ xs: 1, md: 10 }}>
          <Grid item xs={1} md={3}>
            <Box
              sx={{
                bgcolor: "#fff",
                border: 2,
                borderColor: "#eee",
                mb: 5,
              }}
            >
              <FilterPanel
                selectedRating={selectedRating}
                selectRating={handleSelectRating}
                selectedPrice={selectedPrice}
                changePrice={handleChangePrice}
                minMaxValue={minMaxValue}
              />
            </Box>
          </Grid>

          <Grid item xs={1} md={7}>
            <Typography
              sx={{ mb: 2 }}
              variant="h6"
            >{`Search Results For: "${searchTerm}"`}</Typography>

            {resultsFound ? (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(2, 1fr)",
                    sm: "repeat(3, 1fr)",
                    md: "repeat(3, 1fr)",
                    lg: "repeat(3, 1fr)",
                  },
                  gridAutoFlow: "dense",
                  gap: 3,
                }}
              >
                <>
                  {list.map((product) => {
                    return (
                      <ProductCard
                        product={product}
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                        key={product.product_id}
                      />
                    );
                  })}
                </>
              </Box>
            ) : (
              <EmptyView />
            )}
          </Grid>
        </CustomizedGrid>
      </Box>
    </Container>
  );
};

export default SearchScreen;
