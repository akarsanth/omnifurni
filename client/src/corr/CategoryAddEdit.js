import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";

/////////////////////////////////
// Redux
import { updateSuccessMessage } from "../../app/features/message/message-slice";
import { useDispatch, useSelector } from "react-redux";

/////////////////////////////////////
// FORMIK and YUP
import { Formik, Form as FormikForm } from "formik";
import { CATEGORY_ADD_EDIT_VALIDATION } from "../FormsUI/YupFormik";

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
const CategotyAddEditModal = (props) => {
  const {
    open,
    handleClose,
    rowData,
    actionType,
    editCateInState,
    addCateInState,
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

  const handleEdit = async (values) => {
    if (!imagePath) {
      setUploadError(true);
      return;
    }

    // Values
    const categoryId = rowData.category_id;
    const name = values.name;
    const description = values.description;

    const details = { name, description, imagePath };

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
        `/api/v1/categories/${categoryId}`,
        details,
        config
      );

      dispatch({ type: "SUCCESS" });

      // To display message
      dispatchRedux(updateSuccessMessage(data.message));

      editCateInState(data.updatedCategory);

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

  const handleAdd = async (values) => {
    if (!imagePath) {
      setUploadError(true);
      return;
    }

    // Values
    const name = values.name;
    const description = values.description;

    const details = { name, description, imagePath };

    try {
      dispatch({ type: "RESET_STATE" });

      dispatch({ type: "REQUEST" });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(`/api/v1/categories`, details, config);

      dispatch({ type: "SUCCESS" });

      // To display message
      dispatchRedux(updateSuccessMessage(data.message));

      addCateInState(data.createdCategory);

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
          {`${actionType} category details`}
        </Typography>

        <Formik
          initialValues={
            actionType === "Edit"
              ? {
                  name: rowData.name,
                  description: rowData.description,
                  imagePath,
                }
              : {
                  name: "",
                  description: "",
                  imagePath,
                }
          }
          validationSchema={CATEGORY_ADD_EDIT_VALIDATION}
          onSubmit={actionType === "Edit" ? handleEdit : handleAdd}
        >
          <FormikForm>
            <FormFields>
              <Textfield label="Category Name" name="name" required />

              <Textfield
                label="Description"
                name="description"
                multiline
                rows={4}
                required
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

        {error && <Alert sererity="error">{error}</Alert>}
      </ModalWrapper>
    </>
  );
};

export default CategotyAddEditModal;
