import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";

///////////////////////////////
// Redux Related
import { updateSuccessMessage } from "../../app/features/message/message-slice";
import { useDispatch, useSelector } from "react-redux";

///////////////////////////////////////
// TABLE
import MaterialTable from "@material-table/core";
import tableIcons from "../../tables/IconsProvider";

/////////////////////////////////////////
// ICONS
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

//////////////////////////////////////////
// MUI Imports
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Chip from "@mui/material/Chip";

///////////////////////////////////////
import OrderEdit from "./OrderEdit";

// Redux
const initialState = {
  isLoading: false,
  orderList: [],
  error: null,
};

const orderListReducer = (state, action) => {
  switch (action.type) {
    case "ORDER_LIST_REQUEST":
      return { ...state, isLoading: true };

    case "ORDER_LIST_SUCCESS":
      return { ...state, isLoading: false, orderList: action.payload };

    case "ORDER_LIST_FAIL":
      return { ...state, isLoading: false, error: action.payload };

    case "ORDER_LIST_UPDATE":
      return { ...state, productList: action.payload };

    case "RESET_STATE":
      return initialState;

    default:
      return state;
  }
};

///////////////////////////////////////
// Table Columns
const columns = [
  {
    title: "Order ID",
    field: "order_id",
    filtering: false,
    // width: "10%",
  },

  {
    title: "Total Amount",
    field: "total_amount",
    filtering: false,
    render: (rowData) => {
      return `NPR. ${rowData.total_amount}`;
    },
  },

  {
    title: "Paid?",
    field: "is_paid",
    lookup: {
      0: "Not Paid",
      1: "Paid",
    },
    render: (rowData) => {
      return rowData.is_paid === 0 ? (
        <CloseIcon sx={{ color: "error.main" }} />
      ) : (
        <CheckIcon color="primary" />
      );
    },
  },

  {
    title: "Delivered?",
    field: "is_delivered",
    lookup: {
      0: "Not Delivered",
      1: "Delivered",
    },
    render: (rowData) => {
      return rowData.is_delivered === 0 ? (
        <CloseIcon sx={{ color: "error.main" }} />
      ) : (
        <CheckIcon color="primary" />
      );
    },
  },

  {
    title: "Payment Method",
    field: "payment_method",
    filtering: false,

    render: (rowData) => {
      return (
        <>
          {rowData.payment_method === null ? (
            <Chip label="Not Selected" color="error" variant="outlined" />
          ) : (
            <Chip label={rowData.payment_method} />
          )}
        </>
      );
    },
  },

  {
    title: "Status",
    field: "status",
    filtering: false,

    render: (rowData) => {
      return (
        <>
          {rowData.status === "Cancelled" ? (
            <Chip label={rowData.status} color="error" variant="outlined" />
          ) : (
            <Chip label={rowData.status} variant="outlined" />
          )}
        </>
      );
    },
  },

  {
    title: "Created Date",
    field: "createdAt",
    filtering: false,
    render: (rowData) => {
      return rowData.createdAt.substring(0, 10);
    },
  },
];

/////////////////////////////////////////////
// MAIN Component
const OrderListScreen = () => {
  // reducers
  const [state, dispatch] = useReducer(orderListReducer, initialState);
  const { isLoading, orderList, error } = state;

  const { token } = useSelector((state) => state.token);

  //  Order date
  var fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 7);

  const [date, setDate] = useState({
    from: fromDate,
    to: new Date(),
  });
  const [search, setSearch] = useState(true);

  const handleFromDateChange = (newValue) => {
    setDate((prevState) => ({
      ...prevState,
      from: newValue,
    }));
  };

  const handleToDateChange = (newValue) => {
    setDate((prevState) => ({
      ...prevState,
      to: newValue,
    }));
  };

  useEffect(() => {
    async function fetchData() {
      try {
        dispatch({ type: "RESET_STATE" });

        dispatch({ type: "ORDER_LIST_REQUEST" });

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axios.get(
          `/api/v1/orders/'${date.from}'/'${date.to}'`,
          config
        );

        dispatch({ type: "ORDER_LIST_SUCCESS", payload: data });
      } catch (error) {
        dispatch({
          type: "ORDER_LIST_FAIL",
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    }

    if (search) {
      fetchData();
      setSearch(false);
    }
  }, [token, search, date]);

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}

      <Box sx={{ display: "flex", gap: 2, my: 3 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="From"
            inputFormat="MM/dd/yyyy"
            value={date.from}
            onChange={handleFromDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
          <DesktopDatePicker
            label="To"
            inputFormat="MM/dd/yyyy"
            value={date.to}
            onChange={handleToDateChange}
            renderInput={(params) => <TextField {...params} />}
            showTodayButton
          />
        </LocalizationProvider>

        <LoadingButton
          onClick={() => setSearch(true)}
          color="secondary"
          variant="contained"
          sx={{ alignSelf: "center" }}
          loading={isLoading}
        >
          Find Orders
        </LoadingButton>
      </Box>
      <MaterialTable
        detailPanel={[
          {
            tooltip: "Show Order Details",
            render: ({ rowData }) => {
              console.log(rowData);

              return (
                <Box sx={{ mx: 4, my: 5 }}>
                  <OrderEdit rowData={rowData} setSearch={setSearch} />

                  <Box sx={{ mb: 5 }}>
                    <Typography fontWeight={700} sx={{ mb: 2 }}>
                      Ordered Products
                    </Typography>
                    <TableContainer
                      component={Box}
                      sx={{ border: 2, borderColor: "#eee" }}
                    >
                      <Table
                        // sx={{ minWidth: 650 }}
                        // size="small"
                        aria-label="a dense table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell>Product ID</TableCell>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Line Total</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rowData.products.map((product) => (
                            <TableRow
                              key={product.product_id}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                <Link
                                  to={`/product/${product.product_id}`}
                                  component={RouterLink}
                                  underline="none"
                                >
                                  <Typography variant="body2">
                                    {`#${product.product_id}`}
                                  </Typography>
                                </Link>
                              </TableCell>
                              <TableCell>
                                <Link
                                  to={`/product/${product.product_id}`}
                                  component={RouterLink}
                                  underline="none"
                                >
                                  <Typography variant="body2">
                                    {product.name}
                                  </Typography>
                                </Link>
                              </TableCell>
                              <TableCell>
                                {product.order_line.quantity}
                              </TableCell>
                              <TableCell>
                                {product.order_line.line_total}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>

                  <Box>
                    <Typography fontWeight={700} sx={{ mb: 2 }}>
                      Shipping Address
                    </Typography>
                    <TableContainer
                      component={Box}
                      sx={{ border: 2, borderColor: "#eee" }}
                    >
                      <Table
                        sx={{ minWidth: 650 }}
                        // size="small"
                        aria-label="a dense table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Contact Number</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Postal Code</TableCell>
                            <TableCell>Street</TableCell>
                            <TableCell>Province</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow
                            key={rowData.shipping_address.shipping_address_id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {rowData.shipping_address.first_name}
                            </TableCell>
                            <TableCell>
                              {rowData.shipping_address.last_name}
                            </TableCell>
                            <TableCell>
                              {rowData.shipping_address.contact_number}
                            </TableCell>
                            <TableCell>
                              {rowData.shipping_address.email}
                            </TableCell>
                            <TableCell>
                              {rowData.shipping_address.city}
                            </TableCell>
                            <TableCell>
                              {rowData.shipping_address.postal_code}
                            </TableCell>
                            <TableCell>
                              {rowData.shipping_address.street}
                            </TableCell>
                            <TableCell align="right">
                              {rowData.shipping_address.province}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </Box>
              );
            },
          },
        ]}
        icons={tableIcons}
        columns={columns}
        data={orderList}
        title="Order List"
        options={{
          filtering: true,
          pageSize: 10,
          tableLayout: "auto",
          headerStyle: {
            backgroundColor: "#087f5b",
            color: "#FFF",
          },
          actionsColumnIndex: 0,
        }}
      />
    </>
  );
};

export default OrderListScreen;
