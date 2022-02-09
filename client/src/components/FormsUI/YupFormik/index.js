import * as Yup from "yup";

// REGISTER FORM INITIAL STATE AND VALIDATION
export const INITIAL_REGISTER_FORM_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  contactNumber: "",
  password: "",
  confirmPassword: "",
};
export const REGISTER_FORM_VALIDATION = Yup.object().shape({
  firstName: Yup.string().required("First name is a required Field"),
  lastName: Yup.string().required("Last Name is a required Field"),
  contactNumber: Yup.string()
    .required("Contact Number is a required field")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits"),
  email: Yup.string()
    .required("Email is a required Field")
    .email("Invalid email address"),
  password: Yup.string()
    .required("Password field is required field")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is a required field"),
});

// LOGIN FORM INITIAL STATE AND VALIDATION
export const INITIAL_LOGIN_FORM_STATE = {
  email: "",
  password: "",
};

export const LOGIN_FORM_VALIDATION = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email address"),
  password: Yup.string().required("Password is a required field"),
});

// FORGOT PASS INITIAL STATE AND VALIDATION
export const INITIAL_FORGOT_PASS_STATE = {
  email: "",
};

export const FORGOT_PASS_FORM_VALIDATION = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email address"),
});

// RESET PASS INITIAL STATE AND VALIDATION
export const INITIAL_RESET_PASS_STATE = {
  password: "",
  confirmPassword: "",
};

export const RESET_PASS_FORM_VALIDATION = Yup.object().shape({
  password: Yup.string()
    .required("Password field is required field")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is a required field"),
});

///////////////////////////////////////////////
// MY ACCOUNT SCREEEN

// ACCOUNT DETAILS AND VALIDATION
export const ACCOUNT_FORM_VALIDATION = Yup.object().shape({
  firstName: Yup.string().required("First name is a required Field"),
  lastName: Yup.string().required("Last Name is a required Field"),
  contactNumber: Yup.string()
    .required("Contact Number is a required field")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits"),
});

// PASSWORD CHANGE INITIAL STATE AND VALIDATION
export const INITIAL_PASSWORD_CHANGE_STATE = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

export const PASSWORD_CHANGE_FORM_VALIDATION = Yup.object().shape({
  currentPassword: Yup.string().required("Password field is required field"),
  // .min(8, "Password is too short - should be 8 chars minimum."),
  // .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  newPassword: Yup.string()
    .required("Password field is required field")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
    .notOneOf(
      [Yup.ref("currentPassword"), null],
      "Current and New password are same"
    ),
  confirmNewPassword: Yup.string()
    .required("Confirm password is a required field")
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
});

/////////////////////////////////////////
// Admin Screen
// USER DETAILS VALIDATION
export const USER_DETAILS_VALIDATION = Yup.object().shape({
  firstName: Yup.string().required("First name is a required Field"),
  lastName: Yup.string().required("Last Name is a required Field"),
});
