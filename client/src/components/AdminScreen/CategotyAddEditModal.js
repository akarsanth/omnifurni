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
import CloseButton from "../Common/CloseButton";

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
  // For edit
  useEffect(() => {
    if (rowData.imagePath) {
      setImagePath(rowData.imagePath);
    }
  }, [rowData]);

  // Button handlers
  const dispatchRedux = useDispatch();
  const { token } = useSelector((state) => state.token);

  // Handle edit
  const handleEdit = async (values) => {
    if (!imagePath) {
      setUploadError(true);
      return;
    }

    try {
      // Checking if new image is choosen
      let newImagePath;
      if (image) {
        const formData = new FormData();
        formData.append("image", image);
        const configUpload = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        const { data: path } = await axios.post(
          "/api/v1/upload",
          formData,
          configUpload
        );
        newImagePath = path;

        // need to delete previous image
        const prevImagePath = rowData.imagePath;

        console.log(prevImagePath);

        // /uploads/image-1648029171486.jpg

        await axios.post("/api/v1/upload/delete", { imagePath: prevImagePath });
      }

      // Values
      const categoryId = rowData.category_id;
      const name = values.name;
      const description = values.description;

      const details = {
        name,
        description,
        imagePath: newImagePath ? newImagePath : rowData.imagePath,
      };
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

  // Handle product add
  const handleAdd = async (values) => {
    if (!image) {
      setUploadError(true);
      return;
    }

    try {
      // upload image
      const formData = new FormData();
      formData.append("image", image);
      const configUpload = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data: imagePath } = await axios.post(
        "/api/v1/upload",
        formData,
        configUpload
      );

      // Values for new category
      const name = values.name;
      const description = values.description;
      const details = { name, description, imagePath };

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

  // For new image
  const [image, setImage] = useState();
  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    setImage(file);

    setImagePath(file.name);
  };

  return (
    <>
      <ModalWrapper open={open} handleClose={handleClose}>
        <CloseButton handleClose={handleClose} />
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
                  // value={image && image.name ? image.name : ""}
                  value={imagePath}
                  disabled
                  fullWidth
                  error={uploadError}
                  helperText={uploadError && "Choose a image!"}
                />

                <MUIButton variant="contained" component="label">
                  Image
                  <input type="file" hidden onChange={handleUploadImage} />
                </MUIButton>
              </Box>

              {actionType === "Edit" && (
                <Typography variant="body2">
                  Upload new image to edit the image as well!
                </Typography>
              )}

              <Button
                color="secondary"
                endIcon={<KeyboardArrowRightIcon />}
                disableElevation
                sx={{ alignSelf: "flex-start" }}
                loading={isLoading}
                fullWidth
              >
                {actionType === "Edit" ? "Save Changes" : "Add Category"}
              </Button>
            </FormFields>
          </FormikForm>
        </Formik>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </ModalWrapper>
    </>
  );
};

export default CategotyAddEditModal;
