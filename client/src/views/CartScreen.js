import React from "react";
import { Link as RouterLink } from "react-router-dom";

///////////////////////////////////////
// Redux Related
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../app/features/cart/cart-actions";

//////////////////////////////////////
// Custom Components
import CheckoutSteps from "../components/CheckoutSteps";
import CustomizedGrid from "../components/Grid/CustomizedGrid";
import NumericUpDown from "../components/Common/NumericUpDown/cart";
import {
  Separator,
  CustTableCell,
  TableCellBox,
} from "../components/Checkout/Table";

/////////////////////////////////////
// MUI IMPORTS
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

//////////////////////////////////////
// MAIN COMPONENT
const CartScreen = () => {
  const dispatch = useDispatch();
  const { cartItems, total } = useSelector((state) => state.cart);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <Container>
      <CheckoutSteps step1 />
      {cartItems.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 9,
            mb: 15,
          }}
        >
          <Typography sx={{ mb: 2 }}>Your cart is currently empty!</Typography>
          <Link to="/" component={RouterLink} underline="none">
            <Button variant="outlined">Continue Shopping</Button>
          </Link>
        </Box>
      ) : (
        <CustomizedGrid
          container
          columns={{ xs: 1, md: 13 }}
          sx={{ mb: 12, mt: 0 }}
        >
          <Grid item xs={1} md={7.5} sx={{ mb: 10 }}>
            <TableContainer component={Box}>
              <Table sx={{ border: 0 }} aria-label="cart items table">
                <TableHead sx={{ borderBottom: 2, borderColor: "grey.300" }}>
                  <TableRow>
                    <TableCell align="left" sx={{ pl: 0 }}>
                      PRODUCT
                    </TableCell>
                    <TableCell>PRICE</TableCell>
                    <TableCell>QUANTITY</TableCell>
                    <TableCell align="right" sx={{ pr: 0 }}>
                      SUBTOTAL
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.product_id}>
                      <TableCell align="left" sx={{ pl: 0 }}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <IconButton
                            aria-label="delete"
                            onClick={() =>
                              removeFromCartHandler(item.product_id)
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                          <Link
                            to={`/product/${item.product_id}`}
                            component={RouterLink}
                            underline="none"
                          >
                            <img
                              src={item.imagePath}
                              alt="product"
                              height={80}
                              width={80}
                            />
                          </Link>

                          <Box>
                            <Link
                              to={`/product/${item.product_id}`}
                              component={RouterLink}
                              underline="none"
                            >
                              {item.name}
                            </Link>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>
                        NPR {item.price}
                      </TableCell>
                      <TableCell>
                        <NumericUpDown
                          qty={item.qty}
                          inStock={item.countInStock}
                          productId={item.product_id}
                        />
                      </TableCell>
                      <TableCell align="right" sx={{ pr: 0, fontWeight: 700 }}>
                        NPR {item.price * item.qty}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid
            item
            md={0.5}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Separator />
          </Grid>

          {/* summary */}
          <Grid item xs={1} md={4.5}>
            <TableContainer component={Box}>
              <Table sx={{ border: 0 }} aria-label="cart items table">
                <TableHead sx={{ borderBottom: 2, borderColor: "grey.300" }}>
                  <TableRow>
                    <CustTableCell align="left" sx={{ pl: 0, fontWeight: 700 }}>
                      CART TOTALS
                    </CustTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ px: 0 }}>
                      <TableCellBox>
                        <Typography>Total</Typography>
                        <Typography fontWeight={700}>NPR {total}</Typography>
                      </TableCellBox>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ px: 0 }}>
                      <Link
                        to="/checkout"
                        component={RouterLink}
                        underline="none"
                      >
                        <Button variant="contained" fullWidth color="secondary">
                          Proceed To Checkout
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </CustomizedGrid>
      )}
    </Container>
  );
};

export default CartScreen;
