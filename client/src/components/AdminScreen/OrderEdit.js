import React, { useReducer } from "react";
import axios from "axios";

///////////////////////////////
// Redux Related
import { updateSuccessMessage } from "../../app/features/message/message-slice";
import { useDispatch, useSelector } from "react-redux";

//////////////////////////////////////////
// MUI Components
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

////////////////////////////////////
// Reducers
// Update Order
const initialState = {
  isLoading: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "REQUEST":
      return { ...state, isLoading: true };

    case "SUCCESS":
      return { ...state, isLoading: false };

    case "FAIL":
      return { ...state, isLoading: false, error: action.payload };

    case "RESET_STATE":
      return initialState;

    default:
      return state;
  }
};

//////////////////////////////////////////////
// MAIN Component
const OrderEdit = ({ rowData, setSearch }) => {
  const dispatchRedux = useDispatch();

  // Reducer
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoading, error } = state;

  // Handler
  const { token } = useSelector((state) => state.token);
  const updateOrderHandler = async ({ orderId, status }) => {
    const details = { status };

    try {
      dispatch({ type: "REQUEST" });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `/api/v1/orders/${orderId}`,
        details,
        config
      );

      dispatch({ type: "SUCCESS", payload: data });

      setSearch(true);

      if (status === "Delivered") {
        dispatchRedux(
          updateSuccessMessage(
            `Order #${orderId} marked as delivered successfully!`
          )
        );
      }

      if (status === "Cancelled") {
        dispatchRedux(
          updateSuccessMessage(
            `Order #${orderId} marked as cancelled successfully!`
          )
        );
      }
    } catch (error) {
      dispatch({
        type: "FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Mark As Delivered Button */}
      {rowData.is_delivered === 0 &&
        rowData.payment_method !== null &&
        rowData.status !== "Cancelled" && (
          <Button
            variant="contained"
            onClick={() =>
              updateOrderHandler({
                orderId: rowData.order_id,
                status: "Delivered",
              })
            }
            sx={{ mb: 5 }}
          >
            Mark As Delivered
          </Button>
        )}

      {/* Cancel Button */}
      {rowData.is_delivered !== 1 && rowData.status !== "Cancelled" && (
        <Button
          variant="contained"
          onClick={() =>
            updateOrderHandler({
              orderId: rowData.order_id,
              status: "Cancelled",
            })
          }
          sx={{ mb: 5 }}
        >
          Mark As Cancelled
        </Button>
      )}
    </Box>
  );
};

export default OrderEdit;
