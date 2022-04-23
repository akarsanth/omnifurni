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
  firstName: Yup.string()
    .required("First name is a required Field")
    .max(50, "Must be less than 50 characters"),
  lastName: Yup.string()
    .required("Last Name is a required Field")
    .max(50, "Must be less than 50 characters"),
  contactNumber: Yup.string()
    .required("Contact Number is a required field")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits"),
  email: Yup.string()
    .required("Email is a required Field")
    .email("Invalid email address")
    .max(255, "Must be less than 255 characters"),
  password: Yup.string()
    .required("Password field is required field")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
    .max(255, "Must be less than 255 characters"),
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
  firstName: Yup.string()
    .required("First name is a required Field")
    .max(50, "Must be less than 50 characters"),
  lastName: Yup.string()
    .required("Last Name is a required Field")
    .max(50, "Must be less than 50 characters"),
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
// MY ACCOUNT SCREEN
export const ADDRESS_ADD_EDIT_VALIDATION = Yup.object().shape({
  city: Yup.string()
    .required("City is a required Field")
    .max(50, "Must be less than 50 characters"),
  postalCode: Yup.string()
    .required("Zip / Postal Code is a required field")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(5, "Must be exactly 5 digits")
    .max(5, "Must be exactly 5 digits"),

  streetAddress: Yup.string()
    .required("Street Address is a required Field")
    .max(100, "Must be less than 100 characters"),
  province: Yup.string()
    .required("Province is a required Field")
    .max(50, "Must be less than 50 characters"),
});

/////////////////////////////////////////
// Admin Screen
// USER DETAILS VALIDATION
export const USER_DETAILS_VALIDATION = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is a required Field")
    .max(50, "Must be less than 50 characters"),
  lastName: Yup.string()
    .required("Last Name is a required Field")
    .max(50, "Must be less than 50 characters"),
  role: Yup.boolean(),
});

// Category Add/Edit Form validation
export const CATEGORY_ADD_EDIT_VALIDATION = Yup.object().shape({
  name: Yup.string()
    .required("Category name is a required Field")
    .max(75, "Must be less than 75 characters"),
  description: Yup.string().required(
    "Category description is a required Field"
  ),
});

// Product Add/Edit Form Validation
export const PRODUCT_ADD_EDIT_VALIDATION = Yup.object().shape({
  name: Yup.string().required("Product name is a required Field"),
  description: Yup.string().required("Product description is a required Field"),
  price: Yup.number()
    .required("Price is a required Field")
    .typeError("Invalid entry")
    .positive(),
  countInStock: Yup.number()
    .required("Count In Stock is a required Field")
    .typeError("Invalid entry")
    .moreThan(-1, "Count In Stock must be equal to greater than 0")
    .integer(),
  category: Yup.string().required("Category is a required Field"),
  featured: Yup.boolean(),
});

// Order Edit Form Validation
export const ORDER_EDIT_VALIDATION = Yup.object().shape({
  paid: Yup.boolean(),
  delivered: Yup.boolean(),
});

/////////////////////////////////////////
// Contact Us from
export const INITIAL_CONTACT_FORM_STATE = {
  name: "",
  email: "",
  contactNumber: "",
  message: "",
};

export const CONTACT_FORM_VALIDATION = Yup.object().shape({
  name: Yup.string()
    .required("Name is a required Field")
    .max(100, "Must be less than 100 characters"),
  email: Yup.string()
    .required("Email is a required Field")
    .email("Invalid email address")
    .max(255, "Must be less than 255 characters"),
  contactNumber: Yup.string()
    .required("Contact Number is a required field")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits"),
  message: Yup.string().required("Message is a required Field"),
});

/////////////////////////////////////////
// Shipping Address form (Checkout screen)

export const SHIPPING_ADDRESS_VALIDATION = Yup.object().shape({
  firstName: Yup.string()
    .required("First Name is a required Field")
    .max(50, "Must be less than 50 characters"),
  lastName: Yup.string()
    .required("Last Name is a required Field")
    .max(50, "Must be less than 50 characters"),
  email: Yup.string()
    .required("Email is a required Field")
    .email("Invalid email address")
    .max(255, "Must be less than 255 characters"),
  city: Yup.string()
    .required("City is a required Field")
    .max(50, "Must be less than 50 characters"),
  postalCode: Yup.string()
    .required("Zip / Postal Code is a required field")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(5, "Must be exactly 5 digits")
    .max(5, "Must be exactly 5 digits"),
  contactNumber: Yup.string()
    .required("Contact Number is a required field")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits"),
  streetAddress: Yup.string()
    .required("Street Address is a required Field")
    .max(100, "Must be less than 100 characters"),
  province: Yup.string()
    .required("Province is a required Field")
    .max(50, "Must be less than 50 characters"),
});
