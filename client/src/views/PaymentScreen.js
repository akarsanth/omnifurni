import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

/////////////////////////////////////
// MUI IMPORTS
import Container from "@mui/material/Container";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

//////////////////////////////////////
// Custom Components
import CheckoutSteps from "../components/CheckoutSteps";
import Payment from "../components/PaymentScreen/Payment";

//////////////////////////////////
// Reducer
// For order details
const initialState = {
  isLoading: false,
  order: { products: [], shipping_address: {}, payment_method: "" },
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ORDER_DETAILS_REQUEST":
      return { ...state, isLoading: true };

    case "ORDER_DETAILS_SUCCESS":
      return { ...state, isLoading: false, order: action.payload };

    case "ORDER_DETAILS_FAIL":
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};

////////////////////////////////////////
// MAIN Component
const PaymentScreen = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  // reducers
  // To check if it is value orderId
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoading, order, error } = state;

  const { token } = useSelector((state) => state.token);
  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        dispatch({ type: "ORDER_DETAILS_REQUEST" });

        const { data } = await axios.get(`/api/v1/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // after fetching ORDER with specified id
        dispatch({
          type: "ORDER_DETAILS_SUCCESS",
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: "ORDER_DETAILS_FAIL",
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    };

    getOrderDetails();
  }, [orderId, token]);

  // Payment method radio group
  const [value, setValue] = React.useState("cod");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Container>
      <CheckoutSteps step3 />

      {isLoading && (
        <Box sx={{ my: 10, display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Alert severity="error" sx={{ mt: 3, mb: 10 }}>
          {error}
        </Alert>
      )}

      {!error && (
        <>
          {order.payment_method === "" ? (
            <></>
          ) : order.payment_method === null ? (
            <Grid
              container
              columns={{ xs: 1, md: 10 }}
              sx={{ mb: 12, mt: 0, justifyContent: "space-between", gap: 0.5 }}
            >
              <Grid item xs={1} md={5.5}>
                <Box sx={{ boxShadow: 2, py: 3, px: { xs: 2, sm: 5 } }}>
                  <FormControl>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      Pay with
                    </Typography>
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

                  {/* Payment */}
                  <Payment
                    value={value}
                    orderId={orderId}
                    amount={order.total_amount}
                  />
                </Box>
              </Grid>

              <Grid
                item
                xs={1}
                md={4}
                sx={{ border: 1, px: 3, py: 2, alignSelf: "flex-start" }}
              >
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: 16, mb: 1 }}>
                    Order Summary
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 4,
                    }}
                  >
                    <Typography fontSize={16} fontWeight={700}>
                      Total Amount
                    </Typography>
                    <Typography>NPR. {order.total_amount}</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          ) : (
            <Box sx={{ mt: 5, mb: 10 }}>
              <Alert severity="info" sx={{ mb: 2 }}>
                {`Payment method has already been selected for the Order with
              the Order ID: ${order.order_id}`}
              </Alert>

              <Link
                to={`/account/viewOrder/${order.order_id}`}
                component={RouterLink}
                underline="none"
              >
                <Button variant="outlined">View Order Details</Button>
              </Link>
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default PaymentScreen;
