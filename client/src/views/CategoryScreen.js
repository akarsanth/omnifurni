import React, { useState, useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link as RouterLink, useSearchParams } from "react-router-dom";

/////////////////////////////////////////
// MUI Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

/////////////////////////////////////
// Custom Components
import CustomizedGrid from "../components/Grid/CustomizedGrid";
import ProductCard from "../components/ProductCard";
import FilterPanel from "../components/Filter/FilterPanel";
import EmptyView from "../components/Common/EmptyView";

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
const CategoryScreen = () => {
  const params = useParams();

  // For product and category
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoading, productList, error } = state;

  const { categories } = useSelector((state) => state.categoryList);
  const [categoryName, setCategoryName] = useState("");

  //////////////////////////////////////
  // Fetching products under the chosen category
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const [pages, setPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  useEffect(() => {
    const getProductList = async () => {
      try {
        dispatch({ type: "REQUEST" });

        const { data } = await axios.get(
          `/api/v1/products/category/${params.id}?page=${page}&pageSize=${pageSize}`
        );

        const { products, pages } = data;

        dispatch({
          type: "SUCCESS",
          payload: products,
        });

        setPages(pages);

        const maxValue = Math.max(...products.map((x) => x.price));
        const minValue = Math.min(...products.map((x) => x.price));

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

    getProductList();

    // To find the category
    const category = categories.find(
      (category) => category.category_id === parseInt(params.id)
    );

    if (category) {
      setCategoryName(category.name);
    }
  }, [params.id, categories, page, pageSize]);

  const handlePaginationChange = (value) => {
    if (value === 1) {
      setSearchParams({});
    } else {
      setSearchParams({ page: value });
    }
  };

  // Filtering
  const [resultsFound, setResultsFound] = useState(null);
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
    <Container sx={{ pt: 5, pb: 10 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 6 }}>
          <Link
            sx={{ display: "flex", alignItems: "center" }}
            underline="hover"
            color="inherit"
            component={RouterLink}
            to="/"
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            HOME
          </Link>

          <Typography color="text.primary">{categoryName}</Typography>
        </Breadcrumbs>

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
              sx={{ mb: 4 }}
              variant="h6"
            >{`Product(s) under category "${categoryName}"`}</Typography>

            {isLoading && <CircularProgress sx={{ mb: 2 }} />}

            {resultsFound === null && <></>}
            {resultsFound === true && (
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
            )}
            {resultsFound === false && !isLoading && <EmptyView />}

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 5,
                pt: 8,
              }}
            >
              <Pagination
                count={pages}
                page={parseInt(page)}
                color="primary"
                showFirstButton
                showLastButton
                onChange={(e, value) => handlePaginationChange(value)}
                disabled={list === []}
              />

              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <Typography variant="subtitle2">Show</Typography>
                <Select
                  value={pageSize}
                  onChange={(event) => setPageSize(event.target.value)}
                  size="small"
                  disabled={list.length < 10}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={15}>15</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                </Select>
                <Typography variant="subtitle2">per page</Typography>
              </Box>
            </Box>
          </Grid>
        </CustomizedGrid>
      </Box>
    </Container>
  );
};

export default CategoryScreen;
