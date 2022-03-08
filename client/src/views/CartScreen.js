import React from "react";
import { Link as RouterLink } from "react-router-dom";

///////////////////////////////////////
// Redux Related
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
} from "../app/features/cart/cart-actions";

// Numeric input
import InputNumber from "rc-input-number";

//////////////////////////////////////
// Custom Components
import CheckoutSteps from "../components/CheckoutSteps";
import CustomizedGrid from "../components/Grid/CustomizedGrid";

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
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

/////////////////////////////////////
// Styled
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const Separator = styled(Box)(({ theme }) => ({
  borderLeft: `1px solid ${theme.palette.grey[300]}`,
  height: "100%",
  left: "50%",
  textAlign: "center",
}));

const CustTableCell = styled(TableCell)(({ theme }) => ({
  // borderBottom: theme.spacing(4),
  padding: "0 auto",
  borderColor: theme.palette.grey[300],
}));

//////////////////////////////////////
// MAIN COMPONENT
const CartScreen = () => {
  const dispatch = useDispatch();
  const { cartItems, totalQuantity, total } = useSelector(
    (state) => state.cart
  );

  const removeFromCartHandler = (id) => {
    console.log("here");
    dispatch(removeFromCart(id));
  };

  const quantityChangeHandler = (id, qty) => {
    console.log(id, qty);
    dispatch(updateQuantity(id, qty));
  };

  return (
    <Container>
      <CheckoutSteps step1 />

      <CustomizedGrid
        container
        columns={{ xs: 1, md: 13 }}
        sx={{ mb: 12, mt: 0 }}
      >
        <Grid item xs={1} md={7.5}>
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
                          onClick={() => removeFromCartHandler(item.product_id)}
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
                      <FormControl>
                        <Select
                          value={item.qty}
                          onChange={(event) =>
                            quantityChangeHandler(
                              item.product_id,
                              event.target.value
                            )
                          }
                          size="small"
                        >
                          {[...Array(item.countInStock).keys()].map((val) => (
                            <MenuItem value={val + 1} key={val + 1}>
                              {val + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
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

        <Grid item md={0.5} sx={{ display: "flex", justifyContent: "center" }}>
          <Separator />
        </Grid>

        <Grid item xs={1} md={4.5}>
          <TableContainer component={Box}>
            <Table sx={{ border: 0 }} aria-label="cart items table">
              <TableHead sx={{ borderBottom: 2, borderColor: "grey.300" }}>
                <TableRow>
                  <CustTableCell align="left" sx={{ pl: 0 }}>
                    CART TOTALS
                  </CustTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ px: 0 }}>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography>Total</Typography>
                      <Typography fontWeight={700}>NPR {total}</Typography>
                    </Box>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell sx={{ px: 0 }}>
                    <Link
                      to="/checkout"
                      component={RouterLink}
                      underline="none"
                    >
                      <Button variant="contained" fullWidth>
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
    </Container>
  );
};

export default CartScreen;
