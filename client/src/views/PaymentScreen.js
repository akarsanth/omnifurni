import axios from "axios";
import React, { useEffect, useReducer } from "react";
import {
  Link as RouterLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useSelector } from "react-redux";

/////////////////////////////////////
// MUI IMPORTS
import Container from "@mui/material/Container";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
// import FormLabel from "@mui/material/FormLabel";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

//////////////////////////////////////
// Custom Components
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormsUI/FormContainer";

//////////////////////////////////
// Reducer
// For order details
const initialState = {
  isLoading: false,
  order: { products: [], shipping_address: {} },
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

// For Payment
const paymentInitialState = {
  isLoading: false,
  success: null,
  error: null,
};

const paymentReducer = (state, action) => {
  switch (action.type) {
    case "ORDER_PAY_REQUEST":
      return { ...state, isLoading: true };

    case "ORDER_PAY_SUCCESS":
      return { ...state, isLoading: false, success: true };

    case "ORDER_PAY_FAIL":
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};

//////////////////////////////
// MAIN Component
const PaymentScreen = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  // reducers
  // To check if it is value orderId
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoading, order, error } = state;

  // Payment Reducer
  const [paymentState, dispatchPayment] = useReducer(
    paymentReducer,
    paymentInitialState
  );
  const { isLoading: loadingPay, success, error: errorPay } = paymentState;

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

  const codPaymentHandler = async () => {
    const paymentDetails = {
      payment_method: "COD",
    };

    try {
      dispatchPayment({
        type: "ORDER_PAY_REQUEST",
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `/api/v1/orders/${orderId}/pay`,
        paymentDetails,
        config
      );

      dispatchPayment({
        type: "ORDER_PAY_SUCCESS",
      });
    } catch (error) {
      dispatchPayment({
        type: "ORDER_PAY_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  // After success payment
  useEffect(() => {
    if (success) {
      navigate("/ordercomplete", {
        replace: true,
        state: { from: "payment", orderId: orderId },
      });
    }
  }, [success, navigate, orderId]);

  return (
    <Container>
      <CheckoutSteps step3 />

      {isLoading && <CircularProgress />}
      {error && (
        <Alert severity="error" sx={{ mt: 3, mb: 10 }}>
          {error}
        </Alert>
      )}

      {!error && (
        <>
          {order.payment_method === null ? (
            <FormContainer>
              <FormControl>
                {/* <FormLabel id="demo-controlled-radio-buttons-group">
            Pay with
          </FormLabel> */}
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

              {/* Button for COD Payment */}
              {value === "cod" && (
                <Button
                  color="secondary"
                  endIcon={<KeyboardArrowRightIcon />}
                  disableElevation
                  // loading={loadingPay}
                  variant="contained"
                  sx={{ mt: 3 }}
                  fullWidth
                  onClick={codPaymentHandler}
                >
                  Proceed to Payment
                </Button>
              )}

              {errorPay && (
                <Alert severity="error" sx={{ mt: 3, mb: 4 }}>
                  {errorPay}
                </Alert>
              )}
            </FormContainer>
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
