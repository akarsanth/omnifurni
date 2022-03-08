import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

////////////////////////////////////
// MUI Components
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { CardActionArea } from "@mui/material";
// import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

///////////////////////////////////
// Styled Components
import { styled } from "@mui/material/styles";

const ProductTitle = styled(Box)(({ theme }) => ({
  height: theme.spacing(5),
  textOverflow: "ellipsis",
  overflow: "hidden",
  marginBottom: theme.spacing(1.5),
}));

export default function ProductCard(props) {
  const { product_id, name, imagePath, numReviews, rating, price } =
    props.product;

  return (
    <Card sx={{ maxWidth: 345 }} key={product_id} variant="outlined">
      <CardActionArea component={RouterLink} to={`/product/${product_id}`}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="150"
          image={imagePath}
          style={{
            objectFit: "contain",
          }}
        />
        <CardContent sx={{ pb: 0.5 }}>
          <ProductTitle>
            <Typography variant="subtitle2">{name}</Typography>
          </ProductTitle>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              rowGap: 0.1,
              columnGap: 0.5,
              mb: 1.5,
            }}
          >
            <Rating
              name="size-small"
              value={parseFloat(rating)}
              precision={0.5}
              readOnly
              size="small"
            />
            <Typography variant="body2" color="text.secondary">
              ({numReviews} reviews)
            </Typography>
          </Box>

          <Typography color="primary" variant="subtitle1">
            NPR {price}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button
          // variant="outlined"
          size="small"
          startIcon={<ShoppingCartCheckoutIcon />}
        >
          Add to Cart
        </Button>
      </CardActions> */}
    </Card>
  );
}
