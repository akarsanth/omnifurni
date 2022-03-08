import React from "react";
import axios from "axios";

////////////////////////////////////
// FORMIK AND YUP
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";

////////////////////////////////////
// Redux
import { useDispatch } from "react-redux";
import {
  updateSuccessMessage,
  updateInfoMessage,
  updateErrorMessage,
} from "../../app/features/message/message-slice";

//////////////////////////////////////
// Component Import
import Button from "../FormsUI/Button";
import Textfield from "../FormsUI/Textfield";

///////////////////////////////////
// MUI imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

////////////////////////////////////
// Subsciption form yup validation
const INITIAL_VALUES = {
  email: "",
};
const FORM_VALIDATION = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("This is a required field"),
});

///////////////////////////////////
// Mailchimp notification message
const messages = {
  subscribed:
    "Thank you for subscribing to our mailing list. You will be receiving a welcome email shortly.",
  alreadyExists:
    "The email you entered is already on our mailing list. Thank your for joining the community.",
  others:
    "There was an issue with your email submission. Please check your email and try again.",
};

///////////////////////////////////
// MAIN COMPONENT
const Subscribe = () => {
  const dispatch = useDispatch();

  const submitHandler = async (values, { resetForm }) => {
    const { email } = values;

    try {
      const { data } = await axios.get(`/api/memberAdd?email=${email}`);

      if (data.status === "subscribed") {
        dispatch(updateSuccessMessage(messages.subscribed));
        resetForm();
      } else if (data.title === "Member Exists") {
        dispatch(updateInfoMessage(messages.alreadyExists));
      } else {
        dispatch(updateErrorMessage(messages.others));
      }
    } catch (err) {
      dispatch(updateErrorMessage(err));
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 2,
        mb: 8,
        gap: 3,
        px: 2,
      }}
    >
      <Typography fontWeight={700}>
        Get the best deals in your email !
      </Typography>
      <Formik
        initialValues={{ ...INITIAL_VALUES }}
        validationSchema={FORM_VALIDATION}
        onSubmit={submitHandler}
      >
        <FormikForm>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: {
                xs: "wrap",
                sm: "nowrap",
              },

              gap: {
                xs: 3,
                sm: 0,
              },
            }}
          >
            <Textfield
              label="Your Email"
              type="email"
              name="email"
              size="small"
              required
              sx={{ minWidth: 350 }}
            />
            <Button
              color="secondary"
              endIcon={<KeyboardArrowRightIcon />}
              disableElevation
              // loading={isLoading}
              sx={{ alignSelf: "flex-start", height: 40, px: 5 }}
            >
              Subscribe
            </Button>
          </Box>
        </FormikForm>
      </Formik>
    </Box>
  );
};

export default Subscribe;
