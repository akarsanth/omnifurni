import React, { useReducer } from "react";
import axios from "axios";

//////////////////////////////////
// FORMIK and YUP
import { Formik, Form as FormikForm } from "formik";
import { USER_DETAILS_VALIDATION } from "../FormsUI/YupFormik";

/////////////////////////////////
// Redux
import { updateSuccessMessage } from "../../app/features/message/message-slice";
import { useDispatch, useSelector } from "react-redux";

////////////////////////////////
// MUI Components
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

//////////////////////////////////
// Component Import
import FormFields from "../FormsUI/FormFieldsWrapper";
import Textfield from "../FormsUI/Textfield";
import Checkbox from "../FormsUI/Checkbox";
import Button from "../FormsUI/Button";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ModalWrapper from "../AddEditModal";

////////////////////////////////////
// Reducers
// Update User Details Reducer
const initialState = {
  isLoading: false,
  error: null,
};

const editUserReducer = (state, action) => {
  switch (action.type) {
    case "EDIT_USER_REQUEST":
      return { ...state, isLoading: true };

    case "EDIT_USER_SUCCESS":
      return { ...state, isLoading: false };

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
  const { open, handleClose, rowData, editUserInState } = props;

  // Edit User Reducer
  const [state, dispatch] = useReducer(editUserReducer, initialState);
  const { isLoading, error } = state;

  // Save Changes Handler
  const dispatchRedux = useDispatch();
  const { token } = useSelector((state) => state.token);

  const saveChangesHandler = async (values) => {
    const userId = rowData.user_id;
    const firstName = values.firstName;
    const lastName = values.lastName;
    const role = values.role ? 1 : 0;

    console.log(role);
    console.log(values.role);

    const details = { firstName, lastName, role };

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
        `/api/v1/user/${userId}`,
        details,
        config
      );

      dispatch({ type: "EDIT_USER_SUCCESS" });

      // To display message
      dispatchRedux(updateSuccessMessage(data.message));

      editUserInState(data.updatedUser);

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
    <>
      <ModalWrapper open={open} handleClose={handleClose}>
        <Typography variant="h6" sx={{ mb: 4, fontWeight: 700 }}>
          Edit User Details
        </Typography>

        <Formik
          initialValues={{
            firstName: rowData.first_name,
            lastName: rowData.last_name,
            role: rowData.role === 1 ? true : false,
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
                sx={{ mt: -1.5 }}
              />

              <Button
                color="secondary"
                endIcon={<KeyboardArrowRightIcon />}
                disableElevation
                sx={{ alignSelf: "flex-start" }}
                loading={isLoading}
                fullWidth
              >
                Save Changes
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

export default UserEditModal;
