import React, { useReducer } from "react";
import axios from "axios";

/////////////////////////////////
// Redux
import { updateSuccessMessage } from "../../../app/features/message/message-slice";
import {
  addAddress,
  editAddress,
} from "../../../app/features/authUser/authUser-slice";
import { useDispatch, useSelector } from "react-redux";

/////////////////////////////////////
// FORMIK and YUP
import { Formik, Form as FormikForm } from "formik";
import { ADDRESS_ADD_EDIT_VALIDATION } from "../../FormsUI/YupFormik";

////////////////////////////////
// MUI Components
import Typography from "@mui/material/Typography";

//////////////////////////////////
// Component Import
import FormFields from "../../FormsUI/FormFieldsWrapper";
import Textfield from "../../FormsUI/Textfield";
import Button from "../../FormsUI/Button";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Alert from "@mui/material/Alert";
import ModalWrapper from "../../AddEditModal";

////////////////////////////////////
// Reducers
// Address details reducer
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
const AddressAddEditModal = (props) => {
  const { open, handleClose, address, actionType } = props;

  // Reducer
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoading, error } = state;

  // Submit Handlers
  const dispatchRedux = useDispatch();
  const { token } = useSelector((state) => state.token);

  const handleAdd = async (values) => {
    const { city, postalCode, streetAddress, province } = values;

    const addressDetails = {
      city,
      postal_code: postalCode,
      street: streetAddress,
      province,
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

      const { data } = await axios.post(
        "/api/v1/user/address",
        addressDetails,
        config
      );
      dispatch({ type: "SUCCESS" });

      // To display message
      dispatchRedux(updateSuccessMessage(data.message));

      dispatchRedux(addAddress(data.addedAddress));

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

  const handleEdit = async (values) => {
    const { city, postalCode, streetAddress, province } = values;

    const addressDetails = {
      city,
      postal_code: postalCode,
      street: streetAddress,
      province,
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
        `/api/v1/user/address/${address.address_id}`,
        addressDetails,
        config
      );
      dispatch({ type: "SUCCESS" });

      // To display message
      dispatchRedux(updateSuccessMessage(data.message));

      dispatchRedux(editAddress(data.updatedAddress));

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
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
          {`${actionType} address details`}
        </Typography>

        <Formik
          initialValues={
            actionType === "Edit"
              ? {
                  city: address.city,
                  postalCode: address.postal_code,
                  streetAddress: address.street,
                  province: address.province,
                }
              : {
                  city: "",
                  postalCode: "",
                  streetAddress: "",
                  province: "",
                }
          }
          validationSchema={ADDRESS_ADD_EDIT_VALIDATION}
          onSubmit={actionType === "Edit" ? handleEdit : handleAdd}
        >
          <FormikForm>
            <FormFields>
              <Textfield label="City" name="city" required />
              <Textfield label="Zip / Postal Code" name="postalCode" required />
              <Textfield label="Street Address" name="streetAddress" required />
              <Textfield label="Province" name="province" required />

              <Button
                color="secondary"
                endIcon={<KeyboardArrowRightIcon />}
                disableElevation
                sx={{ alignSelf: "flex-start" }}
                loading={isLoading}
                fullWidth
              >
                {actionType === "Edit" ? "Save Changes" : "Add Address"}
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

export default AddressAddEditModal;
