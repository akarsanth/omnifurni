import React, { useEffect } from "react";

///////////////////////////////
// Redux Related
import { useSelector, useDispatch } from "react-redux";
import { getFeaturedProductList } from "../app/features/featuredProducts/product-actions";

///////////////////////////////
// MUI Components
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";

// Custom Components
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";

const HomeView = () => {
  const dispatch = useDispatch();

  // to access productList(present in reduxStore) from the global state
  // it can be accessed in this home screen
  // as Provider component wraps the entire app component
  const productList = useSelector((state) => state.featuredProductList);
  // destructuring productList
  const { isLoading, error, products } = productList;

  const categoryList = useSelector((state) => state.categoryList);
  const {
    isLoading: isLoadingCategory,
    error: errorCategory,
    categories,
  } = categoryList;

  useEffect(() => {
    dispatch(getFeaturedProductList());
  }, [dispatch]);

  return (
    <Container>
      <Box sx={{ pt: 8, pb: 10 }}>
        <Box sx={{ mb: 8 }}>
          <Divider textAlign="center" sx={{ mb: 3 }}>
            <Typography variant="h6">Featured Poducts</Typography>
            <Fade
              in={isLoading}
              style={{
                transitionDelay: isLoading ? "0s" : "0ms",
              }}
              unmountOnExit
            >
              <CircularProgress sx={{ mt: 1 }} />
            </Fade>
          </Divider>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(3, 1fr)",
                md: "repeat(4, 1fr)",
                lg: "repeat(5, 1fr)",
              },
              gridAutoFlow: "dense",
              gap: 3,
            }}
          >
            {error ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              <>
                {products.map((product) => {
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
            )}
          </Box>
        </Box>
        <Box>
          <Divider textAlign="center" sx={{ mb: 3 }}>
            <Typography variant="h6">Categories</Typography>
            <Fade
              in={isLoadingCategory}
              style={{
                transitionDelay: isLoadingCategory ? "0s" : "0ms",
              }}
              unmountOnExit
            >
              <CircularProgress sx={{ mt: 1 }} />
            </Fade>
          </Divider>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(3, 1fr)",
                md: "repeat(5, 1fr)",
              },
              gridAutoFlow: "dense",
              gridAutoRows: {
                xs: "200px",
                sm: "150px",
              },
              gap: 3,
            }}
          >
            {errorCategory ? (
              <Alert severity="error">{errorCategory}</Alert>
            ) : (
              <>
                {categories.map((category) => {
                  return (
                    <CategoryCard
                      category={category}
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                      key={category.category_id}
                    />
                  );
                })}
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default HomeView;
