import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";

/////////////////////////////////
// Redux
import { updateSuccessMessage } from "../../app/features/message/message-slice";
import { useSelector } from "react-redux";

/////////////////////////////////////
// FORMIK and YUP
import { Formik, Form as FormikForm } from "formik";
import { ORDER_EDIT_VALIDATION } from "../FormsUI/YupFormik";

////////////////////////////////
// MUI Components
import Typography from "@mui/material/Typography";
import Checkbox from "../FormsUI/Checkbox";

//////////////////////////////////
// Component Import
import FormFields from "../FormsUI/FormFieldsWrapper";
import Button from "../FormsUI/Button";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Alert from "@mui/material/Alert";
import ModalWrapper from "../AddEditModal";

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
  const { token } = useSelector((state) => state.token);
  const handleEdit = async (values) => {
    // Values
    const orderId = rowData.order_id;
    const is_paid = values.paid ? 1 : 0;
    const is_delivered = values.delivered ? 1 : 0;

    const details = { orderId, is_paid, is_delivered };

    try {
      dispatch({ type: "REQUEST" });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `/api/v1/orders/${orderId}`,
        details,
        config
      );

      dispatch({ type: "SUCCESS", payload: data });

      console.log(data);
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
                label="Mark As Paid?"
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
                label="Mark As Delivered?"
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
