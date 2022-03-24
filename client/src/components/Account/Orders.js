import React, { useState, useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";

//////////////////////////////////
// MUI IMPORTS
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CloseIcon from "@mui/icons-material/Close";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

//////////////////////////////////
// Reducer
const initialState = {
  isLoading: false,
  orderList: [],
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ORDER_LIST_REQUEST":
      return { ...state, isLoading: true };

    case "ORDER_LIST_SUCCESS":
      return { ...state, isLoading: false, orderList: action.payload };

    case "ORDER_LIST_FAIL":
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};

///////////////////////////////////
// MAIN Component
const Orders = () => {
  // reducers
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoading, orderList, error } = state;

  const { token } = useSelector((state) => state.token);
  useEffect(() => {
    const getOrderList = async () => {
      try {
        dispatch({ type: "ORDER_LIST_REQUEST" });
        const { data } = await axios.get(`/api/v1/orders/myorders`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // after fetching ORDER LIST
        dispatch({
          type: "ORDER_LIST_SUCCESS",
          payload: data,
        });
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

    getOrderList();
  }, [token]);

  // Cancel Order
  const cancelOrder = (orderId) => {
    console.log("yet to implement the order cancel feature");
  };

  return (
    <Box>
      {isLoading && <CircularProgress />}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {orderList.length === 0 ? (
        <>
          <Alert severity="info" sx={{ mb: 2 }}>
            You have not made any orders yet!
          </Alert>
          <Link
            to="/"
            component={RouterLink}
            underline="none"
            sx={{ display: "inline-block" }}
          >
            Continue Shopping !
          </Link>
        </>
      ) : (
        <>
          <TableContainer component={Box}>
            <Table sx={{ border: 0 }} aria-label="cart items table">
              <TableHead sx={{ borderBottom: 2, borderColor: "grey.300" }}>
                <TableRow>
                  <TableCell align="left" sx={{ pl: 0 }}>
                    ORDER ID
                  </TableCell>
                  <TableCell>DATE</TableCell>
                  <TableCell>TOTAL</TableCell>
                  <TableCell>STATUS</TableCell>
                  {/* <TableCell>PAID</TableCell>
                  <TableCell>DELIVERED</TableCell> */}
                  <TableCell sx={{ pr: 0 }}>ACTION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderList.map((order) => (
                  <TableRow key={order.order_id}>
                    <TableCell align="left" sx={{ pl: 0 }}>
                      <Link
                        to={`/account/vieworder/${order.order_id}`}
                        component={RouterLink}
                        underline="none"
                      >
                        #{order.order_id}
                      </Link>
                    </TableCell>
                    <TableCell>{order.createdAt.substring(0, 10)}</TableCell>
                    <TableCell>{`NPR ${order.total_amount}`}</TableCell>
                    <TableCell>
                      <Chip label={order.status} />
                    </TableCell>

                    {/* <TableCell>
                      <Box
                        sx={{ display: "flex", gap: 1, alignItems: "center" }}
                      >
                        {order.is_paid === 1 ? (
                          order.paid_at.substring(0, 10)
                        ) : (
                          <CloseIcon sx={{ color: "error.main" }} />
                        )}

                        {order.payment_method === "COD" && (
                          <Chip label="COD" sx={{ alignSelf: "flex-start" }} />
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      {order.is_delivered == 1 ? (
                        order.delivered_at.substring(0, 10)
                      ) : (
                        <CloseIcon sx={{ color: "error.main" }} />
                      )}
                    </TableCell> */}
                    <TableCell sx={{ display: "flex", gap: 0.5, pr: 0 }}>
                      <Link
                        to={`/account/vieworder/${order.order_id}`}
                        component={RouterLink}
                        underline="none"
                        sx={{ display: "inline-block" }}
                      >
                        <Button variant="outlined" fullWidth color="primary">
                          View
                        </Button>
                      </Link>

                      {order.status === "Payment Pending" && (
                        <>
                          <Link
                            to={`/payment/?orderId=${order.order_id}`}
                            component={RouterLink}
                            underline="none"
                            sx={{ display: "inline-block" }}
                          >
                            <Button
                              variant="outlined"
                              fullWidth
                              color="primary"
                            >
                              Pay
                            </Button>
                          </Link>

                          <Button
                            sx={{ display: "inline-block" }}
                            variant="outlined"
                            color="primary"
                            onClick={() => cancelOrder(order.order_id)}
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
};

export default Orders;
