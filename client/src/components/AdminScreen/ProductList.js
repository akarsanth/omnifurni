import React, { useState, useEffect, useReducer, useCallback } from "react";
import axios from "axios";

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

////////////////////////////////////////
// MUI COMPONENTS
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

/////////////////////////////////////////
// Component Import
import ProductAddEditModal from "./ProductAddEditModal";

const initialState = {
  isLoading: false,
  productList: [],
  error: null,
};

const productListReducer = (state, action) => {
  switch (action.type) {
    case "PRODUCT_LIST_REQUEST":
      return { ...state, isLoading: true };

    case "PRODUCT_LIST_SUCCESS":
      return { ...state, isLoading: false, productList: action.payload };

    case "PRODUCT_LIST_FAIL":
      return { ...state, isLoading: false, error: action.payload };

    case "PRODUCT_LIST_UPDATE":
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
    title: "Product ID",
    field: "product_id",
    filtering: false,
    width: "10%",
  },

  {
    title: "Product Name",
    field: "name",
    filtering: false,
  },

  {
    title: "Description",
    field: "description",
    filtering: false,
    width: "30%",
    render: (rowData) => {
      return rowData.description.length < 70
        ? rowData.description
        : `${rowData.description.substring(0, 70)}...`;
    },
  },

  {
    title: "Category",
    field: "category_name",
    filtering: false,
  },

  {
    title: "Price",
    field: "price",
    filtering: false,
    render: (rowData) => {
      return `NPR. ${rowData.price}`;
    },
  },

  {
    title: "In Stock",
    field: "countInStock",
    filtering: false,
  },

  {
    title: "Is Featured?",
    field: "featured",
    lookup: {
      0: "Not Featured",
      1: "Featured",
    },
    render: (rowData) => {
      return rowData.featured === 0 ? <CloseIcon /> : <CheckIcon />;
    },
  },
];

///////////////////////////////////////
// MAIN COMPONENT
const ProductListScreen = () => {
  const dispatchRedux = useDispatch();

  // reducers
  const [state, dispatch] = useReducer(productListReducer, initialState);
  const { isLoading, productList, error } = state;

  const { token } = useSelector((state) => state.token);

  // Fetch product list
  useEffect(() => {
    async function fetchData() {
      try {
        dispatch({ type: "RESET_STATE" });

        dispatch({ type: "PRODUCT_LIST_REQUEST" });

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axios.get("/api/v1/products", config);

        dispatch({ type: "PRODUCT_LIST_SUCCESS", payload: data });
      } catch (error) {
        dispatch({
          type: "PRODUCT_LIST_FAIL",
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    }

    fetchData();
  }, [token]);

  // Product Add / Edit Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Selected (Clicked) Row
  const [rowData, setRowData] = useState({});
  const [actionType, setActionType] = useState("");
  const handleProductEdit = (rowData) => {
    setRowData(rowData);
    setActionType("Edit");
    handleOpen();
  };

  const handleProductAdd = () => {
    setActionType("Add");
    setRowData({});
    handleOpen();
  };

  // Dialog Modal
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = (action) => {
    if (action === "yes") {
      setDeleteState((prev) => ({ ...prev, continueDeleting: true }));
    }
    setOpenDialog(false);
  };

  // Delete handler
  // Handle Delete
  const [deleteError, setDeleteError] = useState("");
  const [deleteState, setDeleteState] = useState({
    continueDeleting: false,
    deletingProduct: {},
  });

  const handleDelete = async (product) => {
    setDeleteState({
      continueDeleting: false,
      deletingProduct: product,
    });

    handleOpenDialog();
  };

  // Called from ProductAddEditModal
  const editProdInState = (editedProduct) => {
    const newList = productList.map((product) =>
      product.product_id !== editedProduct.product_id ? product : editedProduct
    );

    dispatch({ type: "PRODUCT_LIST_UPDATE", payload: newList });
  };

  const addProdInState = (newProduct) => {
    const newList = [...productList, newProduct];
    dispatch({ type: "PRODUCT_LIST_UPDATE", payload: newList });
  };

  // To delete product in state
  // const [deleteInState, setDeleteInState]
  const deleteProdInState = useCallback(
    (productId) => {
      const newList = productList.filter(
        (product) => product.product_id !== productId && product
      );
      dispatch({ type: "PRODUCT_LIST_UPDATE", payload: newList });
    },
    [productList]
  );

  useEffect(() => {
    const deleteProduct = async ({ product_id, imagePath }) => {
      try {
        setDeleteError("");

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.delete(
          `/api/v1/products/${product_id}`,
          config
        );

        console.log(imagePath);
        // To delete image
        await axios.post("/api/v1/upload/delete", {
          imagePath,
        });

        // To display message
        dispatchRedux(updateSuccessMessage(data.message));

        setDeleteState({
          continueDeleting: false,
          deletingProduct: {},
        });

        // To remove the deleted product from state
        deleteProdInState(product_id);
      } catch (error) {
        setDeleteError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        );
      }
    };
    if (deleteState.deletingProduct !== {} && deleteState.continueDeleting) {
      deleteProduct(deleteState.deletingProduct);
    }
  }, [deleteState, dispatchRedux, token, deleteProdInState]);

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      {deleteError && <Alert severity="error">{deleteError}</Alert>}

      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}

      <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddIcon />}
          onClick={handleProductAdd}
        >
          Add Product
        </Button>
      </Box>
      <MaterialTable
        icons={tableIcons}
        columns={columns}
        data={productList}
        title="Product List"
        options={{
          filtering: true,
          pageSize: 10,
          tableLayout: "auto",
          headerStyle: {
            backgroundColor: "#087f5b",
            color: "#FFF",
          },
          actionsColumnIndex: -1,
        }}
        actions={[
          {
            icon: tableIcons.Edit,
            tooltip: "Edit Product",
            onClick: (event, rowData) => handleProductEdit(rowData),
          },

          {
            icon: tableIcons.Delete,
            tooltip: "Delete Product",
            onClick: (event, rowData) => handleDelete(rowData),
          },
        ]}
      />

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => handleCloseDialog("no")}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete product?"}</DialogTitle>
        <DialogActions>
          <Button onClick={() => handleCloseDialog("no")}>NO</Button>
          <Button onClick={() => handleCloseDialog("yes")} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {open && (
        <ProductAddEditModal
          open={open}
          handleClose={handleClose}
          rowData={rowData}
          actionType={actionType}
          editProdInState={editProdInState}
          addProdInState={addProdInState}
        />
      )}
    </>
  );
};

export default ProductListScreen;
