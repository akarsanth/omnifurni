import axios from "axios";
import React, { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";

////////////////////////////////////
// Redux
import { useSelector, useDispatch } from "react-redux";
import { updateSuccessMessage } from "../../../app/features/message/message-slice";

// Khalti
import KhaltiCheckout from "khalti-checkout-web";

/////////////////////////////////////
// MUI IMPORTS
import LoadingButton from "@mui/lab/LoadingButton";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Alert from "@mui/material/Alert";

///////////////////////////////////////
// Styled Components
import { styled } from "@mui/system";

const KhaltiButton = styled(LoadingButton)({
  backgroundColor: "#5d2e8e",
  "&:hover": {
    backgroundColor: "#50247f",

    boxShadow: "none",
  },
});

// For Payment
const initialState = {
  isLoading: false,
  success: null,
  error: null,
};

const reducer = (state, action) => {
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

const { REACT_APP_KHALTI_PUBLIC_KEY } = process.env;

///////////////////////////////////////////
// MAIN COMPONENT
const Payment = ({ value, orderId, amount }) => {
  const dispatchRedux = useDispatch();
  const navigate = useNavigate();

  // Payment Reducer
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoading, success, error } = state;

  const { token } = useSelector((state) => state.token);
  const paymentHandler = async (paymentDetails, message) => {
    try {
      dispatch({
        type: "ORDER_PAY_REQUEST",
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.put(`/api/v1/orders/${orderId}/pay`, paymentDetails, config);

      dispatch({
        type: "ORDER_PAY_SUCCESS",
      });

      dispatchRedux(updateSuccessMessage(message));
    } catch (error) {
      dispatch({
        type: "ORDER_PAY_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  const [khaltiState, setKhaltiState] = useState({
    loading: false,
    error: "",
  });
  // Khalti
  let config = {
    // replace this key with yours
    publicKey: REACT_APP_KHALTI_PUBLIC_KEY,
    productIdentity: "1234567890",
    productName: "Some Prodct",
    productUrl: "http://localhost:3000",
    eventHandler: {
      onSuccess(payload) {
        // hit merchant api for initiating verfication
        let data = {
          token: payload.token,
          amount: payload.amount,
        };

        setKhaltiState({
          error: "",
          loading: true,
        });
        // Hitting own server
        axios
          .get(`/api/v1/khalti/verify/${data.token}/${data.amount}`)
          .then((response) => {
            setKhaltiState({
              error: "",
              loading: false,
            });

            paymentHandler(
              { payment_method: "Khalti", is_paid: 1 },
              "Payment with Khalti successful. Order Completed !"
            );
          })
          .catch((error) => {
            setKhaltiState({
              error: "Error occured during transaction. Try again !",
              loading: false,
            });
          });
      },
      // onError handler is optional
      onError(error) {
        setKhaltiState({
          error: "Error occured during transaction. Try again !",
          loading: false,
        });
      },
      onClose() {
        console.log("widget is closing");
      },
    },
    paymentPreference: [
      "KHALTI",
      "EBANKING",
      "MOBILE_BANKING",
      "CONNECT_IPS",
      "SCT",
    ],
  };

  let checkout = new KhaltiCheckout(config);

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
    <>
      {/* Button for COD Payment */}
      {value === "cod" && (
        <LoadingButton
          color="secondary"
          endIcon={<KeyboardArrowRightIcon />}
          disableElevation
          loading={isLoading}
          variant="contained"
          sx={{ mt: 3 }}
          fullWidth
          onClick={() =>
            paymentHandler(
              { payment_method: "COD" },
              "COD (Cash On Delivery) selected as payment method successfully. Order Completed !"
            )
          }
        >
          Confirm Payment
        </LoadingButton>
      )}

      {value === "khalti" && (
        <>
          <KhaltiButton
            sx={{ mt: 3 }}
            endIcon={<KeyboardArrowRightIcon />}
            disableElevation
            loading={khaltiState.loading}
            variant="contained"
            fullWidth
            onClick={() => checkout.show({ amount: amount * 100 })}
          >
            Pay With Khalti
          </KhaltiButton>

          {khaltiState.error && (
            <Alert severity="error" sx={{ mt: 3, mb: 4 }}>
              {khaltiState.error}
            </Alert>
          )}

          {khaltiState.success && (
            <Alert severity="success" sx={{ mt: 3, mb: 4 }}>
              {khaltiState.success}
            </Alert>
          )}
        </>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 3, mb: 4 }}>
          {error}
        </Alert>
      )}
    </>
  );
};

export default Payment;
