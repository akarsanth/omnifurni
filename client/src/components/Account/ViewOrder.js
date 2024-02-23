import React, { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";

/////////////////////////////////////////
// MUI Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Chip from "@mui/material/Chip";

//////////////////////////////////////
// Custom Components
import { CustTableCell, TableCellBox } from "../Checkout/Table";

/////////////////////////////////
// Styled Components
import { styled } from "@mui/material/styles";

const AddressTitle = styled("span")({
  fontWeight: 700,
});

//////////////////////////////////
// Reducer
const initialState = {
  isLoading: false,
  order: { products: [], shipping_address: {} },
  success: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ORDER_DETAILS_REQUEST":
      return { ...state, isLoading: true };

    case "ORDER_DETAILS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        order: action.payload,
        success: true,
      };

    case "ORDER_DETAILS_FAIL":
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};

/////////////////////////////////////
// MAIN COMPONENT
const ViewOrder = () => {
  const params = useParams();
  // reducers
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoading, order, error, success } = state;
  const { products, shipping_address: address } = order;

  const { token } = useSelector((state) => state.token);
  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        dispatch({ type: "ORDER_DETAILS_REQUEST" });
        const { data } = await axios.get(`/api/v1/orders/${params.id}`, {
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
  }, [params.id, token]);

  return (
    <Box>
      {isLoading && <CircularProgress />}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      <Link to={`/account/orders`} component={RouterLink} underline="none">
        <Button
          variant="outlined"
          color="primary"
          startIcon={<ChevronLeftIcon />}
        >
          View Orders
        </Button>
      </Link>
      {success && (
        <>
          <Typography sx={{ mt: 3, mb: 2 }}>{`Order #${
            order.order_id
          } was placed on ${order.createdAt.substring(0, 10)}`}</Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 4 }}>
            <Typography>Status:</Typography>
            {order.status === "Cancelled" ? (
              <Chip variant="outlined" color="error" label={order.status} />
            ) : (
              <Chip variant="outlined" label={order.status} />
            )}
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6">Order Details</Typography>

            <TableContainer component={Box}>
              <Table sx={{ border: 0 }} aria-label="cart items table">
                <TableHead sx={{ borderBottom: 2, borderColor: "grey.300" }}>
                  <TableRow>
                    <CustTableCell align="left" sx={{ pl: 0, fontWeight: 700 }}>
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
                      {products.map((product) => {
                        return (
                          <TableCellBox sx={{ mb: 1 }} key={product.product_id}>
                            <Link
                              to={`/product/${product.product_id}`}
                              component={RouterLink}
                              underline="none"
                            >
                              <Typography variant="body2" nowrap={true}>
                                {`${product.order_line.name}`} X
                                <Chip
                                  variant="outlined"
                                  sx={{ ml: 1 }}
                                  label={` Quantity: ${product.order_line.quantity}`}
                                />
                              </Typography>
                            </Link>
                            <Typography variant="body2">
                              NPR {product.order_line.line_total}
                            </Typography>
                          </TableCellBox>
                        );
                      })}

                      <TableCellBox sx={{ mt: 2 }}>
                        <Typography fontWeight={700}>Total</Typography>
                        <Typography fontWeight={700}>
                          NPR {order.total_amount}
                        </Typography>
                      </TableCellBox>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Payment */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Payment Method
            </Typography>

            <Box sx={{ mb: 2 }}>
              {"Method: "}
              <Chip
                label={
                  order.payment_method === null
                    ? "Not Selected"
                    : order.payment_method
                }
              />
            </Box>

            {order.payment_method === null && order.status !== "Cancelled" && (
              <Link
                to={`/payment/?orderId=${order.order_id}`}
                component={RouterLink}
                underline="none"
              >
                <Button variant="contained" sx={{ mb: 2 }}>
                  Select Payment Method
                </Button>
              </Link>
            )}

            {order.is_paid ? (
              <Alert severity="success">
                Paid on {order.paid_at.substring(0, 10)}
              </Alert>
            ) : (
              <Alert severity="info" color="error">
                Not Paid
              </Alert>
            )}
          </Box>

          {/* Shipping and delivery */}
          <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Shipping Address
            </Typography>
            <Box
              sx={{
                border: 2,
                borderColor: "#eee",
                display: "inline-block",
                px: 3,
                py: 2,
                mb: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Typography>{`${address.first_name} ${address.last_name}`}</Typography>
                <Typography>{address.email}</Typography>
                <Typography>{address.contact_number}</Typography>
                <Typography>
                  <AddressTitle>City: </AddressTitle>
                  {address.city}
                </Typography>
                <Typography>
                  <AddressTitle>Postal Code: </AddressTitle>
                  {address.postal_code}
                </Typography>
                <Typography>
                  <AddressTitle>Street Address: </AddressTitle>
                  {address.street}
                </Typography>
                <Typography>
                  <AddressTitle>Province: </AddressTitle>
                  {address.province}
                </Typography>
              </Box>
            </Box>

            {order.is_delivered ? (
              <Alert severity="success">
                Delivered on {order.delivered_at.substring(0, 10)}
              </Alert>
            ) : (
              <Alert severity="info" color="error">
                Not Delivered
              </Alert>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default ViewOrder;
