import React, { useState, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";

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

/////////////////////////////////////////
// Components Import
import ProductAccordion from "../components/ProductScreen/ProductAccordion";
import ProductInfo from "../components/ProductScreen/ProductInfo";

const initialState = {
  isLoading: false,
  product: { reviews: [], category: {} },
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "PRODUCT_DETAILS_REQUEST":
      return { ...state, isLoading: true };

    case "PRODUCT_DETAILS_SUCCESS":
      return { ...state, isLoading: false, product: action.payload };

    case "PRODUCT_DETAILS_FAIL":
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};

////////////////////////////////////////
// MAIN COMPONENT
const ProductScreen = () => {
  const [qty, setQty] = useState(1);

  const params = useParams();
  // reducers
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoading, product, error } = state;
  const { category, reviews, ...productDetails } = product;

  // If there is change in the product details (i.e review)
  const [changed, setChanged] = useState(false);
  useEffect(() => {
    const getProductDetails = async () => {
      try {
        dispatch({ type: "PRODUCT_DETAILS_REQUEST" });

        const { data } = await axios.get(`/api/v1/products/${params.id}`);

        // after fetching product with specified id
        dispatch({
          type: "PRODUCT_DETAILS_SUCCESS",
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: "PRODUCT_DETAILS_FAIL",
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    };

    getProductDetails();
  }, [params.id, changed]);

  const reviewUpdated = () => {
    setChanged(true);
  };

  return (
    <Container sx={{ pt: 5, pb: 10 }}>
      {isLoading && <CircularProgress />}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      <Box>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
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
          <Link
            underline="hover"
            color="inherit"
            component={RouterLink}
            to={`/category/${category.category_id}`}
          >
            {category.name}
          </Link>
          <Typography color="text.primary">{product.name}</Typography>
        </Breadcrumbs>

        {/* Product Information */}
        <ProductInfo
          productDetails={productDetails}
          category={category}
          setQty={setQty}
          qty={qty}
        />

        {/* Product Description and Reviews */}
        <ProductAccordion
          description={product.description}
          reviews={reviews}
          reviewUpdated={reviewUpdated}
        />
      </Box>
    </Container>
  );
};

export default ProductScreen;
