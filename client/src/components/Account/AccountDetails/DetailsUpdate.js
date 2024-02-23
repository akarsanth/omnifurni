import React, { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

//////////////////////////////////
// FORMIK and YUP
import { Formik, Form as FormikForm } from "formik";
import { ACCOUNT_FORM_VALIDATION } from "../../FormsUI/YupFormik";

/////////////////////////////////
// Redux
import { updateUserInfo } from "../../../app/features/authUser/authUser-slice";

//////////////////////////////////
// Component Import
import FormFields from "../../FormsUI/FormFieldsWrapper";
import Textfield from "../../FormsUI/Textfield";
import Button from "../../FormsUI/Button";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Message from "../../Message";

////////////////////////////////
// MUI Components
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

/////////////////////////////////
// Styled Components
import { styled } from "@mui/material/styles";

const NameFields = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(3),
}));

////////////////////////////////////
// Reducers
// Update User Details Reducer
const initialState = {
  isLoading: false,
  error: null,
  success: null,
};

const updateUserReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_USER_REQUEST":
      return { ...state, isLoading: true };

    case "UPDATE_USER_SUCCESS":
      return { ...state, isLoading: false, success: action.payload };

    case "UPDATE_USER_FAIL":
      return { ...state, isLoading: false, error: action.payload };

    case "RESET_STATE":
      return initialState;

    default:
      return state;
  }
};

////////////////////////////////////
// MAIN COMPONENT
const DetailsUpdate = () => {
  const dispatchRedux = useDispatch();

  const { userInfo } = useSelector((state) => state.authUser);

  // User Details Update Reducer
  const [state, dispatch] = useReducer(updateUserReducer, initialState);
  const { isLoading, error, success } = state;

  // Save Changes Button Handler
  const { token } = useSelector((state) => state.token);
  const saveChangesHandler = async (values) => {
    try {
      dispatch({ type: "RESET_STATE" });

      dispatch({ type: "UPDATE_USER_REQUEST" });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put("/api/v1/user/info", values, config);

      dispatch({ type: "UPDATE_USER_SUCCESS", payload: data.message });

      // To fetch the updated user details again
      dispatchRedux(updateUserInfo(values));
    } catch (error) {
      dispatch({
        type: "UPDATE_USER_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="body1" sx={{ mb: 2, fontWeight: 700 }}>
        Account Details
      </Typography>

      <Formik
        initialValues={{
          firstName: userInfo.first_name,
          lastName: userInfo.last_name,
          contactNumber: userInfo.contact_number,
        }}
        validationSchema={ACCOUNT_FORM_VALIDATION}
        onSubmit={saveChangesHandler}
      >
        <FormikForm>
          <FormFields>
            <NameFields>
              <Textfield label="First Name" name="firstName" required />

              <Textfield label="Last Name" name="lastName" required />
            </NameFields>

            <Textfield label="Contact Number" name="contactNumber" required />

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

      {error && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {error}
        </Alert>
      )}
      {success && <Message message={success} />}
    </Box>
  );
};

export default DetailsUpdate;
