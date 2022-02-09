import React, { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

//////////////////////////////////
// FORMIK and YUP
import { Formik, Form as FormikForm } from "formik";
import { USER_DETAILS_VALIDATION } from "../FormsUI/YupFormik";

/////////////////////////////////
// Redux
import { updateSuccessMessage } from "../../app/features/message/message-slice";

////////////////////////////////
// MUI Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

//////////////////////////////////
// Component Import
import FormFields from "../FormsUI/FormFieldsWrapper";
import Textfield from "../FormsUI/Textfield";
import Checkbox from "../FormsUI/Checkbox";
import Button from "../FormsUI/Button";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Message from "../Message";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

////////////////////////////////////
// Reducers
// Update User Details Reducer
const initialState = {
  isLoading: false,
  error: null,
  success: null,
};

const editUserReducer = (state, action) => {
  switch (action.type) {
    case "EDIT_USER_REQUEST":
      return { ...state, isLoading: true };

    case "EDIT_USER_SUCCESS":
      return { ...state, isLoading: false, success: action.payload };

    case "EDIT_USER_FAIL":
      return { ...state, isLoading: false, error: action.payload };

    case "RESET_STATE":
      return initialState;

    default:
      return state;
  }
};

///////////////////////////////////
// MAIN COMPONENT
const UserEditModal = (props) => {
  const { open, handleClose, rowData, updateList } = props;

  // Edit User Reducer
  const [state, dispatch] = useReducer(editUserReducer, initialState);
  const { isLoading, error, success } = state;

  // Save Changes Handler
  const dispatchRedux = useDispatch();
  const { token } = useSelector((state) => state.token);

  const saveChangesHandler = async (values) => {
    const userId = rowData.user_id;
    const firstName = values.firstName;
    const lastName = values.lastName;
    const role = values.role ? 1 : 0;

    const details = { userId, firstName, lastName, role };

    try {
      dispatch({ type: "RESET_STATE" });

      dispatch({ type: "EDIT_USER_REQUEST" });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        "/api/v1/auth/editUser",
        details,
        config
      );

      dispatch({ type: "EDIT_USER_SUCCESS", payload: data });

      // To display message
      dispatchRedux(updateSuccessMessage(data.message));

      updateList(data.updatedUser);

      // To close the model
      handleClose();
    } catch (error) {
      dispatch({
        type: "EDIT_USER_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="body1" sx={{ mb: 2, fontWeight: 700 }}>
            User Details
          </Typography>

          <Formik
            initialValues={{
              firstName: rowData.first_name,
              lastName: rowData.last_name,
              role: null,
            }}
            validationSchema={USER_DETAILS_VALIDATION}
            onSubmit={saveChangesHandler}
          >
            <FormikForm>
              <FormFields>
                <Textfield label="First Name" name="firstName" required />

                <Textfield label="Last Name" name="lastName" required />

                <Checkbox
                  label="Is Admin?"
                  defaultChecked={rowData.role === 0 ? false : true}
                  name="role"
                />

                <Button
                  color="secondary"
                  endIcon={<KeyboardArrowRightIcon />}
                  disableElevation
                  sx={{ alignSelf: "flex-start" }}
                  loading={isLoading}
                >
                  Save Changes
                </Button>
              </FormFields>
            </FormikForm>
          </Formik>
        </Box>
      </Modal>

      {success && <Message message={success.message} />}
    </div>
  );
};

export default UserEditModal;
