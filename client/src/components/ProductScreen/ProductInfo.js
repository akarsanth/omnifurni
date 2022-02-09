import React from "react";
import { Link as RouterLink } from "react-router-dom";

///////////////////////////////////////
// MUI imports
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
import Chip from "@mui/material/Chip";

/////////////////////////////////////
// Custom Components
import CustomizedGrid from "../Grid/CustomizedGrid";

//////////////////////////////////////
// Styled Components
import styled from "styled-components";

const ProductImage = styled.img`
  max-width: 100%;
  min-width: 100%;
  object-fit: cover;
  height: 500px;
`;

const ProductInfo = (props) => {
  const { name, price, imagePath, rating, numReviews, countInStock } =
    props.productDetails;

  const { category_id, name: category_name } = props.category;

  return (
    <CustomizedGrid
      container
      spacing={5}
      columns={{ xs: 1, md: 2 }}
      sx={{ mb: 8, mt: 0 }}
    >
      <Grid item xs={1} md={1}>
        <Box
          sx={{
            border: 4,
            borderColor: "grey.200",
          }}
        >
          <ProductImage loading="lazy" src={imagePath} />
        </Box>
      </Grid>
      <Grid item xs={1} md={1}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: 1.5, md: 2 },
              mb: { xs: 6, md: 0 },
              pt: { xs: 4, md: 0 },
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              {name}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body1">Category:</Typography>
              <Link
                underline="none"
                color="inherit"
                component={RouterLink}
                to={`/categories/${category_id}`}
              >
                <Chip label={category_name} clickable />
              </Link>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Rating
                value={parseFloat(rating)}
                precision={0.5}
                max={5}
                readOnly
                size="small"
                key={rating}
              />
              <Typography variant="body2" color="text.secondary">
                ({numReviews} reviews)
              </Typography>
            </Box>
            <Typography color="primary" variant="h6">
              Rs. {price}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: 2, md: 2 },
            }}
          >
            <Typography color="grey.700" variant="body2">
              Availabilty:{" "}
              {countInStock > 0 ? `In Stock (${countInStock})` : "Out of Stock"}
            </Typography>
            <Box
              sx={{
                display: `${countInStock === 0 ? "none" : "flex"}`,
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography>Quantity:</Typography>
              <FormControl>
                <Select
                  value={props.qty}
                  onChange={(event) => props.setQty(event.target.value)}
                  size="small"
                >
                  {/* <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem> */}
                  {[...Array(countInStock).keys()].map((val) => (
                    <MenuItem value={val + 1} key={val + 1}>
                      {val + 1}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Button
              color="secondary"
              endIcon={<KeyboardArrowRightIcon />}
              disableElevation
              variant="contained"
              sx={{
                alignSelf: "flex-start",
                px: 8,
                py: 1,
                display: `${countInStock === 0 ? "none" : "auto"}`,
              }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Grid>
    </CustomizedGrid>
  );
};

export default ProductInfo;
