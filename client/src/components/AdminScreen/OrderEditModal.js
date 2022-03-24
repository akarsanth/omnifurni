import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";

/////////////////////////////////
// Redux
import { updateSuccessMessage } from "../../app/features/message/message-slice";
import { useDispatch, useSelector } from "react-redux";

/////////////////////////////////////
// FORMIK and YUP
import { Formik, Form as FormikForm } from "formik";
import { ORDER_EDIT_VALIDATION } from "../FormsUI/YupFormik";

////////////////////////////////
// MUI Components
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Checkbox from "../FormsUI/Checkbox";

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
// Update Order
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

//////////////////////////////////////
// MAIN Component
const OrderEditModal = (props) => {
  const { open, handleClose, rowData } = props;

  // Reducer
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoading, error } = state;

  // Handler
  const handleEdit = async (values) => {
    console.log(values.paid);
    console.log(values.delivered);
  };

  return (
    <>
      <ModalWrapper open={open} handleClose={handleClose}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
          Order Details
        </Typography>

        <Formik
          initialValues={{
            paid: rowData.is_paid === 1 ? true : false,
            delivered: rowData.is_delivered === 1 ? true : false,
          }}
          validationSchema={ORDER_EDIT_VALIDATION}
          onSubmit={handleEdit}
        >
          <FormikForm>
            <FormFields>
              <Checkbox
                label="Paid?"
                defaultChecked={
                  rowData.is_paid
                    ? rowData.is_paid === 0
                      ? false
                      : true
                    : false
                }
                name="paid"
                disabled={
                  rowData.is_paid === 1 || rowData.status === "Cancelled"
                }
              />

              <Checkbox
                label="Delivered?"
                defaultChecked={
                  rowData.is_delivered
                    ? rowData.is_delivered === 0
                      ? false
                      : true
                    : false
                }
                name="delivered"
                sx={{ mt: -2 }}
                disabled={
                  rowData.is_delivered === 1 || rowData.status === "Cancelled"
                }
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
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </ModalWrapper>
    </>
  );
};

export default OrderEditModal;
