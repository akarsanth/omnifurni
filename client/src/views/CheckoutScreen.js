import React, { useEffect, useReducer } from "react";
import axios from "axios";
import localForage from "localforage";
import { Link as RouterLink, useNavigate } from "react-router-dom";

///////////////////////////////////////
// Redux Related
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../app/features/cart/cart-slice";
import {
  clearCartItems,
  clearShippingAddress,
} from "../app/features/cart/cart-slice";

//////////////////////////////////
// FORMIK and YUP
import { Formik, Form as FormikForm } from "formik";
import { SHIPPING_ADDRESS_VALIDATION } from "../components/FormsUI/YupFormik";

//////////////////////////////////////
// Custom Components
import CheckoutSteps from "../components/CheckoutSteps";
import { CustTableCell, TableCellBox } from "../components/Checkout/Table";
import { NameFields } from "../components/FormsUI/FormContainer";
import Textfield from "../components/FormsUI/Textfield";
import FormFields from "../components/FormsUI/FormFieldsWrapper";
import Button from "../components/FormsUI/Button";

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

import Typography from "@mui/material/Typography";

//////////////////////////////////
// Reducer
const initialState = {
  isLoading: false,
  order: {},
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ORDER_ORDER_REQUEST":
      return { ...state, isLoading: true };

    case "ORDER_ORDER_SUCCESS":
      return { ...state, isLoading: false, order: action.payload };

    case "ORDER_ORDER_FAIL":
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};

/////////////////////////////////////
// MAIN Component
const CheckoutScreen = () => {
  const dispatchRedux = useDispatch();
  const navigate = useNavigate();

  const { cartItems, totalQuantity, shippingAddress, total } = useSelector(
    (state) => state.cart
  );

  const { userInfo } = useSelector((state) => state.authUser);
  const { default_address: address } = userInfo;

  // reducers
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoading, order, error } = state;

  // Submit Handler
  const submitHandler = (values, { resetForm }) => {
    dispatchRedux(saveShippingAddress(values));
  };

  // Navigate to cart if there is not cart items
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, []);

  // After shipping address is successfully added to state
  // Order is created
  const { token } = useSelector((state) => state.token);
  useEffect(() => {
    const createOrder = async () => {
      try {
        dispatch({
          type: "ORDER_CREATE_REQUEST",
        });

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const order = {
          orderItems: cartItems,
          total_amount: total,
          shippingAddress,
        };
        const { data } = await axios.post("/api/v1/orders", order, config);

        dispatch({
          type: "ORDER_CREATE_SUCCESS",
          payload: data,
        });

        dispatchRedux(clearCartItems());
        dispatchRedux(clearShippingAddress());

        await localForage.removeItem("cartItems");

        navigate(`/payment/?orderId=${data.order_id}`);
      } catch (error) {
        dispatch({
          type: "ORDER_LIST_FAIL",
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    };

    if (shippingAddress && cartItems.length !== 0) {
      createOrder();
    }
  }, [shippingAddress, cartItems, dispatchRedux, navigate, token, total]);

  return (
    <Container>
      <CheckoutSteps step1 step2 />
      <Formik
        initialValues={{
          firstName: userInfo.first_name,
          lastName: userInfo.last_name,
          contactNumber: userInfo.contact_number,
          email: userInfo.email,

          city: address ? address.city : "",
          postalCode: address ? address.postal_code : "",
          streetAddress: address ? address.street : "",
          province: address ? address.province : "",
        }}
        validationSchema={SHIPPING_ADDRESS_VALIDATION}
        onSubmit={submitHandler}
      >
        <FormikForm>
          <Grid
            container
            columns={{ xs: 1, md: 10 }}
            sx={{ mb: 12, mt: 0, justifyContent: "space-between" }}
          >
            <Grid item xs={1} md={5.2}>
              <Typography sx={{ fontWeight: 700, fontSize: 16, mt: 1, mb: 3 }}>
                Shipping Address
              </Typography>
              <FormFields>
                <NameFields>
                  <Textfield label="First Name" name="firstName" required />

                  <Textfield label="Last Name" name="lastName" required />
                </NameFields>

                <Textfield label="Email" type="email" name="email" required />

                <Textfield
                  label="Contact Number"
                  name="contactNumber"
                  required
                />

                <Textfield label="City" name="city" required />
                <Textfield
                  label="Zip / Postal Code"
                  name="postalCode"
                  required
                />
                <Textfield
                  label="Street Address"
                  name="streetAddress"
                  required
                />
                <Textfield label="Province" name="province" required />
              </FormFields>
            </Grid>

            <Grid
              item
              xs={1}
              md={4.4}
              sx={{ border: 1, p: 3, alignSelf: "flex-start" }}
            >
              <Typography sx={{ fontWeight: 700, fontSize: 16, mb: 1 }}>
                Your Order
              </Typography>

              <TableContainer component={Box}>
                <Table sx={{ border: 0 }} aria-label="cart items table">
                  <TableHead sx={{ borderBottom: 2, borderColor: "grey.300" }}>
                    <TableRow>
                      <CustTableCell
                        align="left"
                        sx={{ pl: 0, fontWeight: 700 }}
                      >
                        PRODUCT
                      </CustTableCell>
                      <CustTableCell
                        align="right"
                        sx={{ pr: 0, fontWeight: 700 }}
                      >
                        SUB TOTAL
                      </CustTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ px: 0, py: 2 }} colSpan={2}>
                        {cartItems.map((item) => {
                          return (
                            <TableCellBox sx={{ mb: 1 }} key={item.product_id}>
                              <Typography variant="body2">{`${item.name} x ${item.qty}`}</Typography>
                              <Typography variant="body2">
                                NPR {item.price * item.qty}
                              </Typography>
                            </TableCellBox>
                          );
                        })}

                        <TableCellBox sx={{ mt: 2 }}>
                          <Typography fontWeight={700}>Total</Typography>
                          <Typography fontWeight={700}>NPR {total}</Typography>
                        </TableCellBox>
                      </TableCell>
                    </TableRow>

                    {/* <TableRow>
                      <TableCell sx={{ px: 0 }} colSpan="2">
                        <FormControl>
                          <FormLabel id="demo-controlled-radio-buttons-group">
                            Pay with
                          </FormLabel>
                          <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={value}
                            onChange={handleChange}
                          >
                            <FormControlLabel
                              value="cod"
                              control={<Radio />}
                              label="COD (Cash On Delivery)"
                            />
                            <FormControlLabel
                              value="khalti"
                              control={<Radio />}
                              label="Khalti"
                            />
                          </RadioGroup>
                        </FormControl>
                      </TableCell>
                    </TableRow> */}

                    <TableRow>
                      <TableCell sx={{ px: 0 }} colSpan="2">
                        <Button color="secondary" fullWidth>
                          Proceed to payment
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </FormikForm>
      </Formik>
    </Container>
  );
};

export default CheckoutScreen;
