import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";

/////////////////////////////////
// Redux
import { updateSuccessMessage } from "../../app/features/message/message-slice";
import { useDispatch, useSelector } from "react-redux";

/////////////////////////////////////
// FORMIK and YUP
import { Formik, Form as FormikForm } from "formik";
import { PRODUCT_ADD_EDIT_VALIDATION } from "../FormsUI/YupFormik";

////////////////////////////////
// MUI Components
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

//////////////////////////////////
// Component Import
import FormFields from "../FormsUI/FormFieldsWrapper";
import Textfield from "../FormsUI/Textfield";
import Button from "../FormsUI/Button";
import Checkbox from "../FormsUI/Checkbox";
import SelectWrapper from "../FormsUI/Select";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Alert from "@mui/material/Alert";
import ModalWrapper from "../AddEditModal";
import MUIButton from "@mui/material/Button";

////////////////////////////////////
// Reducers
// Update User Details Reducer
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

/////////////////////////////////////
// MAIN COMPONENT
const ProductAddEditModal = (props) => {
  // Category List Global Reducer
  const { categories } = useSelector((state) => state.categoryList);

  const {
    open,
    handleClose,
    rowData,
    actionType,
    editProdInState,
    addProdInState,
  } = props;

  // Reducer
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoading, error } = state;

  // For File Upload
  const [imagePath, setImagePath] = useState("");
  const [uploadError, setUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  useEffect(() => {
    if (rowData.imagePath) {
      setImagePath(rowData.imagePath);
    }
  }, [rowData]);
  const fileSelectedHandler = async (event) => {
    // Resetting error state
    setUploadError(false);
    // Resetting image path state
    setImagePath("");

    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/v1/upload", formData, config);

      setImagePath(data);
    } catch (error) {
      setUploading(false);
      dispatch({
        type: "FAIL",
        payload: error,
      });
    }
  };
  useEffect(() => {
    if (imagePath) {
      setUploading(false);
    }
  }, [imagePath]);

  // Button handlers
  const dispatchRedux = useDispatch();
  const { token } = useSelector((state) => state.token);

  const handleProductEdit = async (values) => {
    if (!imagePath) {
      setUploadError(true);
      return;
    }

    // Values
    const productId = rowData.product_id;
    const name = values.name;
    const description = values.description;
    const price = values.price;
    const countInStock = values.countInStock;
    const category_id = values.category;
    const featured = values.featured ? 1 : 0;

    const details = {
      name,
      description,
      price,
      countInStock,
      category_id,
      featured,
      imagePath,
    };

    try {
      dispatch({ type: "RESET_STATE" });

      dispatch({ type: "REQUEST" });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `/api/v1/products/${productId}`,
        details,
        config
      );

      dispatch({ type: "SUCCESS" });

      // To display message
      dispatchRedux(updateSuccessMessage(data.message));

      editProdInState(data.updatedProduct);

      // To close the modal
      handleClose();
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

  const handleProductAdd = async (values) => {
    if (!imagePath) {
      setUploadError(true);
      console.log("idar mc");
      return;
    }

    // Values
    const name = values.name;
    const description = values.description;
    const price = values.price;
    const countInStock = values.countInStock;
    const category_id = values.category;
    const featured = values.featured ? 1 : 0;

    const details = {
      name,
      description,
      price,
      countInStock,
      category_id,
      featured,
      imagePath,
    };

    try {
      dispatch({ type: "RESET_STATE" });

      dispatch({ type: "REQUEST" });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(`/api/v1/products`, details, config);

      dispatch({ type: "SUCCESS" });

      // To display message
      dispatchRedux(updateSuccessMessage(data.message));

      addProdInState(data.createdProduct);

      // To close the modal
      handleClose();
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
    <>
      <ModalWrapper open={open} handleClose={handleClose}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
          {`${actionType} product details`}
        </Typography>

        <Formik
          initialValues={
            actionType === "Edit"
              ? {
                  name: rowData.name,
                  description: rowData.description,
                  price: rowData.price,
                  countInStock: rowData.countInStock,
                  category: rowData.category_id,
                  imagePath,
                }
              : {
                  name: "",
                  description: "",
                  price: "",
                  countInStock: "",
                  category: "",
                  imagePath,
                }
          }
          validationSchema={PRODUCT_ADD_EDIT_VALIDATION}
          onSubmit={
            actionType === "Edit" ? handleProductEdit : handleProductAdd
          }
        >
          <FormikForm>
            <FormFields>
              <Textfield label="Product Name" name="name" required />

              <Textfield
                label="Description"
                name="description"
                multiline
                rows={4}
                required
              />

              <Textfield label="Price" name="price" required />

              <Textfield label="Count In Stock" name="countInStock" required />

              <SelectWrapper
                name="category"
                label="Category"
                list={categories.map((category) => {
                  return {
                    id: category.category_id,
                    value: category.category_id,
                    text: category.name,
                  };
                })}
              />

              {/* Upload */}
              <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                  name="imagePath"
                  label="Image"
                  required
                  value={imagePath}
                  disabled
                  fullWidth
                  error={uploadError}
                  helperText={uploadError && "Required"}
                />

                <MUIButton variant="contained" component="label">
                  Upload
                  <input type="file" hidden onChange={fileSelectedHandler} />
                </MUIButton>
              </Box>

              <Checkbox
                label="Featured?"
                // defaultChecked={rowData.role === 0 ? false : true}
                defaultChecked={
                  rowData.featured
                    ? rowData.featured === 0
                      ? false
                      : true
                    : false
                }
                name="featured"
                sx={{ mt: -1.5 }}
              />

              <Button
                color="secondary"
                endIcon={<KeyboardArrowRightIcon />}
                disableElevation
                sx={{ alignSelf: "flex-start" }}
                loading={isLoading}
                fullWidth
                disabled={uploading}
              >
                {actionType === "Edit" ? "Save Changes" : "Add Category"}
              </Button>
            </FormFields>
          </FormikForm>
        </Formik>

        {error && (
          <Alert severity="error" sx={{ my: 2 }}>
            {error}
          </Alert>
        )}
      </ModalWrapper>
    </>
  );
};

export default ProductAddEditModal;
