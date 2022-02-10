import React, { useState, useReducer } from "react";
import axios from "axios";

///////////////////////////////
// Redux Related
import { updateSuccessMessage } from "../../app/features/message/message-slice";
import { categoryDeleted } from "../../app/features/category/categoryList-slice";
import { useDispatch, useSelector } from "react-redux";

//////////////////////////////////////
// TABLE
import MaterialTable from "@material-table/core";
import tableIcons from "../../tables/IconsProvider";

///////////////////////////////////////
import CategoryAddEditModal from "./CategotyAddEditModal";
import { Alert } from "@mui/material";

///////////////////////////////////////
// Table Columns
const columns = [
  {
    title: "Category ID",
    field: "category_id",
    filtering: false,
  },

  {
    title: "Category Name",
    field: "name",
    filtering: false,
  },

  {
    title: "Desciption",
    field: "description",
    filtering: false,
  },
];

/////////////////////////////////////////////
// Category Delete Reducer
const initialState = {
  isLoading: false,
  success: false,
  error: null,
};

const categoryDeleteReducer = (state, action) => {
  switch (action.type) {
    case "CATEGORY_DELETE_REQUEST":
      return { ...state, isLoading: true };

    case "CATEGORY_DELETE_SUCCESS":
      return { ...state, isLoading: false, success: action.payload };

    case "CATEGORY_DELETE_FAIL":
      return { ...state, isLoading: false, error: action.payload };

    case "RESET_STATE":
      return initialState;

    default:
      return state;
  }
};

////////////////////////////////////////////
// MAIN COMPONENT
const CategoryList = () => {
  const dispatchRedux = useDispatch();

  // Category List Global Reducer
  const { categories } = useSelector((state) => state.categoryList);

  // For Category Delete
  const [state, dispatch] = useReducer(categoryDeleteReducer, initialState);
  const { isLoading, success, error } = state;

  // Category Add / Edit Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUserEdit = (rowData) => {
    // setRowData(rowData);
    handleOpen();
  };

  // Handle Delete
  const { token } = useSelector((state) => state.token);
  const handleDelete = async (categoryId) => {
    console.log(categoryId);

    try {
      dispatch({ type: "RESET_STATE" });

      dispatch({ type: "CATEGORY_DELETE_REQUEST" });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.delete(
        `/api/v1/categories/${categoryId}`,
        config
      );
      dispatch({ type: "CATEGORY_DELETE_SUCCESS", payload: data });

      // To display message
      dispatchRedux(updateSuccessMessage(data.message));

      // To remove the deleted category from state
      dispatchRedux(categoryDeleted(categoryId));
    } catch (error) {
      dispatch({
        type: "CATEGORY_DELETE_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  return (
    <>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <MaterialTable
        icons={tableIcons}
        columns={columns}
        data={categories}
        title="Category List"
        options={{
          filtering: true,
          tableLayout: "auto",
          headerStyle: {
            backgroundColor: "#087f5b",
            color: "#FFF",
          },
          actionsColumnIndex: -1,
        }}
        actions={[
          {
            icon: tableIcons.Edit,
            tooltip: "Edit User",
            onClick: (event, rowData) => handleUserEdit(rowData),
          },

          {
            icon: tableIcons.Delete,
            tooltip: "Delete Category",
            onClick: (event, rowData) => handleDelete(rowData.category_id),
          },
        ]}
      />
    </>
  );
};

export default CategoryList;
