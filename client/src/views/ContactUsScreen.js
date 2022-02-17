import React, { useReducer } from "react";

///////////////////////////////////
// Redux
import { useDispatch } from "react-redux";
import { updateSuccessMessage } from "../app/features/message/message-slice";

// Email JS
import emailjs from "emailjs-com";

//////////////////////////////////
// FORMIK and YUP
import { Formik, Form as FormikForm } from "formik";
import {
  INITIAL_CONTACT_FORM_STATE,
  CONTACT_FORM_VALIDATION,
} from "../components/FormsUI/YupFormik";

//////////////////////////////////
// Component Import
import FormContainer from "../components/FormsUI/FormContainer";
import FormFields from "../components/FormsUI/FormFieldsWrapper";
import Textfield from "../components/FormsUI/Textfield";
import Button from "../components/FormsUI/Button";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

//////////////////////////////////
// MUI imports
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

////////////////////////////////////
// Reducers
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
const ContactUsScreen = () => {
  const dispatchRedux = useDispatch();
  // Reducer
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoading, error } = state;

  const submitHandler = (values, { resetForm }) => {
    // Parameters
    // Service ID, Template ID, Form Values, Integration (User ID)

    try {
      dispatch({ type: "RESET_STATE" });

      dispatch({ type: "REQUEST" });

      emailjs.send(
        "service_mdld8xi",
        "template_2wys0m7",
        values,
        "user_EzaOgTRTi72NSGTxhD3TZ"
      );

      dispatch({ type: "SUCCESS" });

      dispatchRedux(updateSuccessMessage("Email sent successfully"));

      resetForm();
    } catch (error) {
      dispatch({
        type: "FAIL",
        payload: error,
      });
    }
  };

  return (
    <FormContainer>
      <Typography
        variant="body1"
        component="h2"
        sx={{ mb: 4, fontWeight: 700 }}
      >
        Send us a message !
      </Typography>
      <Formik
        initialValues={{ ...INITIAL_CONTACT_FORM_STATE }}
        validationSchema={CONTACT_FORM_VALIDATION}
        onSubmit={submitHandler}
      >
        <FormikForm>
          <FormFields>
            <Textfield label="Name" name="name" required />
            <Textfield label="Enter Email" name="email" required />

            <Textfield label="Contact Number" name="contactNumber" required />

            <Textfield
              label="Message"
              name="message"
              multiline
              rows={6}
              required
            />

            <Button
              color="secondary"
              endIcon={<KeyboardArrowRightIcon />}
              disableElevation
              loading={isLoading}
            >
              Submit
            </Button>

            {error && <Alert severity="error">{error}</Alert>}
          </FormFields>
        </FormikForm>
      </Formik>
    </FormContainer>
  );
};

export default ContactUsScreen;
